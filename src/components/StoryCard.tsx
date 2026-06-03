import { Link } from "@tanstack/react-router";
import type { Story } from "@/data/stories";

const statusLabels: Record<Story["status"], string> = { ongoing: "Ongoing", complete: "Complete", hiatus: "On Hiatus" };
const statusClasses: Record<Story["status"], string> = { ongoing: "status-ongoing", complete: "status-complete", hiatus: "status-hiatus" };

export function StoryCard({ story }: { story: Story }) {
  return (
    <article className="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-sand-900 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-sand-100 dark:border-sand-800">
      <Link to="/story/$storyId" params={{ storyId: story.id }} className="sm:w-48 sm:shrink-0 block overflow-hidden">
        <img
          src={story.coverImage}
          alt={`Cover image for ${story.title}`}
          className="w-full h-48 sm:h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "/images/placeholder-cover.jpg"; }}
        />
      </Link>

      <div className="flex flex-col justify-between p-6 flex-1">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusClasses[story.status]}`}>
              {statusLabels[story.status]}
            </span>
            {story.genre.map((g) => (
              <span key={g} className="text-xs text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-sand-700 px-2 py-0.5 rounded-full">{g}</span>
            ))}
          </div>

          <h2 className="font-cormorant font-semibold text-2xl text-sand-900 dark:text-sand-50 mb-1">
            <Link to="/story/$storyId" params={{ storyId: story.id }} className="hover:text-sand-700 dark:hover:text-sand-200 transition-colors">{story.title}</Link>
          </h2>
          <p className="text-sand-600 dark:text-sand-400 italic text-sm mb-3 font-cormorant">{story.subtitle}</p>
          <p className="text-sand-700 dark:text-sand-300 text-sm leading-relaxed line-clamp-3">{story.description}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xs text-sand-400">
            {story.chapters.length} {story.chapters.length === 1 ? "chapter" : "chapters"}
          </span>
          <Link to="/story/$storyId" params={{ storyId: story.id }} className="text-sm text-sand-700 dark:text-sand-300 hover:text-sand-900 dark:hover:text-sand-50 font-medium transition-colors">
            Start reading →
          </Link>
        </div>
      </div>
    </article>
  );
}
