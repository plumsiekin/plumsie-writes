import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { StoryCard } from "@/components/StoryCard";
import { Ornament } from "@/components/Ornament";
import { stories } from "@/data/stories";

type Filter = "all" | "ongoing" | "complete" | "hiatus";

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "The Library — Plumsie's Place" },
      { name: "description", content: "All stories by plumsiepie. Browse SimLit fiction in chapters — literary, melancholy-romantic, and game-inspired." },
      { property: "og:title", content: "The Library — Plumsie's Place" },
      { property: "og:description", content: "All SimLit stories by plumsiepie. Browse fiction in chapters." },
    ],
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const [filter, setFilter] = useState<Filter>("all");
  const filters: Filter[] = ["all", "ongoing", "complete", "hiatus"];
  const visible = stories.filter((s) => filter === "all" || s.status === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-12 text-center">
        <h1 className="font-cormorant font-semibold text-5xl text-sand-900 dark:text-sand-50 mb-3">The Library</h1>
        <p className="text-sand-600 dark:text-sand-400 text-sm mb-3">
          {stories.length} {stories.length === 1 ? "story" : "stories"}
        </p>
        <p className="text-sand-600 dark:text-sand-400 text-sm">
          Looking for writing tips and behind-the-scenes posts?{" "}
          <Link to="/blog" className="text-sand-700 dark:text-sand-300 underline underline-offset-2 hover:text-sand-900 dark:hover:text-sand-100 transition-colors">
            Visit the blog →
          </Link>
        </p>
      </div>

      <Ornament />

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by status">
        {filters.map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                active
                  ? "bg-sand-800 dark:bg-sand-600 text-sand-50 border-sand-800 dark:border-sand-600"
                  : "bg-transparent text-sand-600 dark:text-sand-400 border-sand-300 dark:border-sand-700 hover:border-sand-500"
              }`}
            >
              {f === "all" ? "All" : f === "hiatus" ? "On Hiatus" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="space-y-6">
          {visible.map((s) => <StoryCard key={s.id} story={s} />)}
        </div>
      ) : (
        <p className="text-center text-sand-400 dark:text-sand-600 py-12 text-sm">No stories in this category yet.</p>
      )}
    </div>
  );
}
