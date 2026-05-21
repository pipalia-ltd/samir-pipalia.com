import { site } from "@data/site";
import { getLivePosts, postTitle, postUrl } from "@lib/posts";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const posts = await getLivePosts(20);
  const items = posts.map((post) => {
    const url = new URL(postUrl(post), site.url).toString();
    return `<item>
      <title>${escapeXml(postTitle(post))}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${post.data.publish_at.toUTCString()}</pubDate>
      <description>${escapeXml(post.data.excerpt || post.data.description || "")}</description>
    </item>`;
  }).join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(site.name)} Blog</title>
    <link>${site.url}/blog/</link>
    <description>Practical notes on ERP, integrations and application leadership.</description>
    ${items}
  </channel>
</rss>`, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
