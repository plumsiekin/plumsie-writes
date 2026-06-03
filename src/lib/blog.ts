import { marked } from "marked";

export interface BlogFrontmatter {
  title: string;
  date: string;
  category: "sims-4" | "simlit" | "cc-mods" | "gaming" | "behind-the-story";
  coverImage: string;
  excerpt: string;
}

export interface BlogPost extends BlogFrontmatter {
  id: string;
  body: string;
  html: string;
  readingTime: number;
}

export const categoryLabels: Record<BlogFrontmatter["category"], string> = {
  "sims-4": "Sims 4",
  simlit: "SimLit",
  "cc-mods": "CC & Mods",
  gaming: "Gaming",
  "behind-the-story": "Behind the Story",
};

export const categoryDescriptions: Record<BlogFrontmatter["category"], string> = {
  "sims-4":
    "Posts about The Sims 4 — gameplay, updates, stories, and the peculiar magic of a life simulator that keeps surprising me.",
  simlit:
    "Writing about SimLit as a form — what it is, how it works, and why stories told through a life simulator can carry genuine emotional weight.",
  "cc-mods":
    "Custom content and mods that shape the visual world of my stories. The tools behind the pictures, credited where I can trace them.",
  gaming:
    "Occasional thoughts on games beyond The Sims — the ones that made me feel something, or think differently about storytelling.",
  "behind-the-story":
    "Process notes, decisions, and the small quiet things that happen between chapters. What I was thinking. What changed.",
};

const rawPosts = import.meta.glob("/src/content/blog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(raw: string): { data: BlogFrontmatter; body: string } {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) {
    throw new Error("Invalid markdown: missing frontmatter");
  }
  const yaml = match[1];
  const body = match[2];
  const data: Record<string, string> = {};
  for (const line of yaml.split("\n")) {
    const m = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }
  return { data: data as unknown as BlogFrontmatter, body };
}

marked.setOptions({ gfm: true, breaks: false });

function buildPosts(): BlogPost[] {
  return Object.entries(rawPosts).map(([path, raw]) => {
    const id = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(raw);
    const words = body.trim().split(/\s+/).length;
    const readingTime = Math.max(1, Math.round(words / 200));
    const html = marked.parse(body) as string;
    return { id, ...data, body, html, readingTime };
  });
}

const allPosts = buildPosts();

export function getAllPosts(): BlogPost[] {
  return [...allPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getPostById(id: string): BlogPost | undefined {
  return allPosts.find((p) => p.id === id);
}
