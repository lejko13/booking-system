import { Clock, CheckCircle2, ArrowRight, Star } from "lucide-react";
import BookingFormCard from '../component/BookingFormCard'






export default function HeroSection() {

  

  return (
    <section className="mx-auto grid max-w-[var(--container)] items-center gap-12 px-[var(--section-x)] py-[var(--section-y)] lg:grid-cols-2">
      <div>
        <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-[var(--primary-light)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">
          <Star size={16} />
          Moderný rezervačný systém
        </div>

            <h1
          className="
            max-w-4xl
            text-[var(--hero-size)]
            font-black
            leading-[0.95]
            tracking-[-0.04em]
            text-[40px]
          md:text-[58px]
            xl:text-[65px]
          "
        >
          Rezervácie jednoducho,
          <br />
          rýchlo a prehľadne.
        </h1>
        <p className="mt-6 max-w-xl text-[var(--body-size)] leading-8 text-[var(--text-secondary)]">
          Umožnite zákazníkom rezervovať termín online za pár sekúnd. Spravujte
          služby, dostupné časy a klientov z jedného čistého rozhrania.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] bg-[var(--primary)] px-7 py-4 font-semibold text-[var(--text-white)] shadow-lg hover:bg-[var(--primary-hover)]">
            Vytvoriť rezerváciu <ArrowRight size={18} />
          </button>

          <button className="rounded-[var(--radius-full)] border border-[var(--border)] bg-[var(--surface)] px-7 py-4 font-semibold text-[var(--text)] hover:border-[var(--primary)] hover:text-[var(--primary)]">
            Pozrieť demo
          </button>
        </div>

        <div className="mt-10 grid max-w-lg grid-cols-3 gap-5">
          <Stat value="24/7" label="online booking" />
          <Stat value="3x" label="rýchlejšie termíny" />
          <Stat value="98%" label="spokojnosť" />
        </div>
      </div>

      <BookingFormCard></BookingFormCard>

      
    </section>
  );
}

function Stat({ value, label }) {
  return (
    <div>
      <p className="text-2xl font-extrabold text-[var(--text)]">{value}</p>
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
    </div>
  );
}