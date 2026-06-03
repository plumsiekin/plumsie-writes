export function AuthorByline({ size = "base" }: { size?: "sm" | "base" }) {
  return (
    <div className={`author-byline ${size === "sm" ? "text-xs" : "text-sm"}`}>
      <div className="author-avatar" aria-hidden="true">p</div>
      <div>
        <p className={`font-medium text-sand-900 dark:text-sand-100 ${size === "sm" ? "text-xs" : "text-sm"}`}>plumsiepie</p>
        <p className="text-xs text-sand-600 dark:text-sand-400">SimLit writer. Malmö, Sweden.</p>
      </div>
    </div>
  );
}
