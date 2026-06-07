import { useState ,useEffect} from "react";
import { useWorkingHours } from "../context/WorkingHoursProvider";
import {Sidebar} from '../component/Sidebar'
import BookingsPage from '../pages/BookingsPage'
import {
  CalendarDays,
  Users,
  Euro,
  Clock,
  TrendingUp,
  CheckCircle2,
  XCircle,
  CalendarCheck,
  Settings,
} from "lucide-react";
import { supabase } from "../lib/supabase";
import ServicesPage from '../pages/service'
import WorkingHours from '../pages/WorkingHours'
import Owerlap from '../component/owerlap'
import Workdays from '../pages/Workdays'
import SettingsPage from '../pages/SettingsPage'
import OverviewPage from '../pages/Overview'

const stats = [
  { title: "Dnešné rezervácie", value: "12", icon: <CalendarDays size={22} /> },
  { title: "Klienti", value: "248", icon: <Users size={22} /> },
  { title: "Mesačný obrat", value: "1 240 €", icon: <Euro size={22} /> },
  { title: "Čakajúce rezervácie", value: "5", icon: <Clock size={22} /> },
];

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


const menuItems = [
  { id: "overview", text: "Prehľad", icon: TrendingUp },
  { id: "sluzby", text: "Služby", icon: Settings },
  { id: "pracovadoba", text: "Pracovná doba", icon: Clock },
  { id: "bookings", text: "Rezervácie", icon: CalendarDays },
  { id: "pracovnedni", text: "Pracovne dni", icon: CalendarCheck },
  // { id: "payments", text: "Platby", icon: Euro },
  { id: "settings", text: "Nastavenia", icon: Settings },
];



async function getServices() {
  const { data, error } = await supabase
    .from("services")
    .select("*");

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
}



export default function AdminPage() {

    const { state, setState } = useWorkingHours();



  const [activePage, setActivePage] = useState("overview");

  useEffect(() => {
  getServices();
}, []);
return (
  <>
    <Owerlap />

    <main className="h-screen bg-[var(--background)] text-[var(--text)] pt-[var(--navbar-height)] overflow-hidden">
      <div className="w-full max-w-[var(--container)] mx-auto h-full lg:grid lg:grid-cols-[260px_1fr]">
     <Sidebar
  activePage={activePage}
  setActivePage={setActivePage}
  menuItems={menuItems}
  title="Admin menu"
  bgClass="bg-green-500"
  desktopWidth="w-64"
/>

        <section className="p-4 lg:p-8 overflow-y-auto h-full pb-28 lg:pb-8">
          {activePage === "overview" && <OverviewPage />}
          {activePage === "bookings" && <BookingsPage />}
          {activePage === "pracovadoba" && <WorkingHours />}
          {activePage === "pracovnedni" && <Workdays />}
          {activePage === "payments" && <Payments />}
          {activePage === "settings" && <SettingsPage />}
          {activePage === "sluzby" && <ServicesPage />}
        </section>
      </div>
    </main>
  </>
  );
}



export function PageHeader({ label, title, button }) {
  return (
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
  );
}




export function BookingsCard() {
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

// function Bookings() {
//   return (
//     <>
//       <PageHeader
//         label="Dashboard"
//         title="Rezervácie"
//         button="+ Nová rezervácia"
//       />

//       <div className="mt-8">
//         <BookingsCard />
//       </div>
//     </>
//   );
// }

// function Clients() {
//   return (
//     <>
//       <PageHeader label="Dashboard" title="Klienti" button="+ Nový klient" />

//       <EmptyCard text="Tu bude zoznam klientov." />
//     </>
//   );
// }

function Payments() {
  return (
    <>
      <PageHeader label="Dashboard" title="Platby" button="+ Pridať platbu" />

      <EmptyCard text="Tu bude prehľad platieb a obratu." />
    </>
  );
}

// function SettingsPage() {
//   return (
//     <>
//       <PageHeader label="Dashboard" title="Nastavenia" />

//       <EmptyCard text="Tu budú nastavenia systému." />
//     </>
//   );
// }

export function EmptyCard({ text }) {
  return (
    <div className="mt-8 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
      <p className="font-bold text-[var(--text-secondary)]">{text}</p>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
      <h2 className="text-2xl font-black">Rýchle akcie</h2>

      <div className="mt-5 space-y-3">
        <QuickAction text="Pridať službu" />
        <QuickAction text="Nastaviť dostupnosť" />
        <QuickAction text="Pozrieť klientov" />
        <QuickAction text="Upraviť cenník" />
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const isConfirmed = status === "Potvrdené";

  return (
    <div
      className={`
        flex items-center justify-center gap-2 rounded-[var(--radius-full)]
        px-3 py-2 text-sm font-bold
        ${
          isConfirmed
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }
      `}
    >
      {isConfirmed ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
      {status}
    </div>
  );
}

function QuickAction({ text }) {
  return (
    <button className="flex h-12 w-full items-center justify-between rounded-[var(--radius-md)] bg-[var(--surface-secondary)] px-4 font-bold text-[var(--text)] hover:bg-[var(--primary-light)]">
      {text}
      <span>→</span>
    </button>
  );
}

export function PageHeaderBTN({ label, title, button, onClick }) {
  return (
    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
      <div>
        <p className="font-extrabold text-[var(--primary)]">{label}</p>
        <h1 className="text-[42px] font-black leading-none">{title}</h1>
      </div>

      {button && (
        <button
          onClick={onClick}
          className="rounded-[var(--radius-full)] bg-[var(--primary)] px-6 py-3 font-bold text-white"
        >
          {button}
        </button>
      )}
    </div>
  );
}