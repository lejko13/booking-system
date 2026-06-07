import { CheckCircle, Info, X, XCircle, AlertTriangle } from "lucide-react";
import { useEffect } from "react";
import { useWorkingHours } from "../context/WorkingHoursProvider";

export default function PopupMessage() {
  const { popup, setPopup } = useWorkingHours();

  useEffect(() => {
    if (!popup.isOpen) return;

    const timer = setTimeout(() => {
      setPopup((prev) => ({
        ...prev,
        isOpen: false,
      }));
    }, 3000);

    return () => clearTimeout(timer);
  }, [popup.isOpen, setPopup]);

  if (!popup.isOpen) return null;

  const styles = {
    success: {
      icon: CheckCircle,
      className: "bg-green-600",
    },
    error: {
      icon: XCircle,
      className: "bg-red-600",
    },
    warning: {
      icon: AlertTriangle,
      className: "bg-yellow-500",
    },
    info: {
      icon: Info,
      className: "bg-[var(--primary)]",
    },
  };

  const current = styles[popup.type] || styles.info;
  const Icon = current.icon;

return (
  <div className="fixed inset-0 z-[9999]  bg-black/40">
    <div className="absolute bottom-6 right-6 w-[calc(100%-48px)] max-w-md">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-4 rounded-[var(--radius-sm)] px-5 py-4 text-white shadow-[var(--shadow-button)] ${current.className}`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
            <Icon size={22} />
          </div>

          <p className="text-base font-semibold">
            {popup.message}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            setPopup((prev) => ({
              ...prev,
              isOpen: false,
            }))
          }
          className="shrink-0 transition hover:opacity-70"
        >
          <X size={24} />
        </button>
      </div>
    </div>
  </div>
);
}