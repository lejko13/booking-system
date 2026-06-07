import { useEffect, useMemo, useState } from "react";
import { PageHeader } from "./AdminPage";
import { supabase } from "../lib/supabase";
import {
  CalendarDays,
  Clock,
  Users,
  CheckCircle,
} from "lucide-react";

export default function OverviewPage() {
  const [bookings, setBookings] = useState([]);
  const [workdays, setWorkdays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    setLoading(true);

    const bookingsResult = await supabase
      .from("bookings")
      .select(`
        *,
        services (
          name,
          duration_minutes,
          price
        )
      `)
      .order("booking_date", { ascending: true });

    const workdaysResult = await supabase
      .from("working_hours")
      .select("*")
      .eq("is_active", true);

    if (bookingsResult.error) {
      console.log(bookingsResult.error);
    }

    if (workdaysResult.error) {
      console.log(workdaysResult.error);
    }

    setBookings(bookingsResult.data || []);
    setWorkdays(workdaysResult.data || []);
    setLoading(false);
  }

  const today = new Date().toLocaleDateString("en-CA");

  const activeBookings = bookings.filter(
    (item) => item.status === "active"
  );

  const todayBookings = activeBookings.filter(
    (item) => item.booking_date === today
  );

  const upcomingBookings = activeBookings
    .filter((item) => item.booking_date >= today)
    .slice(0, 5);

  const totalRevenue = activeBookings.reduce((sum, item) => {
    return sum + Number(item.services?.price || 0);
  }, 0);

  return (
    <>
      <PageHeader
        label="Dashboard"
        title="Prehľad systému"
        // button="+ Nová rezervácia"
      />

      {loading ? (
        <p className="mt-8 font-bold text-[var(--text-secondary)]">
          Načítavam dashboard...
        </p>
      ) : (
        <>
          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
              icon={<CalendarDays size={22} />}
              title="Všetky rezervácie"
              value={activeBookings.length}
            />

            <StatCard
              icon={<Clock size={22} />}
              title="Dnes"
              value={todayBookings.length}
            />

            <StatCard
              icon={<CheckCircle size={22} />}
              title="Pracovné dni"
              value={workdays.length}
            />

            <StatCard
              icon={<Users size={22} />}
              title="Tržby"
              value={`${totalRevenue} €`}
            />
          </div>

          <div className="mt-8 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-5 text-2xl font-black">
                Najbližšie objednávky
              </h2>

              {upcomingBookings.length === 0 ? (
                <p className="font-bold text-[var(--text-secondary)]">
                  Žiadne najbližšie rezervácie.
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-black">
                            {booking.client_name}
                          </p>

                          <p className="text-sm text-[var(--text-secondary)]">
                            {booking.services?.name || "Služba"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold">
                            {booking.booking_time?.slice(0, 5)}
                          </p>

                          <p className="text-sm text-[var(--text-secondary)]">
                            {new Date(
                              booking.booking_date
                            ).toLocaleDateString("sk-SK")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
              <h2 className="mb-5 text-2xl font-black">
                Stav systému
              </h2>

              <InfoRow label="Aktívne rezervácie" value={activeBookings.length} />
              <InfoRow label="Dnešné rezervácie" value={todayBookings.length} />
              <InfoRow label="Pracovné dni" value={workdays.length} />
              <InfoRow label="Celkové tržby" value={`${totalRevenue} €`} />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary-light)] text-[var(--primary)]">
        {icon}
      </div>

      <p className="text-sm font-bold text-[var(--text-secondary)]">
        {title}
      </p>

      <h3 className="mt-1 text-3xl font-black text-[var(--text)]">
        {value}
      </h3>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between border-b border-[var(--border)] py-3 last:border-b-0">
      <span className="font-bold text-[var(--text-secondary)]">
        {label}
      </span>

      <span className="font-black text-[var(--text)]">
        {value}
      </span>
    </div>
  );
}