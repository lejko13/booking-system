export default function Bookings({
  label = "Dashboard",
  title = "Rezervácie",
  button = "+ Nová rezervácia",
}) {
  return (
    <>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="font-extrabold text-[var(--primary)]">{label}</p>
          <h1 className="text-[42px] font-black leading-none">{title}</h1>
        </div>

        {button && (
          <button className="rounded-[var(--radius-full)] bg-[var(--primary)] px-6 py-3 font-bold text-white">
            {button}
          </button>
        )}
      </div>

      <div className="mt-8">
        <BookingsCard />
      </div>
    </>
  );
}

function BookingsCard() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-2xl font-black">Najbližšie rezervácie</h2>

        <button className="text-sm font-bold text-[var(--primary)]">
          Zobraziť všetko
        </button>
      </div>

      <BookingList />
    </div>
  );
}

const bookings = [
  {
    name: "Martin Kováč",
    service: "Strihanie vlasov",
    date: "Dnes",
    time: "09:00",
    status: "Potvrdené",
  },
  {
    name: "Peter Novák",
    service: "Vlasy + brada",
    date: "Dnes",
    time: "10:30",
    status: "Čaká",
  },
  {
    name: "Tomáš Horváth",
    service: "Úprava brady",
    date: "Zajtra",
    time: "13:00",
    status: "Potvrdené",
  },
];

function BookingList() {
  return (
    <div className="space-y-3">
      {bookings.map((booking) => (
        <div
          key={`${booking.name}-${booking.time}`}
          className="grid gap-3 rounded-[var(--radius-md)] bg-[var(--surface-secondary)] p-4 md:grid-cols-[1.2fr_1fr_0.7fr_0.8fr]"
        >
          <div>
            <p className="font-black">{booking.name}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              {booking.service}
            </p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-secondary)]">Dátum</p>
            <p className="font-bold">{booking.date}</p>
          </div>

          <div>
            <p className="text-sm text-[var(--text-secondary)]">Čas</p>
            <p className="font-bold">{booking.time}</p>
          </div>

          <StatusBadge status={booking.status} />
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ status }) {
  const isConfirmed = status === "Potvrdené";

  return (
    <div className="flex items-center md:justify-end">
      <span
        className={`rounded-[var(--radius-full)] px-4 py-2 text-sm font-bold ${
          isConfirmed
            ? "bg-[var(--success-light)] text-[var(--success-dark)]"
            : "bg-[var(--warning-light)] text-[var(--warning-dark)]"
        }`}
      >
        {status}
      </span>
    </div>
  );
}