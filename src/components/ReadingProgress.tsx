export function ReadingProgress({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="flex items-center gap-3 text-sm text-sand-600 dark:text-sand-400">
      <div className="flex-1 h-0.5 bg-sand-200 dark:bg-sand-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-sand-500 dark:bg-sand-400 rounded-full transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={current}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Chapter ${current} of ${total}`}
        />
      </div>
      <span className="shrink-0">Chapter {current} of {total}</span>
    </div>
  );
}
