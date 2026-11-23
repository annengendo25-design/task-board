import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logIn } from "../features/auth/authSlice";
import { registerUser, signInUser } from "../services/authService";

export default function AuthForm({ mode = "login" }) {
  const isRegister = mode === "register";
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setNotice("");

    const form = new FormData(event.currentTarget);
    const email = form.get("email").trim().toLowerCase();
    const password = form.get("password");

    if (isRegister) {
      const confirmPassword = form.get("confirmPassword");
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setSubmitting(true);
    try {
      if (isRegister) {
        const result = await registerUser({ email, password });
        if (result.requiresEmailConfirmation) {
          setNotice(result.message);
          event.currentTarget.reset();
        } else if (result.user) {
          dispatch(logIn(result.user));
        }
      } else {
        const user = await signInUser({ email, password });
        dispatch(logIn(user));
      }
    } catch (err) {
      setError(err.message || "Authentication failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          name="email"
          autoComplete="username"
          required
        />
      </label>

      <label>
        Password
        <input
          type="password"
          name="password"
          autoComplete={isRegister ? "new-password" : "current-password"}
          minLength={6}
          required
        />
      </label>

      {isRegister && (
        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            autoComplete="new-password"
            minLength={6}
            required
          />
        </label>
      )}

      {error && <p role="alert">{error}</p>}
      {notice && <p role="status">{notice}</p>}

      <button type="submit" disabled={submitting}>
        {submitting
          ? isRegister
            ? "Creating account..."
            : "Logging in..."
          : isRegister
            ? "Create Account"
            : "Log In"}
      </button>

      {isRegister ? (
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      ) : (
        <>
          <p>
            Need an account? <Link to="/register">Register</Link>
          </p>
          <p>Demo email: demo@taskboard.com</p>
          <p>Demo password: task123</p>
        </>
      )}
    </form>
  );
}