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

export async function registerUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase()
  if (password.length < 6) {
    throw new Error('Password must be at least 6 characters long.')
  }

  if (hasSupabase) {
    const data = await supabaseAuthRequest('signup', {
      email: cleanEmail,
      password,
    })
    if (!data.session && data.user) {
      return {
        user: null,
        requiresEmailConfirmation: true,
        message:
          'Account created! Please check your email to confirm your account before signing in.',
      }
    }
    const user = {
      id: data.user.id,
      email: data.user.email,
      accessToken: data.access_token,
    }
    saveSession(user)
    return { user, requiresEmailConfirmation: false }
  }

  const users = getStoredUsers()
  const alreadyExists =
    cleanEmail === DEMO_USER.email || users.some((u) => u.email === cleanEmail)
  if (alreadyExists) {
    throw new Error('An account with that email already exists. Please log in instead.')
  }

  const newUser = {
    id: crypto.randomUUID(),
    email: cleanEmail,
    password,
  }
  saveStoredUsers([...users, newUser])

  const sessionUser = { id: newUser.id, email: newUser.email }
  saveSession(sessionUser)
  return { user: sessionUser, requiresEmailConfirmation: false }
}

export async function signInUser({ email, password }) {
  const cleanEmail = email.trim().toLowerCase()

  if (hasSupabase) {
    const data = await supabaseAuthRequest('token?grant_type=password', {
      email: cleanEmail,
      password,
    })
    const user = {
      id: data.user.id,
      email: data.user.email,
      accessToken: data.access_token,
    }
    saveSession(user)
    return user
  }

  if (cleanEmail === DEMO_USER.email && password === DEMO_USER.password) {
    const sessionUser = { id: DEMO_USER.id, email: DEMO_USER.email }
    saveSession(sessionUser)
    return sessionUser
  }

  const users = getStoredUsers()
  const matched = users.find(
    (u) => u.email === cleanEmail && u.password === password
  )
  if (!matched) {
    throw new Error(
      'Invalid email or password. Check your details or register a new account.'
    )
  }

  const sessionUser = { id: matched.id, email: matched.email }
  saveSession(sessionUser)
  return sessionUser
}

export async function signOutUser(currentUser) {
  if (hasSupabase && currentUser?.accessToken) {
    try {
      await supabaseAuthRequest('logout', null, currentUser.accessToken)
    } catch {
      // Clear local session even if remote logout fails
    }
  }
  saveSession(null)
}