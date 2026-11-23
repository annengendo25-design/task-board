const USERS_KEY = 'release-board-users'
const SESSION_KEY = 'release-board-session'
const DEMO_USER = {
  id: 'demo-user-1',
  email: 'demo@taskboard.com',
  password: 'task123',
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey)

function getStoredUsers() {
  try {
    const raw = JSON.parse(localStorage.getItem(USERS_KEY))
    return Array.isArray(raw) ? raw : []
  } catch {
    return []
  }
}

function saveStoredUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function saveSession(user) {
  if (user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  } else {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function getSavedSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null
  } catch {
    return null
  }
}

async function supabaseAuthRequest(endpoint, body, accessToken) {
  const response = await fetch(`${supabaseUrl}/auth/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseAnonKey,
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const data = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(
      data.error_description || data.msg || data.message || 'Authentication failed.'
    )
  }
  return data
}