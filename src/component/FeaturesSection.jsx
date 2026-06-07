import { CalendarDays, Users, Clock } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: <CalendarDays size={24} />,
      title: "Prehľadný kalendár",
      text: "Vidíte všetky rezervácie, dostupnosť aj obsadené termíny.",
    },
    {
      icon: <Users size={24} />,
      title: "Klientska databáza",
      text: "Ukladajte zákazníkov, históriu a kontaktné údaje.",
    },
    {
      icon: <Clock size={24} />,
      title: "Automatizácia",
      text: "Zákazník dostane potvrdenie a pripomienku termínu.",
    },
  ];

  return (
    <section
      className="
        mx-auto
        max-w-[var(--container)]
        px-[var(--section-x)]
        pb-[var(--section-y)]
      "
    >
      <div className="grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            text={feature.text}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div
      className="
        rounded-[var(--radius-lg)]
        border
        border-[var(--border)]
        bg-[var(--surface)]
        p-6
        shadow-[var(--shadow-card)]
      "
    >
      <div
        className="
          mb-4
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-[var(--radius-md)]
          bg-[var(--primary-light)]
          text-[var(--primary)]
        "
      >
        {icon}
      </div>

      <h3
        className="
          text-[var(--subheading-size)]
          font-bold
          text-[var(--text)]
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          text-[var(--body-size)]
          text-[var(--text-secondary)]
        "
      >
        {text}
      </p>
    </div>
  );
}