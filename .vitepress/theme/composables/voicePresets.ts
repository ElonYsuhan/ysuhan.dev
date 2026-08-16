export type VoiceType = 'default' | 'loli' | 'sweet' | 'mature' | 'gentle'

export interface VoicePreset {
  id: VoiceType
  label: string
  description: string
  pitch: number
  rate: number
  voiceKeywords: string[]
}

export const VOICE_PRESETS: VoicePreset[] = [
  {
    id: 'default',
    label: '默认',
    description: '系统默认中文声音',
    pitch: 1,
    rate: 1,
    voiceKeywords: ['xiaoxiao', 'xiaoyi', 'yunjian', 'yunxi', 'tingting', 'huihui'],
  },
  {
    id: 'loli',
    label: '萝莉',
    description: '活泼、清脆、偏幼态',
    pitch: 1.6,
    rate: 1.08,
    voiceKeywords: ['xiaoyi', 'yaoyao', 'huihui', 'xiaoshuang', 'xiaomeng'],
  },
  {
    id: 'sweet',
    label: '甜美',
    description: '明亮、亲切、有感染力',
    pitch: 1.3,
    rate: 1,
    voiceKeywords: ['xiaoxiao', 'xiaohan', 'xiaomo', 'lili', 'tingting'],
  },
  {
    id: 'mature',
    label: '御姐',
    description: '沉稳、知性、有气场',
    pitch: 0.78,
    rate: 0.94,
    voiceKeywords: ['yunjian', 'yunyang', 'xiaozhen', 'meijia', 'xiaoyan'],
  },
  {
    id: 'gentle',
    label: '温柔',
    description: '柔和、舒缓、低攻击性',
    pitch: 0.95,
    rate: 0.88,
    voiceKeywords: ['xiaoxiao', 'xiaoyou', 'xiaomo', 'meijia', 'tingting'],
  },
]

export const VOICE_PRESET_MAP: Record<VoiceType, VoicePreset> = Object.fromEntries(
  VOICE_PRESETS.map((preset) => [preset.id, preset]),
) as Record<VoiceType, VoicePreset>

export function resolvePreset(id: string): VoicePreset {
  return VOICE_PRESET_MAP[id as VoiceType] ?? VOICE_PRESET_MAP.default
}

/**
 * Pick the most suitable Chinese voice for a preset.
 * Falls back to any Chinese voice, then to null so the caller can use defaults.
 */
export function pickChineseVoice(
  voices: SpeechSynthesisVoice[],
  preset: VoicePreset,
): SpeechSynthesisVoice | null {
  const chinese = voices.filter((voice) =>
    /zh|cmn|chinese/i.test(`${voice.lang} ${voice.name}`),
  )
  if (chinese.length === 0) {
    return null
  }

  for (const keyword of preset.voiceKeywords) {
    const matched = chinese.find((voice) =>
      voice.name.toLowerCase().includes(keyword.toLowerCase()),
    )
    if (matched) {
      return matched
    }
  }

  const commonChineseVoices = [
    'xiaoxiao',
    'xiaoyi',
    'yunjian',
    'yunxi',
    'tingting',
    'huihui',
    'meijia',
    'lili',
  ]
  for (const name of commonChineseVoices) {
    const matched = chinese.find((voice) =>
      voice.name.toLowerCase().includes(name),
    )
    if (matched) {
      return matched
    }
  }

  return chinese[0]
}
