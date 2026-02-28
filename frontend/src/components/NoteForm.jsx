import { useState } from 'react';

export function NoteForm({ initialNote, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [description, setDescription] = useState(initialNote?.description || '');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await onSubmit({ title, description });
      if (!initialNote) {
        setTitle('');
        setDescription('');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 text-sm">
      <div className="space-y-1">
        <label className="block text-slate-300" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          required
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none ring-slate-500 focus:ring-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-1">
        <label className="block text-slate-300" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 outline-none ring-slate-500 focus:ring-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded-full bg-emerald-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-emerald-500/40 hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? 'Saving…' : 'Save'}
        </button>
      </div>
    </form>
  );
}

