import { useState, useRef, useEffect } from "react";

export default function PricePicker({
  value,
  onChange,
  znak,
  options = [5, 10, 15, 20, 25, 30, 35],
  placeholder = "Cena €",
}) {
  const [open, setOpen] = useState(false);
  

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 font-bold  outline-none transition focus:border-[var(--primary)] text-start placeholder:text-[var(--text)]  text-[var(--text)]";

  return (
    <div className="relative w-full">
      <button
        type="button"
        onClick={() => {setOpen(true)}}
        className={inputClass}
      >
        <span
          className={
            value
              ? "text-[var(--text)]"
              : "text-[var(--text-secondary)]"
          }
        >
          {value ? `${value} ${znak}` : placeholder}
        </span>
      </button>

      {open && (
        <div 
         onClick={() => setOpen(false)}
        className="fixed
        inset-0
        top-0
        z-50
        bg-black/50
        backdrop-blur-sm flex items-center justify-center">
          <div className="w-[90%] max-w-sm rounded-2xl bg-white p-5 shadow-xl">
            <h2 className="mb-4 text-lg font-semibold">
              Vyber cenu
            </h2>

            <div className="grid grid-cols-3 gap-3">
              {options.map((price) => (
                <button
                  key={price}
                  type="button"
                  onClick={() => {
                    onChange(price);
                    setOpen(false);
                  }}
                  className={`rounded-xl border py-3 font-medium transition
                    ${
                      value === price
                        ? "border-[var(  --primary)] bg-[var(--primary)] text-white"
                        : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                    }`}
                >
                  {price} {znak}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full rounded-xl bg-gray-100 py-3 font-medium hover:bg-gray-200"
            >
              Zavrieť
            </button>
          </div>
        </div>
      )}
    </div>
  );
}