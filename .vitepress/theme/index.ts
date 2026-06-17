import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'

import Layout from './Layout.vue'
import ProjectCard from './components/ProjectCard.vue'
import ShowcaseCard from './components/ShowcaseCard.vue'
import BlogPost from './components/BlogPost.vue'
import NoteCard from './components/NoteCard.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import CustomFooter from './components/CustomFooter.vue'

import './styles/custom.css'
import 'uno.css'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    // Register globally-available components
    app.component('ProjectCard', ProjectCard)
    app.component('ShowcaseCard', ShowcaseCard)
    app.component('BlogPost', BlogPost)
    app.component('NoteCard', NoteCard)
    app.component('FeatureGrid', FeatureGrid)
    app.component('CustomFooter', CustomFooter)
  },
} satisfies Theme

