<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import {
  VOICE_PRESETS,
  resolvePreset,
  type VoiceType,
  type VoicePreset,
  pickChineseVoice,
} from '../composables/voicePresets'

interface ChatMessage {
  role: 'user' | 'assistant'
  text: string
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

interface SpeechRecognitionResult {
  isFinal: boolean
  length: number
  [index: number]: SpeechRecognitionAlternative
}

interface SpeechRecognitionResultList {
  length: number
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number
  results: SpeechRecognitionResultList
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionLike {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start(): void
  stop(): void
  abort(): void
  onstart: ((event: Event) => void) | null
  onend: ((event: Event) => void) | null
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onspeechstart: ((event: Event) => void) | null
}

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike

interface WindowWithSpeech extends Window {
  SpeechRecognition?: SpeechRecognitionConstructor
  webkitSpeechRecognition?: SpeechRecognitionConstructor
}

const isOpen = ref(false)
const isListening = ref(false)
const isSpeaking = ref(false)
const isProcessing = ref(false)
const isRecognitionSupported = ref(false)
const activeVoiceId = ref<VoiceType>('default')
const messages = ref<ChatMessage[]>([])
const interimText = ref('')
const errorMessage = ref('')
const lastAssistantText = ref('')

let recognition: SpeechRecognitionLike | null = null
let restartTimer: number | null = null
let speechCancelledByUser = false
let lastProcessedFinalIndex = -1

const activePreset = computed<VoicePreset>(() => resolvePreset(activeVoiceId.value))

const statusText = computed(() => {
  if (errorMessage.value) {
    return errorMessage.value
  }
  if (isSpeaking.value) {
    return '正在说话… 随时可以打断'
  }
  if (isListening.value) {
    return '聆听中… 说完自动回复'
  }
  if (isProcessing.value) {
    return '正在思考…'
  }
  return '点击开始语音聊天'
})

const fabStatus = computed(() => {
  if (isSpeaking.value) {
    return '播'
  }
  if (isListening.value) {
    return '听'
  }
  return '聊'
})

function normalizeText(text: string): string {
  return text.replace(/[\s，。！？、,.!?]/g, '').toLowerCase()
}

function looksLikeAssistantEcho(text: string): boolean {
  const spoken = normalizeText(lastAssistantText.value)
  const heard = normalizeText(text)
  if (!spoken || !heard || heard.length < 4) {
    return false
  }
  return spoken.includes(heard) || heard.includes(spoken)
}

function getSpeechRecognitionConstructor(): SpeechRecognitionConstructor | null {
  const w = window as WindowWithSpeech
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

function stopRecognition() {
  if (!recognition) {
    return
  }
  try {
    recognition.onstart = null
    recognition.onend = null
    recognition.onerror = null
    recognition.onresult = null
    recognition.onspeechstart = null
    recognition.abort()
  } catch {
    // already stopped
  }
  recognition = null
  isListening.value = false
}

function clearRestartTimer() {
  if (restartTimer !== null) {
    window.clearTimeout(restartTimer)
    restartTimer = null
  }
}

function cancelSpeaking() {
  speechCancelledByUser = true
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isSpeaking.value = false
  isProcessing.value = false
}

function interruptSpeech() {
  if (!isSpeaking.value) {
    return
  }
  cancelSpeaking()
}

function scrollToBottom() {
  void nextTick(() => {
    const body = document.querySelector('.voice-body')
    if (body) {
      body.scrollTop = body.scrollHeight
    }
  })
}

function addMessage(role: ChatMessage['role'], text: string) {
  if (!text.trim()) {
    return
  }
  messages.value.push({ role, text: text.trim() })
  if (role === 'assistant') {
    lastAssistantText.value = text.trim()
  }
  scrollToBottom()
}

function buildReply(input: string): string {
  const text = input.trim().replace(/[。！？]+$/u, '')
  const normalized = text.toLowerCase()
  if (!text) {
    return '我没听清，可以再说一次吗？'
  }
  if (/你好|您好|^hi\b|^hello\b|^hey\b/.test(normalized)) {
    return '你好呀，我是 Ysuhan 的语音助手，很高兴见到你。'
  }
  if (/你是谁|你叫什么|介绍一下你/.test(normalized)) {
    return '我是这个网站里的语音助手，可以陪你聊天，也可以演示不同声音。'
  }
  if (/声音|换声音|萝莉|甜美|御姐|温柔/.test(normalized)) {
    return '你可以在下方选择萝莉、甜美、御姐或温柔的声音，我会立刻用新声音重读刚才的话。'
  }
  if (/几点|时间|日期/.test(normalized)) {
    return `现在是${new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}。`
  }
  if (/天气/.test(normalized)) {
    return '我暂时还没有接入天气服务，不过你可以先试试我的声音好不好听。'
  }
  if (/再见|拜拜|晚安/.test(normalized)) {
    return '再见，有需要随时叫我。'
  }
  return `我听到你说：${text}。当前是本地语音演示，接入大模型后我就能更聪明地回答你啦。`
}

function pickVoice(): SpeechSynthesisVoice | null {
  if (!('speechSynthesis' in window)) {
    return null
  }
  return pickChineseVoice(window.speechSynthesis.getVoices(), activePreset.value)
}

function speak(text: string) {
  if (!('speechSynthesis' in window)) {
    return false
  }

  window.speechSynthesis.cancel()
  speechCancelledByUser = false

  const utterance = new SpeechSynthesisUtterance(text)
  utterance.lang = 'zh-CN'
  utterance.volume = 1
  utterance.rate = activePreset.value.rate
  utterance.pitch = activePreset.value.pitch
  const voice = pickVoice()
  if (voice) {
    utterance.voice = voice
  }

  utterance.onstart = () => {
    isSpeaking.value = true
  }
  utterance.onend = () => {
    if (!speechCancelledByUser) {
      isSpeaking.value = false
      isProcessing.value = false
    }
  }
  utterance.onerror = () => {
    // 'interrupted'/'canceled' are expected when the user cuts in.
    isSpeaking.value = false
    isProcessing.value = false
  }

  window.speechSynthesis.speak(utterance)
  isSpeaking.value = true
  return true
}

function respond(text: string) {
  if (isProcessing.value) {
    return
  }
  isProcessing.value = true
  const reply = buildReply(text)
  addMessage('assistant', reply)
  speak(reply)
  // If TTS is unavailable, keep the written reply and clear the busy state.
  if (!isSpeaking.value) {
    isProcessing.value = false
  }
}

function processUserText(text: string) {
  const cleaned = text.trim()
  if (!cleaned) {
    return
  }
  addMessage('user', cleaned)
  interimText.value = ''
  respond(cleaned)
}

function startListening() {
  if (isListening.value) {
    return
  }
  if (!isRecognitionSupported.value) {
    errorMessage.value = '当前浏览器不支持语音识别，请使用 Chrome/Edge。'
    return
  }

  const Ctor = getSpeechRecognitionConstructor()
  if (!Ctor) {
    errorMessage.value = '当前浏览器不支持语音识别，请使用 Chrome/Edge。'
    return
  }

  stopRecognition()
  clearRestartTimer()
  errorMessage.value = ''
  lastProcessedFinalIndex = -1

  const nextRecognition = new Ctor()
  nextRecognition.lang = 'zh-CN'
  nextRecognition.continuous = true
  nextRecognition.interimResults = true
  nextRecognition.maxAlternatives = 1

  nextRecognition.onstart = () => {
    isListening.value = true
  }

  nextRecognition.onspeechstart = () => {
    // Cut off the assistant as soon as the user starts making a sound.
    if (isSpeaking.value) {
      interruptSpeech()
    }
  }

  nextRecognition.onresult = (event: SpeechRecognitionEvent) => {
    let finalText = ''
    let interim = ''
    const start = Math.max(0, lastProcessedFinalIndex + 1)
    for (let i = start; i < event.results.length; i += 1) {
      const result = event.results[i]
      const transcript = result[0]?.transcript ?? ''
      if (result.isFinal) {
        finalText += transcript
        lastProcessedFinalIndex = i
      } else {
        interim += transcript
      }
    }
    interimText.value = interim

    const heard = `${finalText}${interim}`.trim()
    if (heard && isSpeaking.value && !looksLikeAssistantEcho(heard)) {
      interruptSpeech()
    }

    if (finalText.trim() && !isProcessing.value) {
      processUserText(finalText.trim())
    }
  }

  nextRecognition.onerror = (event: SpeechRecognitionErrorEvent) => {
    if (event.error === 'no-speech' || event.error === 'aborted') {
      return
    }
    if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
      errorMessage.value = '麦克风权限未开启，请在浏览器中允许使用麦克风。'
    } else {
      errorMessage.value = `语音识别出错：${event.error}`
    }
    isListening.value = false
  }

  nextRecognition.onend = () => {
    isListening.value = false
    // Keep the conversation alive unless the user closed the panel or we are
    // already processing a reply.
    if (isOpen.value && !isProcessing.value && !isSpeaking.value) {
      clearRestartTimer()
      restartTimer = window.setTimeout(() => {
        if (isOpen.value && !isProcessing.value && !isSpeaking.value) {
          startListening()
        }
      }, 180)
    }
  }

  recognition = nextRecognition
  try {
    nextRecognition.start()
  } catch {
    isListening.value = false
    errorMessage.value = '语音识别启动失败，请重试。'
  }
}

function toggleListening() {
  if (isListening.value) {
    stopRecognition()
    return
  }
  startListening()
}

function togglePanel() {
  isOpen.value = !isOpen.value
  if (!isOpen.value) {
    stopRecognition()
    cancelSpeaking()
    clearRestartTimer()
    return
  }
  if (!messages.value.length) {
    addMessage('assistant', '你好，我是 Ysuhan 的语音助手。选一个喜欢的声音，点击“开始语音”就能聊天。')
  }
}

function stopSpeaking() {
  interruptSpeech()
}

function applyVoiceSettings() {
  // If the assistant is speaking, replay the last sentence with the new voice
  // so the voice switch takes effect immediately.
  if (!isSpeaking.value || !lastAssistantText.value) {
    return
  }
  const lastText = lastAssistantText.value
  cancelSpeaking()
  window.setTimeout(() => {
    if (isOpen.value) {
      speak(lastText)
    }
  }, 30)
}

onMounted(() => {
  const w = window as WindowWithSpeech
  isRecognitionSupported.value = Boolean(w.SpeechRecognition || w.webkitSpeechRecognition)
  if (!isRecognitionSupported.value) {
    errorMessage.value = '当前浏览器不支持语音识别，请使用 Chrome/Edge。'
  }

  if ('speechSynthesis' in window) {
    // Warm up the voice list; some browsers load it asynchronously.
    window.speechSynthesis.getVoices()
  }
})

onBeforeUnmount(() => {
  clearRestartTimer()
  stopRecognition()
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
  isSpeaking.value = false
  isProcessing.value = false
})
</script>

<template>
  <Teleport to="body">
    <Transition name="voice-pop">
      <div v-if="isOpen" class="voice-panel glass-card" role="dialog" aria-label="语音聊天">
        <header class="voice-header">
          <div>
            <h2 class="voice-title">语音聊天</h2>
            <p class="voice-status">{{ statusText }}</p>
          </div>
          <button class="voice-icon-btn voice-close" type="button" aria-label="关闭语音聊天" @click="togglePanel">
            ×
          </button>
        </header>

