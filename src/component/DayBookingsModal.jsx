import { useEffect, useState } from "react";
import { X, CalendarDays, Clock, User, Phone, Mail } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function DayBookingsModal({ isOpen, onClose, day }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !day?.work_date) return;

    fetchBookings();
  }, [isOpen, day]);

  async function fetchBookings() {
    setLoading(true);

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        services (
          name,
          duration_minutes,
          price
        )
      `)
      .eq("booking_date", day.work_date)
      .eq("status", "active")
      .order("booking_time", { ascending: true });

    if (error) {
      console.log(error);
      setBookings([]);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-[var(--primary)]">
              <CalendarDays size={20} />
              <p className="font-bold">Objednávky pre deň</p>
            </div>

            <h3 className="text-2xl font-black text-[var(--text)]">
              {day?.work_date
                ? new Date(day.work_date).toLocaleDateString("sk-SK", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : ""}
            </h3>
          </div>

          <button onClick={onClose} className="text-[var(--text-secondary)]">
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <p className="font-bold text-[var(--text-secondary)]">
            Načítavam rezervácie...
          </p>
        ) : bookings.length === 0 ? (
          <div className="rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-6">
            <p className="font-bold text-[var(--text-secondary)]">
              Na tento deň zatiaľ nie sú žiadne objednávky.
            </p>
          </div>
        ) : (
          <div className="max-h-[420px] space-y-3 overflow-y-auto scrollbar-hide">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4"
              >
                <div className="grid gap-4 md:grid-cols-[1fr_auto_auto]">
                  <div>
                    <div className="flex items-center gap-2">
                      <User size={16} />
                      <p className="font-black">{booking.client_name}</p>
                    </div>

                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      {booking.services?.name || "Služba"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-[var(--text-secondary)]">Čas</p>
                    <p className="flex items-center gap-1 font-bold">
                      <Clock size={16} />
                      {booking.booking_time?.slice(0, 5)} -{" "}
                      {booking.end_time?.slice(0, 5)}
                    </p>
                  </div>

                  <div className="flex items-center md:justify-end">
                    <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-bold text-green-700">
                      Potvrdené
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid gap-2 text-sm text-[var(--text-secondary)] md:grid-cols-2">
                  <p className="flex items-center gap-2">
                    <Phone size={15} />
                    {booking.client_phone}
                  </p>

                  <p className="flex items-center gap-2">
                    <Mail size={15} />
                    {booking.client_email}
                  </p>
                </div>

                {booking.message && (
                  <p className="mt-3 rounded-[var(--radius-sm)] bg-white p-3 text-sm text-[var(--text-secondary)]">
                    {booking.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}