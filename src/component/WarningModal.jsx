import { AlertTriangle, X } from "lucide-react";
import { useWorkingHours } from "../context/WorkingHoursProvider";

export default function WarningModal() {
  const { warningModal, setWarningModal } = useWorkingHours();

  if (!warningModal.isOpen) return null;

  const closeModal = () => {
    setWarningModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
     <div className="w-full max-w-md  bg-[var(--surface)] p-6 shadow-2xl border border-[var(--border)] rounded-[var(--radius-lg)]">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600">
              <AlertTriangle size={26} />
            </div>

            <div>
              <h3 className="text-xl font-black text-[var(--text)]">
                {warningModal.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-[var(--text-secondary)]">
                {warningModal.message}
              </p>
            </div>
          </div>

          <button
            onClick={closeModal}
            className="text-[var(--text-secondary)]"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={closeModal}
            className="rounded-[var(--radius-full)] border border-[var(--border)] px-5 py-3 font-bold text-[var(--text)]"
          >
            Zrušiť
          </button>

          <button
            onClick={() => {
              warningModal.onConfirm?.();
              closeModal();
            }}
            className="rounded-[var(--radius-full)] bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700"
          >
            Potvrdiť
          </button>
        </div>
      </div>
    </div>
  );
}