export function BoardSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 280"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M40 4c8 18 16 48 16 92 0 54-4 92-8 124-2 18-4 36-8 52-4-16-6-34-8-52-4-32-8-70-8-124C24 52 32 22 40 4Z" />
    </svg>
  );
}
