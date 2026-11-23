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