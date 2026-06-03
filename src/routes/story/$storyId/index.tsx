import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { ChapterList } from "@/components/ChapterList";
import { ContentWarning } from "@/components/ContentWarning";
import { stories, type Character, type Story } from "@/data/stories";

export const Route = createFileRoute("/story/$storyId/")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.id === params.storyId);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    const story = loaderData?.story;
    if (!story) return { meta: [{ title: "Story" }] };
    const desc = story.description.length > 160 ? story.description.slice(0, 157) + "…" : story.description;
    return {
      meta: [
        { title: `${story.title} — SimLit by plumsiepie` },
        { name: "description", content: desc },
        { property: "og:title", content: story.title },
        { property: "og:description", content: desc },
        { property: "og:image", content: story.coverImage },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-4xl">Story not found</h1>
      <Link to="/stories" className="mt-6 inline-block text-sand-700 dark:text-sand-300 underline underline-offset-2">Browse the library</Link>
    </div>
  ),
  component: StoryPage,
});

const statusLabels = { ongoing: "Ongoing", complete: "Complete", hiatus: "On Hiatus" } as const;
const statusClasses = { ongoing: "status-ongoing", complete: "status-complete", hiatus: "status-hiatus" } as const;

function StoryPage() {
  const { story } = Route.useLoaderData();

  return (
    <div className="-mt-20">
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={story.coverImage}
            alt={`Cover image for ${story.title}`}
            className="ken-burns w-full h-full object-cover"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder-cover.jpg"; }}
          />
        </div>
        <div className="cover-gradient absolute inset-0 pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none cover-gradient-side" />

        <div className="relative z-10 max-w-6xl mx-auto px-6 pb-12 w-full">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClasses[story.status as Story["status"]]}`}>
                {statusLabels[story.status as Story["status"]]}
              </span>
              {story.genre.map((g: string) => (
                <span key={g} className="text-xs text-sand-300 border border-sand-600 px-2 py-0.5 rounded-full">{g}</span>
              ))}
            </div>
            <h1 className="font-cormorant font-semibold text-4xl md:text-6xl text-white mb-2 leading-tight">{story.title}</h1>
            <p className="text-sand-300 text-lg italic mb-6 font-cormorant">{story.subtitle}</p>
            <Link
              to="/story/$storyId/chapter/$number"
              params={{ storyId: story.id, number: "1" }}
              className="inline-block bg-sand-100 hover:bg-white text-sand-900 text-sm font-medium px-6 py-3 rounded transition-colors"
            >
              Start from Chapter 1
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <section className="max-w-2xl mb-12">
          <p className="text-sand-700 dark:text-sand-300 text-lg leading-relaxed">{story.description}</p>
        </section>

        <Ornament />

        {story.contentWarnings.length > 0 && (
          <section className="mb-12">
            <ContentWarning warnings={story.contentWarnings} label="Story content warnings" />
          </section>
        )}

        <section className="mb-12">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50">Characters</h2>
            <Link
              to="/story/$storyId/characters"
              params={{ storyId: story.id }}
              className="text-sm text-sand-600 hover:text-sand-700 dark:hover:text-sand-200 transition-colors"
            >
              Full cast →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {story.characters.slice(0, 4).map((char: Character) => (
              <div key={char.name} className="flex items-start gap-3 p-4 bg-sand-100 dark:bg-sand-900 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-sand-300 dark:bg-sand-700 shrink-0 overflow-hidden">
                  {char.portrait ? (
                    <img
                      src={char.portrait}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-sand-600 text-xs font-medium">
                      {char.name[0]}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-medium text-sand-900 dark:text-sand-100 text-sm">{char.name}</p>
                  <p className="text-xs text-sand-600 dark:text-sand-400">{char.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <Ornament />

        <section>
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50">Chapters</h2>
            <Link
              to="/story/$storyId/chapter/$number"
              params={{ storyId: story.id, number: "1" }}
              className="text-sm text-sand-600 dark:text-sand-400 border border-sand-300 dark:border-sand-700 px-3 py-1 rounded hover:bg-sand-100 dark:hover:bg-sand-800 transition-colors"
            >
              New? Start at Chapter 1 →
            </Link>
          </div>
          <ChapterList storyId={story.id} chapters={story.chapters} />
        </section>
      </div>
    </div>
  );
}
