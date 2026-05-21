import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function isPostLive(post: BlogPost, now = new Date()) {
  return post.data.status !== "draft" &&
    post.data.publish_at <= now &&
    Boolean(post.data.title) &&
    Boolean(post.data.slug) &&
    Boolean(post.data.description) &&
    Boolean(post.data.excerpt) &&
    post.data.tags.length > 0;
}

export function postTitle(post: BlogPost) {
  return post.data.title || "Untitled post";
}

export function postSlug(post: BlogPost) {
  return post.data.slug || post.id.replace(/\.mdx?$/, "").split("/").pop() || "post";
}

export function postUrl(post: BlogPost) {
  const date = post.data.publish_at;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  return `/blog/${year}/${month}/${postSlug(post)}/`;
}

export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(date);
}

export async function getLivePosts(limit?: number) {
  const posts = await getCollection("blog");
  const live = posts
    .filter((post) => isPostLive(post))
    .sort((a, b) => b.data.publish_at.getTime() - a.data.publish_at.getTime());

  return typeof limit === "number" ? live.slice(0, limit) : live;
}
