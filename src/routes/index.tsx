import { createFileRoute, Link } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { ChapterList } from "@/components/ChapterList";
import { StoryCard } from "@/components/StoryCard";
import { stories } from "@/data/stories";

const statusLabels = { ongoing: "Ongoing", complete: "Complete", hiatus: "On Hiatus" } as const;
const statusClasses = { ongoing: "status-ongoing", complete: "status-complete", hiatus: "status-hiatus" } as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Plumsie's Place — SimLit Stories by plumsiepie" },
      { name: "description", content: "SimLit fiction told through The Sims — literary, character-driven stories in chapters. No schedule. Stories arrive when they're ready." },
      { property: "og:title", content: "Plumsie's Place — SimLit by plumsiepie" },
      { property: "og:description", content: "SimLit fiction told through The Sims — literary, character-driven stories in chapters." },
      { property: "og:image", content: stories[0]?.coverImage ?? "/images/og-default.jpg" },
      { name: "twitter:image", content: stories[0]?.coverImage ?? "/images/og-default.jpg" },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = stories[0];
  const otherStories = stories.slice(1);

  return (
    <div className="-mt-20">
      <section
        className="relative flex items-end overflow-hidden"
        style={{ height: "clamp(480px, 62vh, 680px)" }}
        aria-label="Featured story"
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={featured.coverImage}
            alt={`Cover image for ${featured.title}`}
            className="ken-burns w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder-cover.jpg"; }}
          />
        </div>
        <div className="cover-gradient absolute inset-0 pointer-events-none" />
          <div className="absolute inset-0 pointer-events-none cover-gradient-side" />
        <div className="cover-vignette absolute inset-0 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-14 md:pb-20 w-full">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClasses[featured.status]}`}>
                {statusLabels[featured.status]}
              </span>
              {featured.genre.map((g) => (
                <span key={g} className="text-xs text-sand-300 border border-sand-600/50 px-2 py-0.5 rounded-full">{g}</span>
              ))}
            </div>
            <h1 className="font-cormorant font-semibold text-4xl md:text-6xl text-white mb-2 leading-tight">
              {featured.title}
            </h1>
            <p className="text-sand-300 text-lg italic mb-5 font-cormorant">{featured.subtitle}</p>
            <Link
              to="/story/$storyId/chapter/$number"
              params={{ storyId: featured.id, number: "1" }}
              className="inline-block bg-sand-100 hover:bg-white text-sand-900 text-sm font-medium px-5 py-2.5 rounded transition-colors"
            >
              Start reading
            </Link>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 scroll-cue" aria-hidden="true">
          <svg className="w-5 h-5 text-sand-300 opacity-70" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 4v12m0 0l-4-4m4 4l4-4" />
          </svg>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-6 pt-16 pb-4">
        <div className="text-center">
          <p className="font-cormorant text-2xl text-sand-700 dark:text-sand-300 italic mb-4 leading-relaxed">Welcome.</p>
          <p className="text-sand-600 dark:text-sand-400 leading-[1.85] mb-4">
            Plumsie's Place is a home for{" "}
            <strong className="text-sand-800 dark:text-sand-200 font-medium">SimLit</strong> — stories told through The Sims,
            written like fiction. Characters with real weight, places that remember, the slow quiet drama of ordinary lives. If
            you're new here, start wherever feels right.
          </p>
          <p className="text-sand-600 dark:text-sand-600 text-sm leading-relaxed mb-6">
            There's no schedule. Stories arrive when they're ready.
          </p>
          <Link
            to="/stories"
            className="text-sm text-sand-700 dark:text-sand-300 border-b border-sand-400 dark:border-sand-600 hover:border-sand-700 dark:hover:border-sand-300 pb-px transition-colors"
          >
            Browse all stories →
          </Link>
        </div>
      </section>

      <Ornament />

      <section className="max-w-3xl mx-auto px-6 pb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-2">
          <div>
            <p className="text-xs text-sand-400 dark:text-sand-600 uppercase tracking-widest mb-1">Currently reading</p>
            <h2 className="font-cormorant font-semibold text-3xl md:text-4xl text-sand-900 dark:text-sand-50 leading-tight">
              {featured.title}
            </h2>
            <p className="text-sand-600 dark:text-sand-400 italic mt-1 font-cormorant">{featured.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0 mt-1">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClasses[featured.status]}`}>
              {statusLabels[featured.status]}
            </span>
          </div>
        </div>

        <p className="text-sand-600 dark:text-sand-400 leading-relaxed mb-4 mt-4 max-w-2xl">{featured.description}</p>

        <div className="flex flex-wrap gap-2 mb-5">
          {featured.genre.map((g) => (
            <span key={g} className="text-xs text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-sand-700 px-2.5 py-1 rounded-full">
              {g}
            </span>
          ))}
        </div>

        <Link
          to="/story/$storyId"
          params={{ storyId: featured.id }}
          className="text-sm text-sand-600 dark:text-sand-400 hover:text-sand-800 dark:hover:text-sand-100 transition-colors"
        >
          Read more about this story →
        </Link>
      </section>

      <section className="max-w-3xl mx-auto px-6 pb-16">
        <ChapterList storyId={featured.id} chapters={featured.chapters} />
      </section>

      {otherStories.length > 0 && (
        <>
          <Ornament />
          <section className="max-w-4xl mx-auto px-6 pb-16">
            <h2 className="font-cormorant font-semibold text-3xl text-sand-900 dark:text-sand-50 mb-8 text-center">
              The Library
            </h2>
            <div className="space-y-6">
              {otherStories.map((story) => <StoryCard key={story.id} story={story} />)}
            </div>
            <div className="text-center mt-8">
              <Link to="/stories" className="text-sm text-sand-600 dark:text-sand-400 hover:text-sand-800 dark:hover:text-sand-100 transition-colors">
                View all stories →
              </Link>
            </div>
          </section>
        </>
      )}

      <section className="bg-sand-100 dark:bg-sand-900 border-y border-sand-200 dark:border-sand-800 py-16">
        <div className="max-w-xl mx-auto px-6 text-center">
          <h2 className="font-cormorant font-semibold text-3xl text-sand-900 dark:text-sand-50 mb-3">Follow the story</h2>
          <p className="text-sand-600 dark:text-sand-400 text-sm mb-6 leading-relaxed">
            No spam, no schedule. Just a quiet note when something new is ready.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-sm mx-auto" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="home-email">Email address</label>
            <input
              id="home-email"
              type="email"
              placeholder="your@email.com"
              className="flex-1 bg-white dark:bg-sand-800 border border-sand-200 dark:border-sand-700 rounded px-4 py-2.5 text-sm text-sand-900 dark:text-sand-100 placeholder-sand-400 dark:placeholder-sand-500 focus:outline-none focus:border-sand-400"
            />
            <button
              type="submit"
              className="bg-sand-800 hover:bg-sand-700 dark:bg-sand-700 dark:hover:bg-sand-600 text-sand-50 text-sm px-6 py-2.5 rounded transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
