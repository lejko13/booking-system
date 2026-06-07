import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, XCircle } from "lucide-react";
import { supabase } from "../lib/supabase";
import { TimePicker } from "../component/TimePicker";

import {useWorkingHours} from '../context/WorkingHoursProvider'

const months = [
  "Január", "Február", "Marec", "Apríl", "Máj", "Jún",
  "Júl", "August", "September", "Október", "November", "December"
];

const days = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

function formatDate(date) {
  return date.toLocaleDateString("en-CA");
}

export default function CustomCalendar() {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );


  const { open, setOpen, popup, setPopup } = useWorkingHours();


  const [selectedDate, setSelectedDate] = useState(today);
  const [workTimes, setWorkTimes] = useState({});
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    const { data, error } = await supabase
      .from("working_hours")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const mapped = {};

    data.forEach((item) => {
      mapped[item.work_date] = {
        id: item.id,
        startTime: item.start_time?.slice(0, 5),
        endTime: item.end_time?.slice(0, 5),
        isActive: item.is_active,
      };
    });

    setWorkTimes(mapped);
  };

  const calendarDays = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7;
    const totalDays = lastDay.getDate();

    const daysArray = [];

    for (let i = 0; i < startDay; i++) daysArray.push(null);

    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }, [currentDate]);

  const changeMonth = (direction) => {
    setCurrentDate((prev) => {
      return new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
    });
  };

  const isSameDay = (a, b) => {
    if (!a || !b) return false;

    return formatDate(a) === formatDate(b);
  };

  const isSunday = (date) => date?.getDay() === 0;

  const isPastDate = (date) => {
    if (!date) return false;

    const cleanToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return date < cleanToday;
  };

  const handleSelectDate = (date) => {
    if (!date || isPastDate(date)) return;

    setSelectedDate(date);

    const dateKey = formatDate(date);
    const savedTime = workTimes[dateKey];

    if (isSunday(date)) {
      setStartTime("");
      setEndTime("");
      return;
    }

    if (savedTime) {
      setStartTime(savedTime.startTime);
      setEndTime(savedTime.endTime);
    } else {
      setStartTime("08:00");
      setEndTime("16:00");
    }
  };

 const saveWorkTime = async () => {
  if (!selectedDate || isSunday(selectedDate)) return;

  const workDate = formatDate(selectedDate);
  const existing = workTimes[workDate];

  if (existing?.id) {
    setPopup({
      isOpen: true,
      message: "Tento deň už je zabraný",
      type: "warning",
    });

    return;
  }

  setLoading(true);

  const payload = {
    work_date: workDate,
    start_time: startTime,
    end_time: endTime,
    is_active: true,
    updated_at: new Date().toISOString(),
  };

  const response = await supabase
    .from("working_hours")
    .insert(payload);

  setLoading(false);

  if (response.error) {
    console.log(response.error);

    setPopup({
      isOpen: true,
      message: "Chyba pri ukladaní",
      type: "error",
    });

    return;
  }

  await fetchWorkingHours();

  setPopup({
    isOpen: true,
    message: "Pracovný čas bol uložený",
    type: "success",
  });
};

  return (
    <div className="border border-[var(--border)] rounded-[var(--radius-lg)] bg-[var(--surface)] p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">
            Vyberte deň
          </p>

          <h3 className="text-2xl font-extrabold text-[var(--text)]">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => changeMonth(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={() => changeMonth(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((day) => (
          <div
            key={day}
            className="text-sm font-bold text-[var(--text-secondary)]"
          >
            {day}
          </div>
        ))}

        {calendarDays.map((date, index) => {
          const selected = isSameDay(date, selectedDate);
          const disabled = isPastDate(date);
          const sunday = isSunday(date);
          const dateKey = date ? formatDate(date) : null;
          const saved = dateKey ? workTimes[dateKey] : null;

          return (
            <button
              key={index}
              disabled={!date || disabled}
              onClick={() => {handleSelectDate(date)
              }}
              className={`
                relative h-11 rounded-full text-sm font-semibold transition
                ${!date ? "invisible" : ""}
                ${
                  selected
                    ? "bg-[var(--primary)] text-[var(--text-white)] shadow-md"
                    : "text-[var(--text)] hover:bg-[var(--primary-light)] hover:text-[var(--primary)]"
                }
                ${
                  sunday && !selected
                    ? "bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600"
                    : ""
                }
                ${
                  saved?.isActive && !selected && !sunday
                    ? "bg-green-50 text-green-600 hover:bg-green-100"
                    : ""
                }
                ${
                  disabled
                    ? "cursor-not-allowed opacity-30 hover:bg-transparent hover:text-[var(--text)]"
                    : ""
                }
              `}
            >
              {date?.getDate()}
            </button>
          );
        })}
      </div>

      <div className="mt-8 rounded-[var(--radius-md)] border border-[var(--border)] p-5">
        {isSunday(selectedDate) ? (
          <div className="flex items-center gap-2 font-bold text-red-500">
            <XCircle size={18} />
            V nedeľu nepracuješ
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center gap-2 font-bold text-[var(--text)]">
              <Clock size={18} />
              Nastaviť pracovný čas
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                  Začiatok práce
                </label>

                <TimePicker value={startTime} onChange={setStartTime} />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[var(--text-secondary)]">
                  Koniec práce
                </label>

                <TimePicker value={endTime} onChange={setEndTime} />
              </div>
            </div>

            <button
              onClick={saveWorkTime}
              disabled={loading}
              className="mt-5 w-full rounded-[var(--radius-full)] bg-[var(--primary)] px-6 py-4 font-bold text-[var(--text-white)] shadow-lg hover:bg-[var(--primary-hover)] disabled:opacity-60"
            >
              {loading ? "Ukladám..." : "Uložiť pracovný čas"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}