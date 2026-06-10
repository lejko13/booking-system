import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

export default function DemoNotice() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
   <div className="fixed inset-0 z-[99999] pointer-events-none">
  <div className="absolute bottom-6 left-6 w-[calc(100%-48px)] max-w-lg pointer-events-auto">
    <div className="flex items-start justify-between gap-4 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning)] px-5 py-4 text-white shadow-[var(--shadow-button)]">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
          <AlertTriangle size={22} />
        </div>

        <div>
          <p className="text-base font-semibold">
            Demo verzia aplikácie
          </p>

          <p className="mt-1 text-sm leading-relaxed text-white/90">
            Táto aplikácia slúži na ukážkové a prezentačné účely. Niektoré
            funkcie môžu byť obmedzené alebo nemusia
            fungovať presne podľa očakávania. 
          </p>

          <a
            href="https://www.leofudaly.com/"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center font-semibold underline underline-offset-4 hover:opacity-80"
          >
            Kontaktovať ma →
          </a>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="shrink-0 transition hover:opacity-70"
      >
        <X size={22} />
      </button>
    </div>
  </div>
</div>
  );
}