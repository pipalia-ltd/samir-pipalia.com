import { site } from "@data/site";
import { getLivePosts, postUrl } from "@lib/posts";

const staticUrls = [
  ["/", "1.0"],
  ["/blog/", "0.9"],
  ["/sap-business-one-landscape-stabilisation.html", "0.9"],
  ["/sap-business-one-fuel-card-integration.html", "0.9"],
  ["/shopify-sap-business-one-integration.html", "0.9"],
  ["/llms.txt", "0.8"],
  ["/ai-profile.json", "0.8"],
  ["/privacy.html", "0.3"],
];

export async function GET() {
  const posts = await getLivePosts();
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    ...staticUrls.map(([path, priority]) => ({ loc: new URL(path, site.url).toString(), lastmod: today, priority })),
    ...posts.map((post) => ({
      loc: new URL(postUrl(post), site.url).toString(),
      lastmod: post.data.publish_at.toISOString().slice(0, 10),
      priority: "0.7",
    })),
  ];

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <priority>${url.priority}</priority>
  </url>`).join("\n")}
</urlset>`, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
