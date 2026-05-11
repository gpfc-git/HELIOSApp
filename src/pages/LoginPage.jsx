import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/dashboard", { replace: true });
    } catch {
      // error displayed via hook state
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center bg-bg px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="font-wordmark text-wordmark text-primary tracking-widest">
            HELIOS DECK
          </h1>
          <p className="mt-2 font-body-base text-body-base text-text-muted">
            Cosmic Observatory · Sign in to continue
          </p>
        </div>

        {/* Card */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="username"
                className="font-body-base text-body-base text-text-muted"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="emilys"
                className="bg-surface-2 border border-border rounded-lg px-3 py-2 font-body-base text-body-base text-on-surface placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="font-body-base text-body-base text-text-muted"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-surface-2 border border-border rounded-lg px-3 py-2 font-body-base text-body-base text-on-surface placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="font-telemetry text-telemetry text-danger"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-on-primary font-telemetry text-telemetry rounded-lg py-2 transition cursor-pointer"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <div className="mt-4 flex flex-col gap-1.5 border-t border-border pt-4">
            <p className="font-metadata text-metadata text-center text-text-muted mb-1">
              Demo credentials
            </p>
            <div className="flex items-center justify-between bg-surface-2 rounded-lg px-3 py-2">
              <div>
                <span className="font-mono text-xs text-on-surface">
                  emilys
                </span>
                <span className="text-text-muted mx-1 text-xs">/</span>
                <span className="font-mono text-xs text-on-surface">
                  emilyspass
                </span>
              </div>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full border font-mono"
                style={{
                  color: "#6366f1",
                  borderColor: "#6366f1",
                  background: "rgba(99,102,241,0.1)",
                }}
              >
                admin
              </span>
            </div>
            <div className="flex items-center justify-between bg-surface-2 rounded-lg px-3 py-2">
              <div>
                <span className="font-mono text-xs text-on-surface">
                  oliviaw
                </span>
                <span className="text-text-muted mx-1 text-xs">/</span>
                <span className="font-mono text-xs text-on-surface">
                  oliviawpass
                </span>
              </div>
              <span
                className="text-xs px-1.5 py-0.5 rounded-full border font-mono"
                style={{
                  color: "#7a7a9a",
                  borderColor: "#7a7a9a",
                  background: "rgba(122,122,154,0.1)",
                }}
              >
                moderator
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
