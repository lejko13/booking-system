import { AlertTriangle, X } from "lucide-react";
import { useWorkingHours } from "../context/WorkingHoursProvider";
import { useState } from "react";

export default function WarningModa2l() {
  const { warningModal, setWarningModal } = useWorkingHours();
  const [loading, setLoading] = useState(false);

  if (!warningModal.isOpen) return null;

  const closeModal = () => {
    if (loading) return;

    setWarningModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const forceCloseModal = () => {
    setWarningModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);

      await warningModal.onConfirm?.();

      forceCloseModal();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
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
            disabled={loading}
            onClick={closeModal}
            className="text-[var(--text-secondary)] disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex justify-end gap-3">
          <button
            disabled={loading}
            onClick={closeModal}
            className="rounded-[var(--radius-full)] border border-[var(--border)] px-5 py-3 font-bold text-[var(--text)] disabled:opacity-50"
          >
            Zrušiť
          </button>

          <button
            disabled={loading}
            onClick={handleConfirm}
            className="rounded-[var(--radius-full)] bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Spracovávam..." : "Potvrdiť"}
          </button>
        </div>
      </div>
    </div>
  );
}