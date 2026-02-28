const API_BASE_URL = 'http://localhost:3000';

async function request(path, { method = 'GET', body, token } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const isJson = res.headers.get('content-type')?.includes('application/json');
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const message = data?.error || data?.message || `Request failed with ${res.status}`;
    throw new Error(message);
  }

  return data;
}

export const api = {
  signup(email, password) {
    return request('/auth/signup', {
      method: 'POST',
      body: { email, password },
    });
  },
  login(email, password) {
    return request('/auth/login', {
      method: 'POST',
      body: { email, password },
    });
  },
  getNotes(token) {
    return request('/notes', { token });
  },
  createNote(token, { title, description }) {
    return request('/notes', {
      method: 'POST',
      body: { title, description },
      token,
    });
  },
  updateNote(token, id, { title, description }) {
    return request(`/notes/${id}`, {
      method: 'PUT',
      body: { title, description },
      token,
    });
  },
  deleteNote(token, id) {
    return request(`/notes/${id}`, {
      method: 'DELETE',
      token,
    });
  },
};

