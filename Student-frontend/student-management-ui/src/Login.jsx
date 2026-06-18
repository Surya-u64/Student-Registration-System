// ===============================
// Login.jsx — Premium split-screen glassmorphism login
// Drop-in for the existing Student Management System.
// Props: onLogin() called on successful credentials.
// ===============================
import { useState } from "react";
import "./App.css";

const ICON = {
  mail: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  ),
  lock: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  eye: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  eyeOff: (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a19.77 19.77 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a19.77 19.77 0 0 1-3.17 4.19" />
      <path d="M1 1l22 22" />
    </svg>
  ),
  spark: (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15 9 22 12 15 15 12 22 9 15 2 12 9 9 12 2" />
    </svg>
  ),
  check: (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
};

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "admin@gmail.com" && password === "admin123") {
      localStorage.setItem("token", "demo-token");
      onLogin && onLogin();
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="login-shell">
      {/* LEFT — brand panel */}
      <aside className="login-brand-panel">
        <div className="login-logo">
          <div className="login-logo-mark">{ICON.spark}</div>
          <span>EduManage</span>
        </div>

        <div className="login-hero">
          <h2>
            Run your campus
            <br />
            with <em>clarity & ease.</em>
          </h2>
          <p>
            A modern student management platform — track students, courses, and
            departments from one premium dashboard built for educators.
          </p>

          <div className="login-features">
            <div className="login-feature">
              <span className="login-feature-dot">{ICON.check}</span>
              Real-time student insights & analytics
            </div>
            <div className="login-feature">
              <span className="login-feature-dot">{ICON.check}</span>
              Beautiful, intuitive course management
            </div>
            <div className="login-feature">
              <span className="login-feature-dot">{ICON.check}</span>
              Secure cloud-backed records
            </div>
          </div>
        </div>

        <p className="login-footnote">
          © {new Date().getFullYear()} EduManage · Crafted for modern
          institutions.
        </p>
      </aside>

      {/* RIGHT — glass login card */}
      <section className="login-form-panel">
        <form className="login-card" onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <p className="login-sub">Sign in to continue to your dashboard</p>

          <div className="login-field">
            <label className="login-label" htmlFor="login-email">
              Email
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">{ICON.mail}</span>
              <input
                id="login-email"
                type="email"
                placeholder="admin@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />
            </div>
          </div>

          <div className="login-field">
            <label className="login-label" htmlFor="login-pw">
              Password
            </label>
            <div className="login-input-wrap">
              <span className="login-input-icon">{ICON.lock}</span>
              <input
                id="login-pw"
                type={showPw ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="login-pw-toggle"
                onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? ICON.eyeOff : ICON.eye}
              </button>
            </div>
          </div>

          <div className="login-row">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <a href="#forgot">Forgot password?</a>
          </div>

          <button type="submit" className="sms-btn-primary">
            Sign in to dashboard
          </button>

          <div className="login-hint">Demo · admin@gmail.com / admin123</div>
        </form>
      </section>
    </div>
  );
}

export default Login;
