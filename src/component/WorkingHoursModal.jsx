import { X } from "lucide-react";

export default function WorkingHoursModal({
  isOpen,
  day,
  startTime,
  endTime,
  isActive,
  setStartTime,
  setEndTime,
  setIsActive,
  onClose,
  onSave,
}) {
  if (!isOpen || !day) return null;

  return (
    <div className=" fixed
        inset-0
        top-0
        z-50
        bg-black/50
        backdrop-blur-sm 
        flex
        justify-center
        items-center
        ">

       {/* <div className="w-full max-w-[460px] rounded-[var(--radius-xl)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-extrabold text-[var(--primary)]">
              Nastavenie dňa
            </p>

            <h2 className="text-3xl font-black text-[var(--text)]">
              {day.name}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-secondary)] text-[var(--text)]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[var(--text-secondary)]">
              Začiatok pracovnej doby
            </span>

            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              disabled={!isActive}
              className="h-[54px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 font-bold outline-none focus:border-[var(--primary)] disabled:opacity-50"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-bold text-[var(--text-secondary)]">
              Koniec pracovnej doby
            </span>

            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              disabled={!isActive}
              className="h-[54px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 font-bold outline-none focus:border-[var(--primary)] disabled:opacity-50"
            />
          </label>

          <label className="flex items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4">
            <div>
              <p className="font-black text-[var(--text)]">Aktívny deň</p>
              <p className="text-sm font-semibold text-[var(--text-secondary)]">
                Ak je vypnutý, zákazník si tento deň nevie rezervovať.
              </p>
            </div>

            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="h-5 w-5"
            />
          </label>

          <button
            type="button"
            onClick={onSave}
            className="h-[56px] w-full rounded-[var(--radius-md)] bg-[var(--primary)] font-extrabold text-white hover:bg-[var(--primary-hover)]"
          >
            Uložiť pracovnú dobu
          </button>
        </div>
      </div>  */}


    </div>
  );
}