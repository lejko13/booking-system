import { useEffect, useState } from "react";
import { PageHeader } from "./AdminPage";
import { CheckCircle2 } from "lucide-react";
import { supabase } from "../lib/supabase";
import DayBookingsModal from '../component/DayBookingsModal'
export default function BookingsPage() {
  const [workdays, setWorkdays] = useState([]);
  const [loading, setLoading] = useState(true);


  const [selectedDay, setSelectedDay] = useState(null);
const [openModal, setOpenModal] = useState(false);

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


 
  return (
    <>

    <DayBookingsModal
  isOpen={openModal}
  day={selectedDay}
  onClose={() => {
    setOpenModal(false);
    setSelectedDay(null);
  }}
/>

      <PageHeader
        label="Dashboard"
        title="Rezervácie"
        // button="+ Nová rezervácia"
      />

      <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black">Pracovné dni</h2>
        </div>

        {loading && (
          <p className="font-bold text-[var(--text-secondary)]">
            Načítavam dni...
          </p>
        )}

        {!loading && workdays.length === 0 && (
          <p className="font-bold text-[var(--text-secondary)]">
            Zatiaľ nemáš nastavené žiadne pracovné dni.
          </p>
        )}

        {!loading && workdays.length > 0 && (
        <WorkdayList
  workdays={workdays}
  onOpen={(day) => {
    setSelectedDay(day);
    setOpenModal(true);
  }}
/>
        )}
      </div>
    </>
  );
}

function WorkdayList({ workdays, onOpen })  {
  return (
    <div className="space-y-3">
      {workdays.map((day) => (
        <div
          key={day.id}
          className="grid gap-3 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4 md:grid-cols-[1.2fr_1fr_0.7fr_0.8fr]"
        >
          <div>
            <p className="font-black capitalize">
              {new Date(day.work_date).toLocaleDateString("sk-SK", {
                weekday: "long",
              })}
            </p>

            <p className="text-sm text-[var(--text-secondary)]">
              Pracovný deň
            </p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-secondary)]">
              Dátum
            </p>

            <p className="font-bold">
              {new Date(day.work_date).toLocaleDateString("sk-SK", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-secondary)]">
              Čas
            </p>

            <p className="font-bold">
              {day.start_time?.slice(0, 5)} - {day.end_time?.slice(0, 5)}
            </p>
          </div>

          <StatusBadge
  onClick={() => onOpen(day)}
/>
        </div>
      ))}
    </div>
  );
}
function StatusBadge({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        rounded-[var(--radius-full)]
        bg-[var(--primary)]
        px-4 py-2
        text-sm font-bold
        text-white
        transition
        hover:bg-[var(--primary-hover)]
      "
    >
      Prezrieť rezervácie
    </button>
  );
}