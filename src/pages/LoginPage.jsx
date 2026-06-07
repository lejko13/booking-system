import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, CalendarDays } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMessage("Nesprávny email alebo heslo.");
      return;
    }

    navigate("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-[var(--section-x)]">
      <div className="w-full max-w-[480px]">
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-[var(--radius-lg)] bg-[var(--primary)] text-white">
            <CalendarDays size={30} />
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-[var(--radius-xl)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]"
        >
          <p className="text-center text-[var(--body-size)] font-extrabold text-[var(--primary)]">
            Rezervo Admin
          </p>

          <h1
            className="mt-2 text-center font-black text-[var(--text)]"
            style={{ fontSize: "var(--heading-size)" }}
          >
            Prihlásenie
          </h1>

          <p className="mt-3 text-center text-[var(--body-size)] text-[var(--text-secondary)]">
            Prihlás sa do administračného panelu.
          </p>

          <div className="mt-8 space-y-4">
            <div className="relative">
              <Mail
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                size={20}
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
                  h-[58px]
                  w-full
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  px-14
                  text-[var(--body-size)]
                  font-semibold
                  text-[var(--text)]
                  outline-none
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--primary)]
                "
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]"
                size={20}
              />

              <input
                type="password"
                placeholder="Heslo"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="
                  h-[58px]
                  w-full
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--border)]
                  bg-[var(--surface-secondary)]
                  px-14
                  text-[var(--body-size)]
                  font-semibold
                  text-[var(--text)]
                  outline-none
                  placeholder:text-[var(--text-muted)]
                  focus:border-[var(--primary)]
                "
              />
            </div>

            {errorMessage && (
              <div
                className="
                  rounded-[var(--radius-md)]
                  border
                  border-[var(--danger-border)]
                  bg-[var(--danger-light)]
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-[var(--danger-dark)]
                "
              >
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                h-[58px]
                w-full
                rounded-[var(--radius-md)]
                bg-[var(--primary)]
                text-[var(--body-size)]
                font-extrabold
                text-white
                shadow-[var(--shadow-button)]
                transition
                hover:bg-[var(--primary-hover)]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Prihlasujem..." : "Prihlásiť sa"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}