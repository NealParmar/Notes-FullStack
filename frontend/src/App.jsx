import { useEffect, useState } from 'react';
import { api } from './api.js';
import { AuthPanel } from './components/AuthPanel.jsx';
import { NotesDashboard } from './components/NotesDashboard.jsx';

const TOKEN_KEY = 'notes_app_token';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '');
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    setLoading(true);
    setError('');
    api
      .getNotes(token)
      .then(setNotes)
      .catch((err) => {
        setError(err.message);
        setToken('');
        localStorage.removeItem(TOKEN_KEY);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const handleLoginSuccess = async (email, password) => {
    setError('');
    try {
      const { token: newToken } = await api.login(email, password);
      setToken(newToken);
      localStorage.setItem(TOKEN_KEY, newToken);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const handleSignup = async (email, password) => {
    setError('');
    await api.signup(email, password);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem(TOKEN_KEY);
    setNotes([]);
  };

  const refreshNotes = async () => {
    if (!token) return;
    const data = await api.getNotes(token);
    setNotes(data);
  };

  const handleCreateNote = async (note) => {
    setError('');
    try {
      await api.createNote(token, note);
      await refreshNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateNote = async (id, note) => {
    setError('');
    try {
      await api.updateNote(token, id, note);
      await refreshNotes();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeleteNote = async (id) => {
    setError('');
    try {
      await api.deleteNote(token, id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold tracking-tight">Notes</h1>
            <p className="text-xs text-slate-400">Supabase + Express demo</p>
          </div>
          {token && (
            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1 rounded-full border border-slate-700 hover:bg-slate-800 transition"
            >
              Log out
            </button>
          )}
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 py-8">
          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-2 text-sm text-red-200">
              {error}
            </div>
          )}

          {!token ? (
            <AuthPanel onLogin={handleLoginSuccess} onSignup={handleSignup} />
          ) : (
            <NotesDashboard
              notes={notes}
              loading={loading}
              onCreateNote={handleCreateNote}
              onUpdateNote={handleUpdateNote}
              onDeleteNote={handleDeleteNote}
              onReload={refreshNotes}
            />
          )}
        </div>
      </main>
    </div>
  );
}

