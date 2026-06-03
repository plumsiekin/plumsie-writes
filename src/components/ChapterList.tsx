import { Link } from "@tanstack/react-router";
import type { Chapter } from "@/data/stories";

export function ChapterList({ storyId, chapters }: { storyId: string; chapters: Chapter[] }) {
  return (
    <ol className="space-y-1">
      {chapters.map((ch) => (
        <li key={ch.number}>
          <Link
            to="/story/$storyId/chapter/$number"
            params={{ storyId, number: String(ch.number) }}
            className="group flex items-start gap-4 p-4 rounded-lg hover:bg-sand-100 dark:hover:bg-sand-800/50 transition-colors"
          >
            <span className="font-cormorant text-lg font-semibold text-sand-400 dark:text-sand-600 shrink-0 w-8 text-right" aria-hidden="true">
              {String(ch.number).padStart(2, "0")}
            </span>
            <div className="flex-1 min-w-0">
              <h3 className="font-cormorant font-semibold text-lg text-sand-900 dark:text-sand-100 group-hover:text-sand-700 dark:group-hover:text-sand-200 transition-colors">
                {ch.title}
              </h3>
              <p className="text-sm text-sand-600 dark:text-sand-400 mt-0.5 line-clamp-2">{ch.excerpt}</p>
            </div>
            <span className="text-xs text-sand-400 dark:text-sand-600 shrink-0 mt-1">~{ch.readingTime} min</span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
