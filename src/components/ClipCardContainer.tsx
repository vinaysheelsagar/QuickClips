import type { Clip } from "../types";
import ClipCard from "./ClipCard";

export default function ClipCardContainer({
  clips, onCopy, onDelete, onUpdate,
}: {
  clips: Clip[];
  onCopy: (text: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
}) {
  if (clips.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white p-6 text-center text-gray-600">
        No clips yet. Add your first one!
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {clips.map((c) => (
        <ClipCard
          key={c.id}
          clip={c}
          onCopy={() => onCopy(c.text)}
          onDelete={() => onDelete(c.id)}
          onUpdate={(txt) => onUpdate(c.id, txt)}
        />
      ))}
    </div>
  );
}
