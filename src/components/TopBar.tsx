export default function TopBar({ onOpenOverlay }: { onOpenOverlay: () => void }) {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="/" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">Q</span>
          <span className="font-semibold tracking-tight">QuickClips</span>
        </a>
        {/* always visible now */}
        <button
          type="button"
          onClick={onOpenOverlay}
          className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          aria-label="Open add clip form"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <span>Add</span>
        </button>
      </div>
    </header>
  );
}
