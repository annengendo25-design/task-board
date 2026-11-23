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

