import { useState } from "react";
import { CalendarDays, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed left-0 top-0 z-20 w-full border-b border-[var(--border)] bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[var(--container)] items-center justify-between px-[var(--section-x)] py-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[var(--primary)] text-white">
            <CalendarDays size={22} />
          </div>

          <span className="text-xl font-bold text-[var(--text)]">
            Rezervo
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/">Systém</NavLink>
          <NavLink to="/cennik">Cenník</NavLink>
          <NavLink to="/kontakt">Kontakt</NavLink>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            Prihlásenie
          </Link>

          <Link
            to="/dashboard"
            className="rounded-full bg-[var(--secondary)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--primary)]"
          >
            Dashboard
          </Link>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] text-[var(--text)] md:hidden"
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[var(--border)] bg-white px-[var(--section-x)] py-5 md:hidden">
          <div className="flex flex-col gap-3">
            <MobileLink to="/" onClick={() => setIsOpen(false)}>
              Systém
            </MobileLink>

            <MobileLink to="/cennik" onClick={() => setIsOpen(false)}>
              Cenník
            </MobileLink>

            <MobileLink to="/kontakt" onClick={() => setIsOpen(false)}>
              Kontakt
            </MobileLink>

            <div className="mt-3 grid gap-3">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="flex h-12 items-center justify-center rounded-full border border-[var(--border)] text-sm font-bold text-[var(--text)]"
              >
                Prihlásenie
              </Link>

              <Link
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="flex h-12 items-center justify-center rounded-full bg-[var(--secondary)] text-sm font-bold text-white"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--primary)]"
    >
      {children}
    </Link>
  );
}

function MobileLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-2xl px-4 py-3 text-base font-bold text-[var(--text)] transition hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
    >
      {children}
    </Link>
  );
}