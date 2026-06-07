import { useEffect, useState } from "react";
import { PageHeaderBTN } from "./AdminPage";
import { supabase } from "../lib/supabase";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import {useWorkingHours} from '../context/WorkingHoursProvider'
import WarningModal from '../component/WarningModal'


export default function Workdays() {
  const [workdays, setWorkdays] = useState([]);
  const [loading, setLoading] = useState(true);

  const { warningModal, setWarningModal } = useWorkingHours();

  useEffect(() => {
    fetchWorkdays();
  }, []);

  async function fetchWorkdays() {
    setLoading(true);

    const { data, error } = await supabase
      .from("working_hours")
      .select("*")
      .eq("is_active", true)
      .order("work_date", { ascending: true });

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setWorkdays(data || []);
    setLoading(false);
  }


const deleteWorkday = (day) => {
  setWarningModal({
    isOpen: true,
    title: "Zmazať pracovný deň?",
    message: `Naozaj chceš zmazať deň ${new Date(day.work_date).toLocaleDateString("sk-SK")}?`,
    onConfirm: async () => {
      const { error } = await supabase
        .from("working_hours")
        .delete()
        .eq("id", day.id);

      if (error) {
        console.log(error);
        return;
      }

      await fetchWorkdays();
    },
  });
};
  return (
    <>
    <WarningModal></WarningModal>
      <PageHeaderBTN
        label="Pracovné dni"
        title="Výpis pracovných dní"
      />
<div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] flex flex-col gap-3 p-6 shadow-[var(--shadow-card)]">
      <div className=" grid gap-4">
        {loading && (
          <p className="font-bold text-[var(--text-secondary)]">
            Načítavam...
          </p>
        )}
 
        {!loading && workdays.length === 0 && (
          <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
            <p className="font-bold text-[var(--text-secondary)]">
              Zatiaľ nemáš nastavené žiadne pracovné dni.
            </p>
          </div>
        )}


  {!loading &&
  workdays.map((day) => (
    <div
      key={day.id}
      className="
        grid gap-4 rounded-[var(--radius-md)]
        bg-[var(--surface-secondary)]
        p-4
        md:grid-cols-[1.5fr_1fr_1fr_auto]

      "
    >
      <div>
        <p className="font-black capitalize">
          {new Date(day.work_date).toLocaleDateString("sk-SK", {
            weekday: "long",
          })}
        </p>

        <p className="text-sm text-[var(--text-secondary)]">
          {new Date(day.work_date).toLocaleDateString("sk-SK", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      <div>
        <p className="text-sm text-[var(--text-secondary)]">
          Začiatok
        </p>

        <p className="font-bold">
          {day.start_time?.slice(0, 5)}
        </p>
      </div>

      <div>
        <p className="text-sm text-[var(--text-secondary)]">
          Koniec
        </p>

        <p className="font-bold">
          {day.end_time?.slice(0, 5)}
        </p>
      </div>


       <button
  type="button"
onClick={() => deleteWorkday(day)}
  className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--danger-border)] bg-[var(--danger-light)] text-[var(--danger-dark)] transition hover:bg-[var(--surface)]"
>
  <Trash2 size={18} />
</button>


      {/* <div className="flex items-center md:justify-end">
        <span
          className={`
            rounded-full
            px-4 py-2 text-sm font-bold
            ${
              day.is_active
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }
          `}
        >
          {day.is_active ? "Aktívny" : "Neaktívny"}
        </span>
      </div> */}
    </div>
  ))}
 </div>
    
      </div>
    </>
  );
}
