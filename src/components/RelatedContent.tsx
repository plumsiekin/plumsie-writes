export interface RelatedItem {
  href: string;
  title: string;
  tag: string;
  excerpt: string;
  readingTime?: number;
}

export function RelatedContent({ items, heading = "More to read" }: { items: RelatedItem[]; heading?: string }) {
  if (!items || items.length === 0) return null;
  return (
    <aside className="mt-12 pt-10 border-t border-sand-200 dark:border-sand-800">
      <h2 className="font-cormorant font-semibold text-xl text-sand-900 dark:text-sand-50 mb-5">{heading}</h2>
      <div className={`grid gap-4 ${items.length >= 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 max-w-sm"}`}>
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="group block p-4 bg-sand-100 dark:bg-sand-900 border border-sand-200 dark:border-sand-800 rounded-lg hover:border-sand-300 dark:hover:border-sand-700 transition-colors"
          >
            <span className="text-xs text-sand-600 dark:text-sand-400 border border-sand-200 dark:border-sand-700 px-2 py-0.5 rounded-full">{item.tag}</span>
            <p className="font-cormorant font-semibold text-lg text-sand-900 dark:text-sand-100 mt-2 mb-1 leading-snug group-hover:text-sand-700 dark:group-hover:text-sand-200 transition-colors">
              {item.title}
            </p>
            <p className="text-sm text-sand-600 dark:text-sand-400 line-clamp-2 leading-relaxed">{item.excerpt}</p>
            {item.readingTime && <p className="text-xs text-sand-400 dark:text-sand-600 mt-2">~{item.readingTime} min read</p>}
          </a>
        ))}
      </div>
    </aside>
  );
}
