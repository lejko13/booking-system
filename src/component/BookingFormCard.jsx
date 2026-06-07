import { useEffect, useRef, useState } from "react";
import BookingStatus from "./BookingStatus";
import {useWorkingHours} from '../context/WorkingHoursProvider'
import {
  ChevronDown,
  User,
  Phone,
  Mail,
  Pencil,
  ArrowRight,
} from "lucide-react";
import { useServices } from "../hooks/useServices";
import BookingCalendar from "../component/BookingCalendar";
import { supabase } from "../lib/supabase";

export default function BookingFormCard() {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const [showCalendar, setShowCalendar] = useState(false);
  const [showTimes, setShowTimes] = useState(false);

  const [date, setDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const serviceRef = useRef(null);
  const calendarRef = useRef(null);
  const timesRef = useRef(null);

  const services = useServices();

  const { popup, setPopup } = useWorkingHours();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (serviceRef.current && !serviceRef.current.contains(event.target)) {
        setIsServiceOpen(false);
      }

      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }

      if (timesRef.current && !timesRef.current.contains(event.target)) {
        setShowTimes(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const resetForm = (formElement) => {
    setSelectedService(null);
    setDate("");
    setSelectedTime("");

    setShowCalendar(false);
    setShowTimes(false);
    setIsServiceOpen(false);

    formElement.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formElement = e.currentTarget;

   if (!selectedService || !date || !selectedTime) {
  setPopup({
    isOpen: true,
    message: "Vyber službu, dátum a čas",
    type: "warning",
  });

  return;
}

    const form = new FormData(formElement);

    const endTime = addMinutes(
      selectedTime,
      selectedService.duration_minutes
    );

    const { data: existingBooking } = await supabase
      .from("bookings")
      .select("id")
      .eq("booking_date", date)
      .eq("booking_time", selectedTime)
      .eq("status", "active")
      .maybeSingle();

    if (existingBooking) {
  setPopup({
    isOpen: true,
    message: "Tento čas je už obsadený",
    type: "warning",
  });

  setSelectedTime("");

  return;
}

    const { error } = await supabase.from("bookings").insert({
      service_id: selectedService.id,
      booking_date: date,
      booking_time: selectedTime,
      end_time: endTime,
      client_name: form.get("name"),
      client_phone: form.get("phone"),
      client_email: form.get("email"),
      message: form.get("message"),
      status: "active",
    });

  if (error) {
  console.log(error);

  setPopup({
    isOpen: true,
    message: "Chyba pri rezervácii",
    type: "error",
  });

  return;
}

setPopup({
  isOpen: true,
  message: "Rezervácia bola vytvorená",
  type: "success",
});

    resetForm(formElement);
  };

  return (
    <div className="w-full max-w-[530px] h-fit overflow-visible rounded-[var(--radius-xl)] bg-[var(--surface)] px-6 pb-6 shadow-[var(--shadow-card)]">
      <form onSubmit={handleSubmit} className="mt-5 space-y-3 h-full">
        <div ref={serviceRef} className="relative">
          <button
            type="button"
            onClick={() => {
              setIsServiceOpen((prev) => !prev);
              setShowCalendar(false);
              setShowTimes(false);
            }}
            className="flex h-[52px] w-full items-center justify-between rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-left text-[17px] text-[var(--text-muted)]"
          >
            <span>
              {selectedService ? selectedService.name : "Vyber službu"}
            </span>

            <ChevronDown size={20} />
          </button>

          {isServiceOpen && (
            <div className="absolute left-0 top-[58px] z-50 w-full overflow-hidden rounded-[var(--radius-md)] border border-[var(--border)] bg-white shadow-[var(--shadow-card)]">
              {services.map((service) => (
                <button
                  type="button"
                  key={service.id}
                  onClick={() => {
                    setSelectedService(service);
                    setDate("");
                    setSelectedTime("");
                    setShowCalendar(false);
                    setShowTimes(false);
                    setIsServiceOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-4 py-3 text-left hover:bg-[var(--primary-light)]"
                >
                  <div>
                    <p className="text-sm font-bold text-[var(--text)]">
                      {service.name}
                    </p>

                    <p className="text-xs text-[var(--text-secondary)]">
                      {service.duration_minutes} min
                    </p>
                  </div>

                  <span className="text-sm text-[var(--primary)]">
                    {service.price} €
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={calendarRef} className="relative">
          <input
            type="text"
            readOnly
            disabled={!selectedService}
            value={date}
            placeholder="Vyberte dátum"
            onClick={() => {
              if (!selectedService) return;

              setShowCalendar((prev) => !prev);
              setIsServiceOpen(false);
              setShowTimes(false);
            }}
            className="h-[52px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-[17px] text-[var(--text-muted)] outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[var(--primary)]"
          />

          {showCalendar && (
            <BookingCalendar
              selectedService={selectedService}
              date={date}
              setDate={(selectedDate) => {
                setDate(selectedDate);
                setSelectedTime("");
                setShowCalendar(false);
                setShowTimes(false);
              }}
              setSelectedTime={setSelectedTime}
            />
          )}
        </div>

        <div ref={timesRef} className="relative">
          <input
            type="text"
            readOnly
            disabled={!selectedService || !date}
            value={selectedTime}
            placeholder="Vyber čas"
            onClick={() => {
              if (!selectedService || !date) return;

              setShowTimes((prev) => !prev);
              setShowCalendar(false);
              setIsServiceOpen(false);
            }}
            className="h-[52px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 text-[17px] text-[var(--text-muted)] outline-none disabled:cursor-not-allowed disabled:opacity-50 focus:border-[var(--primary)]"
          />

          {showTimes && (
            <div className="absolute left-0 top-[58px] z-20 w-full max-h-[350px] overflow-y-auto rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-xl scrollbar-hide">
              <BookingStatus
                selectedService={selectedService}
                date={date}
                selectedTime={selectedTime}
                setSelectedTime={(time) => {
                  setSelectedTime(time);
                  setShowTimes(false);
                }}
              />
            </div>
          )}
        </div>

        <Input icon={<User size={19} />} name="name" placeholder="Meno" />

        <Input
          icon={<Phone size={19} />}
          name="phone"
          placeholder="Telefónne číslo"
        />

        <Input
          icon={<Mail size={19} />}
          name="email"
          placeholder="Email"
          type="email"
        />

        <div className="relative">
          <Pencil
            className="absolute left-4 top-4 text-[var(--text-muted)]"
            size={19}
          />

          <textarea
            name="message"
            placeholder="Správa pre holiča (voliteľné)"
            rows={2}
            className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-12 py-3 text-[17px] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
          />
        </div>

        <button
          type="submit"
          className="flex h-[54px] w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] text-[17px] text-white shadow-[var(--shadow-button)] hover:bg-[var(--primary-hover)]"
        >
          Potvrdiť rezerváciu
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}

function Input({ icon, name, placeholder, type = "text" }) {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
        {icon}
      </div>

      <input
        required
        type={type}
        name={name}
        placeholder={placeholder}
        className="h-[52px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-12 text-[17px] text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
      />
    </div>
  );
}

function addMinutes(time, minutesToAdd) {
  const [hours, minutes] = time.split(":").map(Number);

  const totalMinutes = hours * 60 + minutes + minutesToAdd;

  const newHours = Math.floor(totalMinutes / 60);
  const newMinutes = totalMinutes % 60;

  return `${String(newHours).padStart(2, "0")}:${String(
    newMinutes
  ).padStart(2, "0")}`;
}