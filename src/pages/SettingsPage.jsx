import { PageHeader } from "./AdminPage";
import { Trash2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import WarningModa2l from '../component/warring2'
import { useWorkingHours } from "../context/WorkingHoursProvider";

export default function SettingsPage() {
  const { setWarningModal, setPopup } = useWorkingHours();

  const resetSystem = () => {
    setWarningModal({
      isOpen: true,
      title: "Resetovať systém?",
      message:
        "Naozaj chceš vymazať všetky rezervácie a pracovné dni? Táto akcia sa nedá vrátiť späť.",

      onConfirm: async () => {
        const bookingsResult = await supabase
          .from("bookings")
          .delete()
          .neq("status", "___nothing___")
          .select();

        console.log("bookings delete:", bookingsResult);

        if (bookingsResult.error) {
          setPopup({
            isOpen: true,
            message: bookingsResult.error.message,
            type: "error",
          });

          return;
        }

        const workingHoursResult = await supabase
          .from("working_hours")
          .delete()
          .not("id", "is", null)
          .select();

        console.log("working_hours delete:", workingHoursResult);

        if (workingHoursResult.error) {
          setPopup({
            isOpen: true,
            message: workingHoursResult.error.message,
            type: "error",
          });

          return;
        }

        setPopup({
          isOpen: true,
          message: "Systém bol úspešne resetovaný",
          type: "success",
        });
      },
    });
  };

  return (
    <>

    <WarningModa2l></WarningModa2l>
      <PageHeader label="Dashboard" title="Nastavenia" />

      <div className="mt-8 grid gap-6">
        <div className="rounded-[var(--radius-lg)] border border-[var(--danger-border)] bg-[var(--danger-light)] p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
              <Trash2 size={22} />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-black text-[var(--danger-dark)]">
                Reset systému
              </h3>

              <p className="mt-1 text-sm text-[var(--danger-dark)]">
                Vymaže všetky rezervácie a všetky pracovné dni. Túto akciu nie
                je možné vrátiť späť.
              </p>

              <button
                type="button"
                onClick={resetSystem}
                className="mt-4 rounded-[var(--radius-full)] bg-red-600 px-6 py-3 font-bold text-white transition hover:bg-red-700"
              >
                Resetovať celý systém
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}