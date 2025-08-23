import { useState } from "react";

export default function AddClipForm({
  onSubmit, autoFocus, initialText = "", submitLabel = "Add",
}: {
  onSubmit: (text: string) => void;
  autoFocus?: boolean;
  initialText?: string;
  submitLabel?: string;
}) {
  const [value, setValue] = useState(initialText);
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); const v = value.trim(); if (!v) return; onSubmit(v); setValue(""); }}
      className="mx-auto flex w-full max-w-3xl flex-col gap-3 rounded-2xl border bg-white p-4 shadow-sm  md:items-center"
      aria-label="Add or edit clip form"
    >
      <textarea
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add a clip… (email, ID, command)"
        className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-600"
      >
      </textarea>
      <div className="flex justify-end gap-2 w-full">
        <button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          {submitLabel}
        </button>
        <button type="reset" onClick={() => setValue("")} className="rounded-lg border px-4 py-2 hover:bg-gray-50">
          Clear
        </button>
      </div>
    </form>
  );
}
