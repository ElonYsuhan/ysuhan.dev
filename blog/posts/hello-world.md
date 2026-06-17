---
title: 构建现代化个人网站：VitePress 深度定制指南
date: 2026-06-10
author: Ysuhan
tags:
  - VitePress
  - Vue 3
  - UnoCSS
  - Web Dev
excerpt: 从零开始，使用 VitePress + Vue 3 + UnoCSS 构建一个性能极致、可深度定制的个人品牌网站。
---

# 构建现代化个人网站：VitePress 深度定制指南

## 为什么选择 VitePress？

在 2026 年，静态网站生成器的选择比以往任何时候都更加丰富。从老牌的 Gatsby、Next.js，到新兴的 Astro、VitePress，每个工具都有其独特的优势。

我最终选择了 **VitePress**，基于以下几个核心理由：

1. **极致性能** — 基于 Vite 的构建系统，开发服务器秒启、HMR 极速响应
2. **Vue 3 原生** — 可以直接使用 Vue 3 Composition API 与生态中的所有库
3. **Markdown 优先** — 内容创作零摩擦，同时支持 Vue 组件嵌入
4. **主题可定制** — 完全可控的主题系统，不受默认样式束缚

## 项目架构

```
ysuhan.dev/
├── .vitepress/
│   ├── config.ts          # VitePress 配置
│   ├── constants.ts       # 站点常量
│   └── theme/
│       ├── index.ts       # 主题入口
│       ├── Layout.vue     # 自定义布局
│       ├── styles/        # 全局样式
│       └── components/    # 主题组件
├── index.md               # Landing Page
├── projects/              # 项目展示
├── showcase/              # 作品集
├── blog/                  # 技术博客
├── notes/                 # 数字花园
└── about/                 # 关于我
```

## 自定义主题系统

VitePress 的主题系统设计得非常优雅。通过 `extends` 继承默认主题，我们可以在保持所有内置功能（导航、侧边栏、搜索）的同时，完全自定义视觉呈现。

```ts
// .vitepress/theme/index.ts
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,           // 替换布局
  enhanceApp({ app }) {
    // 注册全局组件
  }
} satisfies Theme
```

### Layout 插槽系统

VitePress 提供了丰富的布局插槽，允许精确控制页面各部分的渲染：

- `layout-top` / `layout-bottom` — 全局顶部/底部
- `doc-before` / `doc-after` — 文档内容前后
- `doc-footer-before` — 文档页脚前
- `nav-bar-title-before` / `nav-bar-title-after` — 导航标题前后

这种设计让定制变得异常灵活，无需 fork 整个主题。

## UnoCSS 集成

选择 UnoCSS 而非 Tailwind CSS 的原因很简单：**更快的速度、更强的可定制性、更小的体积**。

```ts
// uno.config.ts
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),   // attributify 模式
    presetIcons(),         // 纯 CSS 图标
    presetTypography(),    // 排版预设
  ],
  shortcuts: {
    'card': 'rounded-xl bg-card border ...',
    'btn-primary': 'btn bg-brand text-white ...',
  },
})
```

## 深色模式

VitePress 内置了完善的深色模式支持。我们在 CSS 中使用 `dark` 类来覆盖颜色变量：

```css
:root {
  --brand: #2563eb;
}

.dark {
  --brand: #60a5fa;
}
```

关键原则是 **使用语义化的 CSS 变量命名**，而非直接使用颜色值，确保在深浅模式切换时有一致的体验。

## 性能指标

经过 Lighthouse 测试，本站取得了接近满分的成绩：

- Performance: **99**
- Accessibility: **100**
- Best Practices: **100**
- SEO: **100**

## 下一步

1. 接入 RSS Feed 生成
2. 添加阅读量统计
3. 实现基于标签的自动关联推荐
4. 部署到 GitHub Pages 并配置自定义域名

---

这就是构建 ysuhan.dev 的完整故事。如果你也在考虑搭建个人网站，希望这篇文章能给你一些启发。Happy building! 🚀

