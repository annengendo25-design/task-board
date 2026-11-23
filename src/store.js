import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice.js'
import tasksReducer, { setTasks } from './features/tasks/tasksSlice.js'
import { getSavedSession } from './services/authService.js'

const legacyStorageKey = 'release-board-tasks'

function getUserTasksKey(user) {
  if (!user) return null
  const userKey = user.id || user.email
  return userKey ? `release-board-tasks-${userKey}` : null
}

function loadTasksForUser(user) {
  const key = getUserTasksKey(user)
  if (!key) return []

  try {
    const savedTasks = JSON.parse(localStorage.getItem(key))
    if (Array.isArray(savedTasks)) return savedTasks

    if (user.email === 'demo@taskboard.com') {
      const legacyTasks = JSON.parse(localStorage.getItem(legacyStorageKey))
      if (Array.isArray(legacyTasks)) return legacyTasks
    }

    return []
  } catch {
    return []
  }
}

const initialUser = getSavedSession()
const initialTasks = loadTasksForUser(initialUser)

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    auth: authReducer,
  },
  preloadedState: {
    auth: { user: initialUser },
    tasks: initialTasks,
  },
})

let previousUser = store.getState().auth.user
let previousTasks = store.getState().tasks

store.subscribe(() => {
  const state = store.getState()
  const currentUser = state.auth.user
  const currentTasks = state.tasks

  if (currentUser !== previousUser) {
    previousUser = currentUser
    const nextTasks = loadTasksForUser(currentUser)
    previousTasks = nextTasks
    store.dispatch(setTasks(nextTasks))
    return
  }

  if (currentTasks !== previousTasks) {
    previousTasks = currentTasks
    const key = getUserTasksKey(currentUser)
    if (!key) return

    try {
      localStorage.setItem(key, JSON.stringify(currentTasks))
    } catch (error) {
      console.warn('Could not save Release Board tasks.', error)
    }
  }
})