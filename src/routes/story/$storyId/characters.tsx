import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Ornament } from "@/components/Ornament";
import { stories, type Character } from "@/data/stories";

export const Route = createFileRoute("/story/$storyId/characters")({
  loader: ({ params }) => {
    const story = stories.find((s) => s.id === params.storyId);
    if (!story) throw notFound();
    return { story };
  },
  head: ({ loaderData }) => {
    const story = loaderData?.story;
    if (!story) return { meta: [{ title: "Cast" }] };
    return {
      meta: [
        { title: `Cast — ${story.title} — Plumsie's Place` },
        { name: "description", content: `Meet the characters of ${story.title}: ${story.characters.map((c) => c.name).join(", ")}.` },
        { property: "og:title", content: `Cast — ${story.title}` },
        { property: "og:image", content: story.coverImage },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <h1 className="font-cormorant text-4xl">Story not found</h1>
      <Link to="/stories" className="mt-6 inline-block text-sand-700 dark:text-sand-300 underline underline-offset-2">Browse the library</Link>
    </div>
  ),
  component: CharactersPage,
});

function CharactersPage() {
  const { story } = Route.useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <nav className="flex items-center gap-2 text-xs text-sand-400 dark:text-sand-600 mb-10" aria-label="Breadcrumb">
        <Link to="/" className="hover:text-sand-700 dark:hover:text-sand-300 transition-colors">Home</Link>
        <span aria-hidden="true">/</span>
        <Link to="/story/$storyId" params={{ storyId: story.id }} className="hover:text-sand-700 dark:hover:text-sand-300 transition-colors">
          {story.title}
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-sand-600 dark:text-sand-400">Characters</span>
      </nav>

      <div className="mb-12 text-center">
        <p className="text-sand-400 dark:text-sand-600 text-sm mb-2 uppercase tracking-widest">{story.title}</p>
        <h1 className="font-cormorant font-semibold text-4xl text-sand-900 dark:text-sand-50">Cast of Characters</h1>
      </div>

      <Ornament />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {story.characters.map((char: Character) => (
          <article key={char.name} className="bg-white dark:bg-sand-900 border border-sand-100 dark:border-sand-800 rounded-lg overflow-hidden shadow-sm">
            <div className="aspect-[3/2] bg-sand-200 dark:bg-sand-800 overflow-hidden">
              {char.portrait ? (
                <img
                  src={char.portrait}
                  alt={`Portrait of ${char.name}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-cormorant text-6xl text-sand-400 dark:text-sand-600" aria-hidden="true">{char.name[0]}</span>
                </div>
              )}
            </div>
            <div className="p-6">
              <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50 mb-1">{char.name}</h2>
              <p className="text-xs text-sand-600 dark:text-sand-400 mb-3 uppercase tracking-wide">{char.role}</p>
              <p className="text-sm text-sand-700 dark:text-sand-300 leading-relaxed">{char.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/story/$storyId" params={{ storyId: story.id }} className="text-sm text-sand-600 dark:text-sand-400 hover:text-sand-800 dark:hover:text-sand-100 transition-colors">
          ← Back to {story.title}
        </Link>
      </div>
    </div>
  );
}
