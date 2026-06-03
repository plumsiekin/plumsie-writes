import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { getAllPosts, categoryLabels, categoryDescriptions, type BlogFrontmatter } from "@/lib/blog";

const validCategories = ["sims-4", "simlit", "cc-mods", "gaming", "behind-the-story"] as const;

function isCategory(c: string): c is BlogFrontmatter["category"] {
  return (validCategories as readonly string[]).includes(c);
}

export const Route = createFileRoute("/blog/category/$category")({
  loader: ({ params }) => {
    if (!isCategory(params.category)) throw notFound();
    return { category: params.category };
  },
  head: ({ loaderData }) => {
    const cat = loaderData?.category;
    if (!cat) return { meta: [{ title: "Category" }] };
    const label = categoryLabels[cat];
    const desc = categoryDescriptions[cat];
    return {
      meta: [
        { title: `${label} — Blog | plumsiepie` },
        { name: "description", content: desc.slice(0, 160) },
        { property: "og:title", content: `${label} — Blog | plumsiepie` },
        { property: "og:description", content: desc.slice(0, 160) },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-4xl">Unknown category</h1>
      <Link to="/blog" className="mt-6 inline-block text-sand-700 dark:text-sand-300 underline underline-offset-2">Back to blog</Link>
    </div>
  ),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const label = categoryLabels[category as keyof typeof categoryLabels];
  const description = categoryDescriptions[category as keyof typeof categoryDescriptions];
  const posts = getAllPosts().filter((p) => p.category === category);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="mb-10">
        <Link to="/blog" className="text-xs text-sand-400 dark:text-sand-600 hover:text-sand-700 dark:hover:text-sand-300 transition-colors uppercase tracking-widest">
          ← All posts
        </Link>
        <h1 className="font-cormorant font-semibold text-4xl md:text-5xl text-sand-900 dark:text-sand-50 mt-3 mb-3">{label}</h1>
        <p className="text-sand-600 dark:text-sand-400 leading-relaxed max-w-2xl">{description}</p>
        <p className="text-xs text-sand-400 dark:text-sand-600 mt-3">
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </div>

      <Ornament />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group bg-white dark:bg-sand-900 border border-sand-100 dark:border-sand-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
                <time className="text-xs text-sand-400 dark:text-sand-600" dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                </time>
                <h2 className="font-cormorant font-semibold text-xl text-sand-900 dark:text-sand-50 mt-1 mb-2 leading-snug group-hover:text-sand-700 dark:group-hover:text-sand-200 transition-colors">
                  <Link to="/blog/$id" params={{ id: post.id }}>{post.title}</Link>
                </h2>
                <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-3">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="text-sand-400 dark:text-sand-600 text-sm">No posts in this category yet.</p>
      )}
    </div>
  );
}
