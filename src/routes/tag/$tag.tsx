import { createFileRoute, Link } from "@tanstack/react-router";
import { StoryCard } from "@/components/StoryCard";
import { Ornament } from "@/components/Ornament";
import { stories } from "@/data/stories";
import { getAllPosts } from "@/lib/blog";

export const Route = createFileRoute("/tag/$tag")({
  loader: ({ params }) => ({ tag: params.tag }),
  head: ({ loaderData }) => ({
    meta: [
      { title: `#${loaderData?.tag} — Plumsie's Place` },
      { name: "description", content: `Stories and posts tagged "${loaderData?.tag}" on Plumsie's Place.` },
      { property: "og:title", content: `#${loaderData?.tag} — Plumsie's Place` },
      { property: "og:description", content: `Stories and posts tagged "${loaderData?.tag}".` },
    ],
  }),
  component: TagPage,
});

function TagPage() {
  const { tag } = Route.useLoaderData();

  const matchedStories = stories.filter(
    (s) =>
      s.genre.map((g) => g.toLowerCase()).includes(tag) ||
      s.contentWarnings.includes(tag)
  );
  const matchedPosts = getAllPosts().filter((p) => p.category === tag);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs text-sand-400 uppercase tracking-widest mb-2">Tag</p>
        <h1 className="font-cormorant font-semibold text-4xl text-sand-900 dark:text-sand-50">#{tag}</h1>
      </div>

      {matchedStories.length > 0 && (
        <>
          <h2 className="text-xs uppercase tracking-widest text-sand-400 mb-4">Stories</h2>
          <div className="space-y-6 mb-12">
            {matchedStories.map((s) => <StoryCard key={s.id} story={s} />)}
          </div>
        </>
      )}

      {matchedPosts.length > 0 && (
        <>
          <Ornament />
          <h2 className="text-xs uppercase tracking-widest text-sand-400 mb-4">Blog posts</h2>
          <div className="space-y-4">
            {matchedPosts.map((post) => (
              <article key={post.id} className="flex gap-4 items-start p-4 bg-white dark:bg-sand-900 rounded-lg border border-sand-100 dark:border-sand-800">
                <div className="flex-1">
                  <h3 className="font-cormorant font-semibold text-xl text-sand-900 dark:text-sand-50 mb-1">
                    <Link to="/blog/$id" params={{ id: post.id }} className="hover:text-sand-700 dark:hover:text-sand-200 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-sand-600 dark:text-sand-400">{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </>
      )}

      {matchedStories.length === 0 && matchedPosts.length === 0 && (
        <p className="text-sand-400 dark:text-sand-600 text-sm">Nothing tagged "{tag}" yet.</p>
      )}
    </div>
  );
}
