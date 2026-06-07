import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, XCircle } from "lucide-react";
import { supabase } from "../lib/supabase";

const months = [
  "Január", "Február", "Marec", "Apríl", "Máj", "Jún",
  "Júl", "August", "September", "Október", "November", "December"
];

const days = ["Po", "Ut", "St", "Št", "Pi", "So", "Ne"];

function formatDate(date) {
  return date.toLocaleDateString("en-CA");
}

export default function BookingCalendar({
  selectedService,
  date,
  setDate,
  setSelectedTime,
}) {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const [workTimes, setWorkTimes] = useState({});

  useEffect(() => {
    fetchWorkingHours();
  }, []);

  const fetchWorkingHours = async () => {
    const { data, error } = await supabase
      .from("working_hours")
      .select("*")
      .eq("is_active", true);

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
    setCurrentDate((prev) => (
      new Date(prev.getFullYear(), prev.getMonth() + direction, 1)
    ));
  };

  const isSunday = (dayDate) => dayDate?.getDay() === 0;

  const isPastDate = (dayDate) => {
    if (!dayDate) return false;

    const cleanToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return dayDate < cleanToday;
  };

  const isBookableDay = (dayDate) => {
    if (!dayDate) return false;
    if (!selectedService) return false;
    if (isPastDate(dayDate)) return false;
    if (isSunday(dayDate)) return false;

    const dateKey = formatDate(dayDate);
    return !!workTimes[dateKey]?.isActive;
  };

  const handleSelectDate = (dayDate) => {
    if (!isBookableDay(dayDate)) return;

    setDate(formatDate(dayDate));
    setSelectedTime("");
  };

  const selectedWorkTime = date ? workTimes[date] : null;

  return (
    <div className="absolute  top-[62px] rounded-[var(--radius-lg)] w-full border border-[var(--border)] z-20 bg-[var(--surface)] p-6 shadow-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-[var(--primary)]">
            Vyberte termín
          </p>

          <h3 className="text-2xl font-extrabold text-[var(--text)]">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => changeMonth(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            type="button"
            onClick={() => changeMonth(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {days.map((dayName) => (
          <div
            key={dayName}
            className="text-sm font-bold text-[var(--text-secondary)]"
          >
            {dayName}
          </div>
        ))}

        {calendarDays.map((dayDate, index) => {
          const dateKey = dayDate ? formatDate(dayDate) : null;
          const selected = dateKey === date;
          const sunday = isSunday(dayDate);
          const bookable = isBookableDay(dayDate);
          const disabled = !dayDate || !bookable;

          return (
            <button
              key={index}
              type="button"
              disabled={disabled}
              onClick={() => handleSelectDate(dayDate)}
              className={`
                relative h-11 rounded-full text-sm font-semibold transition
                ${!dayDate ? "invisible" : ""}

                ${
                  selected
                    ? "bg-[var(--primary)] text-white shadow-md"
                    : ""
                }

                ${
                  bookable && !selected
                    ? "bg-green-50 text-green-600 hover:bg-green-100"
                    : ""
                }

                ${
                  sunday && !selected
                    ? "cursor-not-allowed bg-red-50 text-red-500"
                    : ""
                }

                ${
                  !bookable && !sunday && dayDate
                    ? "cursor-not-allowed bg-slate-100 text-slate-400 opacity-60"
                    : ""
                }

                ${
                  !selectedService && dayDate
                    ? "cursor-not-allowed opacity-40"
                    : ""
                }
              `}
            >
              {dayDate?.getDate()}
            </button>
          );
        })}
      </div>

     
    </div>
  );
}