        <div class="voice-body" aria-live="polite">
          <div v-for="(message, index) in messages" :key="`${index}-${message.role}`" class="voice-msg" :class="message.role">
            <span class="voice-msg-bubble">{{ message.text }}</span>
          </div>
          <div v-if="interimText" class="voice-msg user">
            <span class="voice-msg-bubble voice-interim">{{ interimText }}…</span>
          </div>
        </div>

        <footer class="voice-footer">
          <label class="voice-voice-select">
            <span>声音</span>
            <select v-model="activeVoiceId" aria-label="选择声音类型" @change="applyVoiceSettings">
              <option v-for="preset in VOICE_PRESETS" :key="preset.id" :value="preset.id">
                {{ preset.label }} · {{ preset.description }}
              </option>
            </select>
          </label>

          <div class="voice-controls">
            <button
              class="voice-btn voice-mic"
              :class="{ active: isListening }"
              type="button"
              :disabled="!isRecognitionSupported"
              @click="toggleListening"
            >
              {{ isListening ? '停止聆听' : '开始语音' }}
            </button>
            <button v-if="isSpeaking" class="voice-btn voice-stop" type="button" @click="stopSpeaking">
              暂停
            </button>
          </div>

          <p class="voice-tip">
            支持 Chrome/Edge 语音识别；说完自动回复，说话立即打断。
          </p>
        </footer>
      </div>
    </Transition>

