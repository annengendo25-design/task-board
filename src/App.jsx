import { useSelector } from 'react-redux'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthForm from './components/AuthForm.jsx'
import Dashboard from './pages/Dashboard.jsx'
import './App.css'

export default function App() {
  const user = useSelector((state) => state.auth.user)

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/dashboard" replace /> : (
            <main>
              <h1>Log in to Release Board</h1>
              <AuthForm />
            </main>
          )}
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to={user ? "/dashboard":'/login'} replace />} />
      </Routes>
    </HashRouter>
  )
}