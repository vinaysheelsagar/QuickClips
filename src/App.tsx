import { useEffect, useState } from "react";
import { STORAGE_KEY, newId } from "./types";
import type { Clip } from "./types";
import TopBar from "./components/TopBar";
import AddClipForm from "./components/AddClipForm";
import AddClipOverlay from "./components/AddClipOverlay";
import ClipCardContainer from "./components/ClipCardContainer";

export default function App() {
  const [clips, setClips] = useState<Clip[]>(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); } catch { return []; }
  });
  const [overlayOpen, setOverlayOpen] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(clips)); }, [clips]);

  const addClip = (text: string) =>
    setClips((prev) => [...prev, { id: newId(), text: text.trim(), createdAt: Date.now() }]);

  const updateClip = (id: string, text: string) =>
    setClips((prev) => prev.map(c => c.id === id ? { ...c, text: text.trim(), updatedAt: Date.now() } : c));

  const deleteClip = (id: string) =>
    setClips((prev) => prev.filter(c => c.id !== id));

  const copyClip = (text: string) => navigator.clipboard.writeText(text);

  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900">
      <TopBar onOpenOverlay={() => setOverlayOpen(true)} />

      {/* Overlay used on all breakpoints */}
      <AddClipOverlay open={overlayOpen} onClose={() => setOverlayOpen(false)}>
        <AddClipForm onSubmit={(t) => { addClip(t); setOverlayOpen(false); }} autoFocus />
      </AddClipOverlay>

      <main className="container mx-auto px-4 py-6">
        <ClipCardContainer
          clips={clips}
          onCopy={copyClip}
          onDelete={deleteClip}
          onUpdate={updateClip}
        />
      </main>
    </div>
  );
}