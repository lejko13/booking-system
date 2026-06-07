import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function BookingStatus({
  selectedService,
  date,
  selectedTime,
  setSelectedTime,
}) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    fetchAvailableTimes();
  }, [selectedService, date]);

  async function fetchAvailableTimes() {
    if (!selectedService || !date) {
      setTimes([]);
      return;
    }

    const { data: workday, error: workdayError } = await supabase
      .from("working_hours")
      .select("*")
      .eq("work_date", date)
      .eq("is_active", true)
      .single();

    if (workdayError || !workday) {
      console.log(workdayError);
      setTimes([]);
      return;
    }

    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("booking_time")
      .eq("booking_date", date)
      .eq("status", "active");

    if (bookingsError) {
      console.log(bookingsError);
      setTimes([]);
      return;
    }

    const bookedTimes =
      bookings?.map((item) => item.booking_time?.slice(0, 5)) || [];

    const generatedTimes = generateTimes(
      workday.start_time?.slice(0, 5),
      workday.end_time?.slice(0, 5),
      selectedService.duration_minutes || 30,
      bookedTimes
    );

    setTimes(generatedTimes);
  }

  if (!selectedService || !date) {
    return (
      <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-4 text-[var(--text-muted)]">
        Najprv vyber službu a dátum
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2  w-full z-30">
      {times.map((time) => (
        <button
          key={time.id}
          type="button"
          disabled={time.isBooked}
          onClick={() => setSelectedTime(time.value)}
          className={`
            h-[52px]
            rounded-[var(--radius-md)]
            border
            px-4
            text-[15px]
            font-bold
            transition

            ${
              time.isBooked
                ? "cursor-not-allowed border-[var(--danger-border)] bg-[var(--danger-light)] text-[var(--danger-dark)] opacity-70"
                : selectedTime === time.value
                ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                : "border-[var(--border)] bg-[var(--surface-secondary)] text-[var(--text-muted)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
            }
          `}
        >
          {time.label}
          {time.isBooked && " obsadené"}
        </button>
      ))}
    </div>
  );
}

function generateTimes(startTime, endTime, duration, bookedTimes = []) {
  if (!startTime || !endTime) return [];

  const times = [];

  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);

  for (let current = start; current + duration <= end; current += duration) {
    const from = minutesToTime(current);
    const to = minutesToTime(current + duration);
    const isBooked = bookedTimes.includes(from);

    times.push({
      id: from.replace(":", "-"),
      value: from,
      label: `${from} - ${to}`,
      isBooked,
    });
  }

  return times;
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

function minutesToTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}