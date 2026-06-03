export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament my-12 ${className}`}>
      <div className="line" />
      <span aria-hidden="true">✦</span>
      <div className="line" />
    </div>
  );
}
