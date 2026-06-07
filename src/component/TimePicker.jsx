import { useState, useRef, useEffect } from "react";

export function TimePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const pickerRef = useRef(null);

  const hours = Array.from({ length: 13 }, (_, i) =>
    String(i + 8).padStart(2, "0")
  );

  const minutes = ["00", "15", "30", "45"];

  const [hour, minute] = value ? value.split(":") : ["08", "00"];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const selectHour = (h) => {
    onChange(`${h}:${minute}`);
  };

  const selectMinute = (m) => {
    onChange(`${hour}:${m}`);
    setOpen(false);
  };

  return (
    <div ref={pickerRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="w-full rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-left font-semibold text-[var(--text)]"
      >
        {value || "Vyber čas"}
      </button>

      {open && (
        <div className="absolute right-0 bottom-full mb-2 z-50 grid w-[200px] grid-cols-2 gap-2 rounded-2xl border border-[var(--border)] bg-white p-2 shadow-xl">
          <div className="max-h-[260px] overflow-y-auto scrollbar-hide">
            {hours.map((h) => (
              <button
                key={h}
                type="button"
                onClick={() => selectHour(h)}
                className={`mb-1 w-full rounded-xl py-3 text-sm font-semibold transition ${
                  h === hour
                    ? "bg-blue-500 text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {h}
              </button>
            ))}
          </div>

          <div className="max-h-[260px] overflow-y-auto scrollbar-hide">
            {minutes.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => selectMinute(m)}
                className={`mb-1 w-full rounded-xl py-3 text-sm font-semibold transition ${
                  m === minute
                    ? "bg-blue-500 text-white"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}