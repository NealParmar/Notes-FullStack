import { useState } from 'react';
import { NoteForm } from './NoteForm.jsx';
import { NoteList } from './NoteList.jsx';

export function NotesDashboard({ notes, loading, currentUserId, onCreateNote, onUpdateNote, onDeleteNote, onReload }) {
  const [creating, setCreating] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">Your notes</h2>
          <p className="text-xs text-slate-400">
            Add, edit, and delete notes stored via your Supabase backend.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onReload}
            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="rounded-full bg-sky-500 px-4 py-1.5 text-xs font-semibold text-slate-950 shadow-sm shadow-sky-500/40 hover:bg-sky-400"
          >
            {creating ? 'Close' : 'New note'}
          </button>
        </div>
      </div>

      {creating && (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
          <NoteForm
            onSubmit={async (note) => {
              await onCreateNote(note);
              setCreating(false);
            }}
          />
        </div>
      )}

      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
        {loading ? (
          <p className="text-sm text-slate-400">Loading notes…</p>
        ) : notes.length === 0 ? (
          <p className="text-sm text-slate-400">No notes yet. Create your first one.</p>
        ) : (
          <NoteList notes={notes} currentUserId={currentUserId} onUpdateNote={onUpdateNote} onDeleteNote={onDeleteNote} />
        )}
      </div>
    </div>
  );
}