    <button
      class="voice-fab"
      :class="{ 'voice-fab-active': isOpen }"
      type="button"
      :aria-label="isOpen ? '收起语音聊天' : '打开语音聊天'"
      :aria-expanded="isOpen"
      @click="togglePanel"
    >
      <span v-if="isSpeaking" class="voice-fab-wave">
        <i></i><i></i><i></i>
      </span>
      <span v-else-if="isListening" class="voice-fab-wave voice-fab-listening">
        <i></i><i></i><i></i>
      </span>
      <span v-else class="voice-fab-text">{{ fabStatus }}</span>
    </button>
  </Teleport>
</template>

<style scoped>
.voice-fab {
  position: fixed;
  right: 22px;
  bottom: 22px;
  z-index: 999;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  border: 1px solid var(--accent-border, rgba(34, 211, 238, 0.35));
  background: var(--bg-elevated, #101725);
  color: var(--accent, #22d3ee);
  box-shadow: var(--glass-card-shadow), 0 0 18px var(--accent-glow, rgba(34, 211, 238, 0.2));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
  transition: transform 180ms var(--ease-out, ease-out), box-shadow 180ms var(--ease-out, ease-out);
}
.voice-fab:hover,
.voice-fab-active {
  transform: translateY(-2px) scale(1.04);
  box-shadow: var(--glass-card-shadow), 0 0 26px var(--accent-glow, rgba(34, 211, 238, 0.32));
}

.voice-fab-text {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-weight: 700;
  letter-spacing: 0.04em;
}

.voice-fab-wave {
  display: flex;
  align-items: center;
  gap: 3px;
  height: 18px;
}
.voice-fab-wave i {
  width: 3px;
  border-radius: 2px;
  background: currentColor;
  animation: voice-wave 0.9s ease-in-out infinite;
}
.voice-fab-wave i:nth-child(1) {
  height: 8px;
}
.voice-fab-wave i:nth-child(2) {
  height: 16px;
  animation-delay: 0.15s;
}
.voice-fab-wave i:nth-child(3) {
  height: 11px;
  animation-delay: 0.3s;
}
.voice-fab-wave.voice-fab-listening i {
  animation-name: voice-wave-listening;
}
@keyframes voice-wave {
  0%, 100% { transform: scaleY(0.6); }
  50% { transform: scaleY(1); }
}
@keyframes voice-wave-listening {
  0%, 100% { transform: scaleY(0.45); opacity: 0.7; }
  50% { transform: scaleY(1); opacity: 1; }
}

.voice-panel {
  position: fixed;
  right: 22px;
  bottom: 88px;
  z-index: 1000;
  width: min(360px, calc(100vw - 32px));
  max-height: min(600px, calc(100vh - 120px));
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 18px;
}

.voice-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  padding: 16px 16px 12px;
  border-bottom: 1px solid var(--border-default, rgba(34, 211, 238, 0.12));
}
.voice-title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
}
.voice-status {
  margin: 4px 0 0;
  font-size: 12px;
  color: var(--text-secondary, #9db4cc);
  min-height: 16px;
}

.voice-icon-btn {
  border: 0;
  background: transparent;
  color: var(--text-secondary, #9db4cc);
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  padding: 4px 6px;
  border-radius: 8px;
}
.voice-icon-btn:hover {
  color: var(--text-primary, #eaf4ff);
  background: var(--bg-hover, rgba(34, 211, 238, 0.08));
}

.voice-body {
  flex: 1;
  overflow-y: auto;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 120px;
  max-height: 380px;
  scroll-behavior: smooth;
}
.voice-msg {
  display: flex;
}
.voice-msg.user {
  justify-content: flex-end;
}
.voice-msg.assistant {
  justify-content: flex-start;
}
.voice-msg-bubble {
  max-width: 86%;
  padding: 8px 12px;
  border-radius: 14px;
  font-size: 13px;
  line-height: 1.55;
  word-break: break-word;
}
.voice-msg.user .voice-msg-bubble {
  background: var(--accent, #22d3ee);
  color: var(--accent-ink, #03101a);
  border-bottom-right-radius: 4px;
}
.voice-msg.assistant .voice-msg-bubble {
  background: var(--bg-hover, rgba(34, 211, 238, 0.08));
  border: 1px solid var(--border-subtle, rgba(34, 211, 238, 0.1));
  color: var(--text-primary, #eaf4ff);
  border-bottom-left-radius: 4px;
}
.voice-interim {
  opacity: 0.68;
  font-style: italic;
}

.voice-footer {
  padding: 12px 16px 14px;
  border-top: 1px solid var(--border-default, rgba(34, 211, 238, 0.12));
  display: grid;
  gap: 10px;
}
.voice-voice-select {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: var(--text-secondary, #9db4cc);
}
.voice-voice-select select {
  flex: 1;
  min-width: 0;
  padding: 7px 10px;
  border-radius: 10px;
  border: 1px solid var(--border-default, rgba(34, 211, 238, 0.14));
  background: var(--bg-elevated, #101725);
  color: var(--text-primary, #eaf4ff);
  font-size: 12px;
  outline: none;
}
.voice-voice-select select:focus {
  border-color: var(--accent, #22d3ee);
  box-shadow: 0 0 0 3px var(--accent-subtle, rgba(34, 211, 238, 0.08));
}

.voice-controls {
  display: flex;
  gap: 8px;
}
.voice-btn {
  flex: 1;
  border: 1px solid var(--accent-border, rgba(34, 211, 238, 0.28));
  background: var(--accent-subtle, rgba(34, 211, 238, 0.08));
  color: var(--accent, #22d3ee);
  border-radius: 10px;
  padding: 8px 12px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 150ms var(--ease-out, ease-out);
}
.voice-btn:hover {
  background: var(--accent, #22d3ee);
  color: var(--accent-ink, #03101a);
}
.voice-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.voice-btn.active {
  background: var(--accent, #22d3ee);
  color: var(--accent-ink, #03101a);
  border-color: transparent;
}
.voice-btn.voice-stop {
  flex: 0 0 auto;
  background: transparent;
  color: var(--text-secondary, #9db4cc);
  border-color: var(--border-default, rgba(34, 211, 238, 0.14));
}
.voice-btn.voice-stop:hover {
  background: rgba(244, 63, 94, 0.12);
  color: #fb7185;
  border-color: rgba(244, 63, 94, 0.3);
}

.voice-tip {
  margin: 0;
  font-size: 11px;
  color: var(--text-tertiary, #6f8fae);
  line-height: 1.5;
}

.voice-pop-enter-active,
.voice-pop-leave-active {
  transition: opacity 160ms ease, transform 160ms ease;
}
.voice-pop-enter-from,
.voice-pop-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.98);
}
</style>
