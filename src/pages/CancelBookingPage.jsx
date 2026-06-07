import { useState } from "react";
import { useParams } from "react-router-dom";
import { CalendarX } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function CancelBookingPage() {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const cancelBooking = async () => {
    setLoading(true);

    const { error } = await supabase
      .from("bookings")
      .update({ status: "cancelled" })
      .eq("cancel_token", token)
      .eq("status", "active");

    setLoading(false);

    if (error) {
      setMessage("Rezerváciu sa nepodarilo zrušiť.");
      return;
    }

    setMessage("Rezervácia bola úspešne zrušená.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)] px-4">
      <div className="w-full max-w-md rounded-[var(--radius-lg)] bg-[var(--surface)] p-6 text-center shadow-[var(--shadow-card)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <CalendarX size={28} />
        </div>

        <h1 className="text-2xl font-black text-[var(--text)]">
          Zrušenie rezervácie
        </h1>

        <p className="mt-2 text-[var(--text-secondary)]">
          Naozaj chceš zrušiť túto rezerváciu?
        </p>

        {message && (
          <p className="mt-4 font-bold text-[var(--primary)]">
            {message}
          </p>
        )}

        {!message && (
          <button
            onClick={cancelBooking}
            disabled={loading}
            className="mt-6 w-full rounded-[var(--radius-full)] bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {loading ? "Ruším..." : "Zrušiť rezerváciu"}
          </button>
        )}
      </div>
    </div>
  );
}