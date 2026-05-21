import { promises as fs } from "node:fs";
import path from "node:path";

const root = process.cwd();
const blogDir = path.join(root, "src", "content", "blog");
const model = process.env.OPENAI_MODEL || "gpt-5.2";
const apiKey = process.env.OPENAI_API_KEY;

const metadataSchema = {
  type: "object",
  additionalProperties: false,
  properties: {
    title: {
      type: "string",
      description: "Clear blog title, no clickbait, 45-75 characters when possible.",
    },
    slug: {
      type: "string",
      description: "Lowercase URL slug using a-z, 0-9 and hyphens only.",
    },
    description: {
      type: "string",
      description: "Search/social description, 120-155 characters.",
    },
    excerpt: {
      type: "string",
      description: "Short human-readable archive excerpt, 140-220 characters.",
    },
    tags: {
      type: "array",
      minItems: 2,
      maxItems: 6,
      items: {
        type: "string",
      },
      description: "Professional topic tags relevant to Samir Pipalia's positioning.",
    },
    social_summary: {
      type: "string",
      description: "One concise LinkedIn-style summary sentence.",
    },
  },
  required: ["title", "slug", "description", "excerpt", "tags", "social_summary"],
};

function splitFrontmatter(markdown) {
  if (!markdown.startsWith("---\n")) {
    return { frontmatter: {}, body: markdown.trim() };
  }

  const end = markdown.indexOf("\n---", 4);
  if (end === -1) {
    return { frontmatter: {}, body: markdown.trim() };
  }

  const raw = markdown.slice(4, end).trim();
  const body = markdown.slice(end + 4).trim();
  return { frontmatter: parseYamlSubset(raw), body };
}

function parseYamlSubset(raw) {
  const data = {};
  const lines = raw.split(/\r?\n/);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith("#")) continue;
    const match = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!match) continue;
    const [, key, value] = match;

    if (value === "") {
      const items = [];
      while (lines[index + 1]?.match(/^\s+-\s+/)) {
        index += 1;
        items.push(unquote(lines[index].replace(/^\s+-\s+/, "").trim()));
      }
      data[key] = items;
      continue;
    }

    if (value === "true" || value === "false") {
      data[key] = value === "true";
    } else if (value === "[]" || value === "") {
      data[key] = [];
    } else {
      data[key] = unquote(value);
    }
  }

  return data;
}

function unquote(value) {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }
  return value;
}

function stringifyFrontmatter(data) {
  const orderedKeys = [
    "title",
    "slug",
    "description",
    "excerpt",
    "tags",
    "publish_at",
    "hero_image",
    "linkedin_url",
    "status",
    "social_summary",
    "ai_generated",
    "ai_generated_at",
  ];

  const keys = [...orderedKeys, ...Object.keys(data).filter((key) => !orderedKeys.includes(key))];
  const lines = [];

  for (const key of keys) {
    if (!(key in data) || data[key] === undefined || data[key] === null) continue;
    const value = data[key];
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) lines.push(`  - ${quoteYaml(String(item))}`);
    } else if (typeof value === "boolean") {
      lines.push(`${key}: ${value ? "true" : "false"}`);
    } else {
      lines.push(`${key}: ${quoteYaml(String(value))}`);
    }
  }

  return `---\n${lines.join("\n")}\n---\n`;
}

function quoteYaml(value) {
  const escaped = value.replaceAll("\\", "\\\\").replaceAll('"', '\\"');
  return `"${escaped}"`;
}

async function listMarkdownFiles(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return listMarkdownFiles(fullPath);
      if (entry.isFile() && /\.mdx?$/.test(entry.name)) return [fullPath];
      return [];
    }));
    return files.flat();
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

function needsMetadata(frontmatter) {
  return !frontmatter.ai_generated ||
    !frontmatter.title ||
    !frontmatter.slug ||
    !frontmatter.description ||
    !frontmatter.excerpt ||
    !Array.isArray(frontmatter.tags) ||
    frontmatter.tags.length === 0;
}

function normaliseSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80)
    .replace(/-+$/g, "") || "blog-post";
}

async function generateMetadata(body) {
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is required when posts need AI metadata.");
  }

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      instructions:
        "You generate professional blog metadata for Samir Pipalia, a London-based Head of Applications / ERP and integration leader. Keep the tone practical, specific, and credible. Use British English. Return JSON matching the supplied schema.",
      input: `Generate metadata for this blog post body:\n\n${body}`,
      text: {
        format: {
          type: "json_schema",
          name: "blog_metadata",
          strict: true,
          schema: metadataSchema,
        },
      },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed: ${response.status} ${errorText}`);
  }

  const json = await response.json();
  const outputText = json.output_text ||
    json.output?.flatMap((item) => item.content || [])
      .find((content) => content.type === "output_text")?.text;

  if (!outputText) {
    throw new Error("OpenAI response did not include output_text.");
  }

  const metadata = JSON.parse(outputText);
  metadata.slug = normaliseSlug(metadata.slug);
  metadata.tags = [...new Set(metadata.tags.map((tag) => String(tag).trim()).filter(Boolean))].slice(0, 6);
  return metadata;
}

const files = await listMarkdownFiles(blogDir);
let updated = 0;

for (const file of files) {
  const markdown = await fs.readFile(file, "utf8");
  const { frontmatter, body } = splitFrontmatter(markdown);
  if (!body || !needsMetadata(frontmatter)) continue;

  const metadata = await generateMetadata(body);
  const nextFrontmatter = {
    ...frontmatter,
    ...metadata,
    status: frontmatter.status || "scheduled",
    publish_at: frontmatter.publish_at || new Date().toISOString(),
    ai_generated: true,
    ai_generated_at: new Date().toISOString(),
  };

  await fs.writeFile(file, `${stringifyFrontmatter(nextFrontmatter)}\n${body}\n`, "utf8");
  console.log(`Generated metadata for ${path.relative(root, file)}`);
  updated += 1;
}

console.log(updated === 0 ? "No posts needed AI metadata." : `Updated ${updated} post(s).`);
