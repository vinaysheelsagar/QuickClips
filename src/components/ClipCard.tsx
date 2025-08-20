import { useState } from "react";
import type { Clip } from "../types";
import { Copy, Pencil, Trash2 } from "lucide-react";
import IconButton from "./IconButton";


type Props = {
  clip: Clip;
  onCopy?: () => void;         // optional
  onDelete: () => void;
  onUpdate: (text: string) => void;
};

export default function ClipCard({ clip, onCopy, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(clip.text);

  const save = () => {
    const v = value.trim();
    if (!v) return setEditing(false);
    if (v !== clip.text) onUpdate(v);
    setEditing(false);
  };

  return (
    <article className="rounded-xl border bg-white p-3 shadow-sm">
      {editing ? (
        <EditMode
          value={value}
          onChange={setValue}
          onSave={save}
          onCancel={() => { setEditing(false); setValue(clip.text); }}
        />
      ) : (
        <ViewMode
          text={clip.text}
          onCopy={onCopy}
          onEdit={() => setEditing(true)}
          onDelete={onDelete}
        />
      )}
    </article>
  );
}

/* ---------------------- View (inline row) ---------------------- */
function ViewMode({
  text,
  onCopy,
  onEdit,
  onDelete,
}: {
  text: string;
  onCopy?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="flex items-center gap-2">
      {/* Truncated text */}
      <p
        className="flex-1 truncate text-sm text-gray-800"
        title={text}
      >
        {text}
      </p>

      {/* Action buttons */}
      <div className="flex shrink-0 items-center gap-1">
        {onCopy && (
          <IconButton onClick={onCopy} ariaLabel="Copy">
            <Copy className="h-4 w-4" />
          </IconButton>
        )}
        <IconButton onClick={onEdit} ariaLabel="Edit">
          <Pencil className="h-4 w-4" />
        </IconButton>
        <IconButton onClick={onDelete} ariaLabel="Delete" variant="danger">
          <Trash2 className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}

/* ---------------------- Edit (flex column) ---------------------- */
function EditMode({
  value,
  onChange,
  onSave,
  onCancel,
}: {
  value: string;
  onChange: (v: string) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[96px] w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-600"
        placeholder="Edit clip…"
      />
      <div className="ml-auto flex items-center gap-2">
        <Button onClick={onSave} variant="primary">Save</Button>
        <Button onClick={onCancel} variant="ghost">Cancel</Button>
      </div>
    </div>
  );
}

/* ---------------------- Tiny Button ---------------------- */
function Button({
  children,
  onClick,
  variant = "ghost",
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "ghost" | "danger";
  ariaLabel?: string;
}) {
  const base = "rounded-lg px-3 py-2 text-sm transition";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : variant === "danger"
      ? "border text-red-600 hover:bg-red-50"
      : "border hover:bg-gray-50";
  return (
    <button onClick={onClick} className={`${base} ${styles}`} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
