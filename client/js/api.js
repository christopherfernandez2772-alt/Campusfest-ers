const API_BASE_URL = '/api';
const ADMIN_KEY_STORAGE = 'cf_admin_key';

// Thin wrapper around fetch that normalizes CampusFest API responses/errors.
async function apiRequest(path, options = {}) {
  const adminKey = localStorage.getItem(ADMIN_KEY_STORAGE);

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(adminKey ? { 'x-admin-key': adminKey } : {}),
    },
    ...options,
  });

  let payload = null;
  try {
    payload = await response.json();
  } catch (parseError) {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.message || 'Ocurrió un error inesperado. Intenta nuevamente.';
    throw new Error(message);
  }

  return payload;
}

const api = {
  admin: {
    login: (password) => apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
    saveKey: (password) => localStorage.setItem(ADMIN_KEY_STORAGE, password),
    clearKey: () => localStorage.removeItem(ADMIN_KEY_STORAGE),
    isLoggedIn: () => Boolean(localStorage.getItem(ADMIN_KEY_STORAGE)),
  },
  activities: {
    list: (query = '') => apiRequest(`/actividades${query}`),
    get: (id) => apiRequest(`/actividades/${id}`),
    create: (data) => apiRequest('/actividades', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/actividades/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/actividades/${id}`, { method: 'DELETE' }),
  },
  participants: {
    list: () => apiRequest('/participantes'),
    create: (data) => apiRequest('/participantes', { method: 'POST', body: JSON.stringify(data) }),
  },
  registrations: {
    list: () => apiRequest('/inscripciones'),
    create: (data) => apiRequest('/inscripciones', { method: 'POST', body: JSON.stringify(data) }),
    waitlist: (data) => apiRequest('/inscripciones/lista-espera', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/inscripciones/${id}`, { method: 'DELETE' }),
  },

  stands: {
    list: (query = '') => apiRequest(`/stands${query}`),
    get: (id) => apiRequest(`/stands/${id}`),
    create: (data) => apiRequest('/stands', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => apiRequest(`/stands/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => apiRequest(`/stands/${id}`, { method: 'DELETE' }),
  },
};

window.CampusFestAPI = api;
