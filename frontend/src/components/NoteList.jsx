import { useState } from 'react';
import { NoteForm } from './NoteForm.jsx';

export function NoteList({ notes, onUpdateNote, onDeleteNote }) {
  const [editingId, setEditingId] = useState(null);

  return (
    <ul className="divide-y divide-slate-800">
      {notes.map((note) => (
        <li key={note.id} className="py-3 first:pt-0 last:pb-0">
          {editingId === note.id ? (
            <NoteForm
              initialNote={note}
              onSubmit={async (values) => {
                await onUpdateNote(note.id, values);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-100">{note.title}</h3>
                {note.description && (
                  <p className="text-xs leading-relaxed text-slate-300 whitespace-pre-wrap">
                    {note.description}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setEditingId(note.id)}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-200 hover:bg-slate-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteNote(note.id)}
                  className="rounded-full border border-red-500/60 px-3 py-1 text-xs text-red-300 hover:bg-red-500/10"
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}

