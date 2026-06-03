import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { ContentWarning } from "@/components/ContentWarning";
import { ReadingProgress } from "@/components/ReadingProgress";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { RelatedContent, type RelatedItem } from "@/components/RelatedContent";
import { stories, type Chapter } from "@/data/stories";
import { getAllPosts } from "@/lib/blog";

export const Route = createFileRoute("/story/$storyId/chapter/$number")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.id === params.storyId);
    if (!story) throw notFound();
    const num = parseInt(params.number, 10);
    const chapter = story.chapters.find((c) => c.number === num);
    if (!chapter) throw notFound();
    return { story, chapter };
  },
  head: ({ loaderData }) => {
    const sc = loaderData;
    if (!sc) return { meta: [{ title: "Chapter" }] };
    const { story, chapter } = sc;
    const desc = chapter.excerpt.length > 160 ? chapter.excerpt.slice(0, 157) + "…" : chapter.excerpt;
    const og = chapter.imageUrl ?? story.coverImage;
    return {
      meta: [
        { title: `Chapter ${chapter.number}: ${chapter.title} — ${story.title} | plumsiepie` },
        { name: "description", content: desc },
        { property: "og:title", content: `${chapter.title} — ${story.title}` },
        { property: "og:description", content: desc },
        { property: "og:image", content: og },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-4xl">Chapter not found</h1>
      <Link to="/stories" className="mt-6 inline-block text-sand-700 dark:text-sand-300 underline underline-offset-2">Browse the library</Link>
    </div>
  ),
  component: ChapterPage,
});

function ChapterPage() {
  const { story, chapter } = Route.useLoaderData();
  const prevChapter = story.chapters.find((c: Chapter) => c.number === chapter.number - 1);
  const nextChapter = story.chapters.find((c: Chapter) => c.number === chapter.number + 1);
  const paragraphs = chapter.content.split("\n\n").filter(Boolean);

  const blogPosts = getAllPosts();
  const relatedItems: RelatedItem[] = [
    nextChapter
      ? {
          href: `/story/${story.id}/chapter/${nextChapter.number}`,
          title: nextChapter.title,
          tag: story.title,
          excerpt: nextChapter.excerpt,
          readingTime: nextChapter.readingTime,
        }
      : {
          href: `/story/${story.id}`,
          title: story.title,
          tag: "Story",
          excerpt: story.description,
        },
    ...(blogPosts.length > 0
      ? [{
          href: `/blog/${blogPosts[0].id}`,
          title: blogPosts[0].title,
          tag: blogPosts[0].category.replace(/-/g, " "),
          excerpt: blogPosts[0].excerpt,
        }]
      : []),
  ].slice(0, 2);

  return (
    <>
      <ScrollProgressBar />
      {chapter.imageUrl && (
        <section className="-mt-20 relative h-[45vh] min-h-[280px] overflow-hidden flex items-end">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={chapter.imageUrl}
              alt={`Cover for ${chapter.title}`}
              className="ken-burns w-full h-full object-cover"
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
            />
          </div>
          <div className="cover-gradient absolute inset-0 pointer-events-none" />
        </section>
      )}

      <div className={`max-w-3xl mx-auto px-6 ${chapter.imageUrl ? "pt-10" : "pt-16"} pb-24`}>
        <nav className="flex items-center gap-2 text-xs text-sand-400 dark:text-sand-600 mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-sand-700 dark:hover:text-sand-300 transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link to="/story/$storyId" params={{ storyId: story.id }} className="hover:text-sand-700 dark:hover:text-sand-300 transition-colors">
            {story.title}
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-sand-600 dark:text-sand-400">Ch. {chapter.number}</span>
        </nav>

        <header className="mb-8">
          <p className="text-xs text-sand-400 dark:text-sand-600 uppercase tracking-widest mb-2">
            Chapter {String(chapter.number).padStart(2, "0")}
          </p>
          <h1 className="font-cormorant font-semibold text-4xl md:text-5xl text-sand-900 dark:text-sand-50 mb-4 leading-tight">
            {chapter.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-sand-400 dark:text-sand-600 mb-4">
            <span>~{chapter.readingTime} min read</span>
            <span aria-hidden="true">·</span>
            <ReadingProgress current={chapter.number} total={story.chapters.length} />
          </div>

          <nav className="flex items-center justify-between text-sm text-sand-600 dark:text-sand-400 border-t border-sand-200 dark:border-sand-800 pt-4" aria-label="Chapter navigation top">
            {prevChapter ? (
              <Link to="/story/$storyId/chapter/$number" params={{ storyId: story.id, number: String(prevChapter.number) }} className="hover:text-sand-800 dark:hover:text-sand-100 transition-colors truncate max-w-[45%]">
                ← {prevChapter.title}
              </Link>
            ) : <span />}
            {nextChapter ? (
              <Link to="/story/$storyId/chapter/$number" params={{ storyId: story.id, number: String(nextChapter.number) }} className="hover:text-sand-800 dark:hover:text-sand-100 transition-colors truncate max-w-[45%] text-right">
                {nextChapter.title} →
              </Link>
            ) : <span />}
          </nav>
        </header>

        {chapter.contentWarnings.length > 0 && (
          <ContentWarning warnings={chapter.contentWarnings} collapsible label="This chapter contains" />
        )}

        <article className="prose-reader">
          {paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
        </article>

        <Ornament />

        <div className="bg-sand-100 dark:bg-sand-900 border border-sand-200 dark:border-sand-800 rounded-lg p-5 text-center mb-10">
          <p className="text-sand-600 dark:text-sand-400 text-sm mb-3">Enjoying the story? Support the writing.</p>
          <a
            href="https://ko-fi.com/plumsiepie"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm text-sand-700 dark:text-sand-300 border border-sand-300 dark:border-sand-600 px-4 py-2 rounded hover:bg-sand-200 dark:hover:bg-sand-800 transition-colors"
          >
            Buy me a coffee on Ko-fi ☕
          </a>
        </div>

        <nav className="flex items-center justify-between text-sm text-sand-600 dark:text-sand-400 border-t border-sand-200 dark:border-sand-800 pt-6 mb-6" aria-label="Chapter navigation bottom">
          {prevChapter ? (
            <Link to="/story/$storyId/chapter/$number" params={{ storyId: story.id, number: String(prevChapter.number) }} className="hover:text-sand-800 dark:hover:text-sand-100 transition-colors truncate max-w-[45%]">
              ← {prevChapter.title}
            </Link>
          ) : <span />}
          {nextChapter ? (
            <Link to="/story/$storyId/chapter/$number" params={{ storyId: story.id, number: String(nextChapter.number) }} className="hover:text-sand-800 dark:hover:text-sand-100 transition-colors truncate max-w-[45%] text-right">
              {nextChapter.title} →
            </Link>
          ) : (
            <Link to="/story/$storyId" params={{ storyId: story.id }} className="hover:text-sand-800 dark:hover:text-sand-100 transition-colors">
              Back to {story.title} →
            </Link>
          )}
        </nav>

        <RelatedContent items={relatedItems} />

        <section className="border-t border-sand-200 dark:border-sand-800 pt-10 mt-10">
          <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50 mb-4">Thoughts</h2>
          <div className="bg-sand-100 dark:bg-sand-900 rounded-lg p-6 text-center text-sand-400 dark:text-sand-600 text-sm">
            Comments coming soon.
          </div>
        </section>
      </div>
    </>
  );
}
