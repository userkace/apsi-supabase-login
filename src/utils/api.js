import { config } from '../config'

// Centralized fetch wrapper (handles auth, errors)
export async function api(path, { method = 'GET', body, token } = {}) {
  const res = await fetch(`${config.API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `Request failed: ${res.status}`)
  }
  const ct = res.headers.get('content-type') || ''
  return ct.includes('application/json') ? res.json() : res.text()
}

// ---- Backend seams (replace with real endpoints) ----
export async function fetchUserProfile(token) {
  // TODO: GET /me from EC2-backed API (or Supabase RPC)
  return { name: 'Demo User', plan: 'free' }
}

export async function loginWithSupabase(email, password) {
  // TODO: Implement via supabase.auth.signInWithPassword
  // This file remains for non-auth API calls even when Supabase is used for auth
  return { ok: true }
}