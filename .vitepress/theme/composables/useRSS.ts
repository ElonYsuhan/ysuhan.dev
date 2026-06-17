/**
 * RSS Feed generation — reserved for future activation.
 *
 * To enable RSS:
 * 1. Install feed: `pnpm add -D feed`
 * 2. Uncomment the `generateRSS` call in your build hook
 * 3. The generated feed.xml will be written to the output directory
 *
 * This composable defines the feed structure and content extraction
 * logic. Import it from a VitePress buildEnd hook in config.ts.
 */

import type { SITE } from '../../constants'

interface FeedItem {
  title: string
  description: string
  date: Date
  url: string
  author?: string
}

/**
 * Generate RSS feed XML string from a list of items.
 * Uses a minimal hand-rolled approach to avoid the `feed` dependency
 * until RSS is activated.
 */
export function generateRSSXML(items: FeedItem[]): string {
  const { SITE } = require('../../constants') as { SITE: typeof import('../../constants')['SITE'] }

  const itemsXML = items
    .map(
      (item) => `
    <entry>
      <title><![CDATA[${item.title}]]></title>
      <link href="${SITE.url}${item.url}" />
      <id>${SITE.url}${item.url}</id>
      <published>${item.date.toISOString()}</published>
      <updated>${item.date.toISOString()}</updated>
      <summary><![CDATA[${item.description}]]></summary>
      ${item.author ? `<author><name>${item.author}</name></author>` : ''}
    </entry>`
    )
    .join('\n')

  return `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE.title}</title>
  <link href="${SITE.url}" />
  <link rel="self" href="${SITE.url}/feed.xml" />
  <updated>${new Date().toISOString()}</updated>
  <id>${SITE.url}</id>
  <author><name>${SITE.author}</name></author>
  ${itemsXML}
</feed>`
}

