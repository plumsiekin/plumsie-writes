import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Ornament } from "@/components/Ornament";
import { getAllPosts, categoryLabels, type BlogFrontmatter } from "@/lib/blog";

type CategoryFilter = "all" | BlogFrontmatter["category"];
const categories: CategoryFilter[] = ["all", "sims-4", "simlit", "cc-mods", "gaming", "behind-the-story"];

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "From the Simmer — Blog | plumsiepie" },
      { name: "description", content: "Writing about Sims 4, SimLit, CC & mods, and the behind-the-scenes of making game-inspired fiction. By plumsiepie." },
      { property: "og:title", content: "From the Simmer — Blog | plumsiepie" },
      { property: "og:description", content: "Writing about Sims 4, SimLit, CC & mods, and behind-the-scenes notes." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const posts = getAllPosts();
  const [filter, setFilter] = useState<CategoryFilter>("all");
  const visible = posts.filter((p) => filter === "all" || p.category === filter);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-4 text-center">
        <h1 className="font-cormorant font-semibold text-5xl text-sand-900 dark:text-sand-50 mb-3">From the Simmer</h1>
        <p className="text-sand-600 dark:text-sand-400 text-sm mb-4">{posts.length} posts</p>
        <p className="text-sand-600 dark:text-sand-400 text-sm">
          Here for the fiction?{" "}
          <Link to="/stories" className="text-sand-700 dark:text-sand-300 underline underline-offset-2 hover:text-sand-900 dark:hover:text-sand-100 transition-colors">
            Browse the stories →
          </Link>
        </p>
      </div>

      <Ornament />

      <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter by category">
        {categories.map((cat) => {
          const active = filter === cat;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={active}
              className={`text-sm px-4 py-1.5 rounded-full border transition-colors ${
                active
                  ? "bg-sand-800 dark:bg-sand-700 text-sand-50 border-sand-800 dark:border-sand-700"
                  : "bg-transparent text-sand-600 dark:text-sand-400 border-sand-200 dark:border-sand-700 hover:border-sand-400 dark:hover:border-sand-500"
              }`}
            >
              {cat === "all" ? "All" : categoryLabels[cat]}
            </button>
          );
        })}
      </div>

      {visible.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {visible.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-sand-900 border border-sand-100 dark:border-sand-800 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link to="/blog/$id" params={{ id: post.id }} className="block overflow-hidden aspect-video bg-sand-200 dark:bg-sand-800">
                <img
                  src={post.coverImage}
                  alt=""
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder-blog.jpg"; }}
                />
              </Link>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Link
                    to="/blog/category/$category"
                    params={{ category: post.category }}
                    className="text-xs text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-sand-700 px-2 py-0.5 rounded-full hover:border-sand-400 transition-colors"
                  >
                    {categoryLabels[post.category]}
                  </Link>
                  <time className="text-xs text-sand-400 dark:text-sand-600" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                  </time>
                </div>
                <h2 className="font-cormorant font-semibold text-xl text-sand-900 dark:text-sand-50 mb-2 leading-snug group-hover:text-sand-700 dark:group-hover:text-sand-200 transition-colors">
                  <Link to="/blog/$id" params={{ id: post.id }}>{post.title}</Link>
                </h2>
                <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-3">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-center text-sand-400 dark:text-sand-600 py-12 text-sm">No posts in this category yet.</p>
      )}
    </div>
  );
}
