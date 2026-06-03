import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AuthorByline } from "@/components/AuthorByline";
import { Ornament } from "@/components/Ornament";
import { RelatedContent } from "@/components/RelatedContent";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { getAllPosts, getPostById, categoryLabels } from "@/lib/blog";

export const Route = createFileRoute("/blog/$id")({
  loader: ({ params }) => {
    const post = getPostById(params.id);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return { meta: [{ title: "Post not found" }] };
    const desc = post.excerpt.length > 160 ? post.excerpt.slice(0, 157) + "…" : post.excerpt;
    return {
      meta: [
        { title: `${post.title} | plumsiepie` },
        { name: "description", content: desc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: desc },
        { property: "og:image", content: post.coverImage },
        { property: "og:type", content: "article" },
        { name: "twitter:image", content: post.coverImage },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-4xl text-sand-900 dark:text-sand-50">Post not found</h1>
      <p className="mt-3 text-sand-600 dark:text-sand-400">That post doesn't exist.</p>
      <Link to="/blog" className="mt-6 inline-block text-sand-700 dark:text-sand-300 underline underline-offset-2">Back to blog</Link>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-2xl">Couldn't load post</h1>
      <p className="mt-2 text-sm text-sand-600">{error.message}</p>
    </div>
  ),
  component: BlogPost,
});

function BlogPost() {
  const { post } = Route.useLoaderData();
  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = allPosts[idx + 1];
  const nextPost = allPosts[idx - 1];
  const related = allPosts.filter((p) => p.id !== post.id && p.category === post.category).slice(0, 2);

  const formattedDate = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric", month: "long", year: "numeric",
  });

  return (
    <>
      <ScrollProgressBar />
      <div className="max-w-3xl mx-auto px-6 py-16">
        {post.coverImage && (
          <div className="aspect-video rounded-lg overflow-hidden bg-sand-200 dark:bg-sand-800 mb-10">
            <img
              src={post.coverImage}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs text-sand-600 dark:text-sand-400">
          <Link
            to="/blog/category/$category"
            params={{ category: post.category }}
            className="border border-sand-200 dark:border-sand-700 px-2 py-0.5 rounded-full hover:border-sand-400 dark:hover:border-sand-500 transition-colors"
          >
            {categoryLabels[post.category as keyof typeof categoryLabels]}
          </Link>
          <time dateTime={post.date}>{formattedDate}</time>
          <span>~{post.readingTime} min read</span>
        </div>

        <h1 className="font-cormorant font-semibold text-4xl md:text-5xl text-sand-900 dark:text-sand-50 mb-5 leading-tight">
          {post.title}
        </h1>

        <div className="border-b border-sand-200 dark:border-sand-800 pb-5 mb-8">
          <AuthorByline />
        </div>

        <article
          className="blog-prose max-w-[65ch]"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: post.html }}
        />

        <Ornament />

        <div className="border border-sand-200 dark:border-sand-800 rounded-lg p-4 mb-8">
          <p className="text-xs text-sand-400 dark:text-sand-600 uppercase tracking-widest mb-3">About the author</p>
          <AuthorByline />
        </div>

        <nav className="flex items-start justify-between gap-8 text-sm border-t border-sand-200 dark:border-sand-800 pt-8 mb-8" aria-label="Post navigation">
          {prevPost ? (
            <Link to="/blog/$id" params={{ id: prevPost.id }} className="flex-1 group">
              <p className="text-xs text-sand-400 mb-1 uppercase tracking-wider">Previous</p>
              <p className="text-sand-700 dark:text-sand-300 group-hover:text-sand-900 dark:group-hover:text-sand-100 transition-colors leading-snug">
                ← {prevPost.title}
              </p>
            </Link>
          ) : <span className="flex-1" />}
          {nextPost ? (
            <Link to="/blog/$id" params={{ id: nextPost.id }} className="flex-1 text-right group">
              <p className="text-xs text-sand-400 mb-1 uppercase tracking-wider">Next</p>
              <p className="text-sand-700 dark:text-sand-300 group-hover:text-sand-900 dark:group-hover:text-sand-100 transition-colors leading-snug">
                {nextPost.title} →
              </p>
            </Link>
          ) : <span className="flex-1" />}
        </nav>

        {related.length > 0 && (
          <RelatedContent
            heading="More from the blog"
            items={related.map((p) => ({
              href: `/blog/${p.id}`,
              title: p.title,
              tag: categoryLabels[p.category],
              excerpt: p.excerpt,
            }))}
          />
        )}

        <div className="mt-10 bg-sand-100 dark:bg-sand-900 border border-sand-200 dark:border-sand-800 rounded-lg p-6 text-center">
          <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50 mb-2">Follow the story</h2>
          <p className="text-sand-600 dark:text-sand-400 text-sm mb-4">No schedule. Just a quiet note when something new is ready.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="blog-post-email">Email address</label>
            <input
              id="blog-post-email"
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white dark:bg-sand-800 border border-sand-200 dark:border-sand-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-sand-400"
            />
            <button type="submit" className="bg-sand-800 hover:bg-sand-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-sand-50 text-sm px-5 py-2 rounded transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
