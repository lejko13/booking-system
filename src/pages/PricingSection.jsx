import { Check, ArrowRight, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Implementácia",
    price: "od 299 €",
    oldPrice: "399 €",
    description: "Rezervačný systém vložím do webu, ktorý ti vytvorím ja.",
    highlight: false,
    features: [
      "Rezervačný formulár",
      "Výber služby, dátumu a času",
      "Základná administrácia",
      "Napojenie na databázu",
      "Dizajn podľa webu",
    ],
  },
  {
    name: "Prenájom systému",
    price: "od 39 € / mes.",
    oldPrice: "59 € / mes.",
    description: "Hotový systém používaš mesačne bez riešenia technických vecí.",
    highlight: true,
    features: [
      "Hosting systému",
      "Údržba a aktualizácie",
      "Rezervácie online 24/7",
      "Emailové potvrdenia",
      "Technická podpora",
    ],
  },
  {
    name: "Web + systém",
    price: "od 699 €",
    oldPrice: "899 €",
    description: "Vytvorím celý web aj s rezervačným systémom na mieru.",
    highlight: false,
    features: [
      "Moderný prezentačný web",
      "Rezervačný systém",
      "Responzívny dizajn",
      "SEO základ",
      "Zľava na systém",
    ],
  },
];

export default function PricingSection() {
 return (
  <main className="min-h-screen bg-[var(--background)] text-[var(--text)] pt-[var(--navbar-height)] flex justify-center">
    <section
      id="cennik"
      className="w-full max-w-[var(--container)] py-[var(--section-y)] px-7"
    >
      <div className="mb-14 max-w-3xl text-start">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[var(--primary-light)] px-5 py-2 text-sm font-bold text-[var(--primary)]">
          <Sparkles size={16} />
          Cenník
        </div>

        <h2 className="text-[38px] font-black leading-[0.95] tracking-[-0.04em] text-[var(--text)] md:text-[54px]">
          Vyber si spôsob, ktorý ti najviac sedí.
        </h2>

        <p className="mt-5 text-[17px] leading-7 text-[var(--text-secondary)]">
          Systém viem implementovať do webu, prenajímať mesačne, alebo ti
          vytvoriť celý web aj s rezerváciami.
        </p>
      </div>

      <div className="grid w-full gap-6 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`
              relative flex flex-col overflow-hidden rounded-[28px] border p-7
              transition duration-300 hover:-translate-y-2 hover:shadow-2xl
              ${
                plan.highlight
                  ? "scale-[1.02] border-[var(--primary)] bg-[var(--secondary)] text-white shadow-2xl"
                  : "border-[var(--border)] bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-card)]"
              }
            `}
          >
            {plan.highlight && (
              <div className="absolute right-5 top-5 rounded-full bg-[var(--primary)] px-4 py-2 text-xs font-black uppercase tracking-wide text-white">
                Najvýhodnejšie
              </div>
            )}

            <div className="mb-7">
              <h3 className="pr-24 text-[26px] font-black">{plan.name}</h3>

              <p
                className={`mt-4 min-h-[52px] text-sm leading-6 ${
                  plan.highlight
                    ? "text-slate-300"
                    : "text-[var(--text-secondary)]"
                }`}
              >
                {plan.description}
              </p>
            </div>

            <div className="mb-7">
              <div className="flex items-end gap-3">
                <span className="text-[38px] font-black tracking-[-0.04em]">
                  {plan.price}
                </span>

                <span
                  className={`mb-2 text-sm line-through ${
                    plan.highlight
                      ? "text-slate-400"
                      : "text-[var(--text-muted)]"
                  }`}
                >
                  {plan.oldPrice}
                </span>
              </div>

              <p
                className={`mt-3 text-sm font-semibold ${
                  plan.highlight ? "text-blue-200" : "text-[var(--primary)]"
                }`}
              >
                Zľava platí pri tvorbe webu odo mňa.
              </p>
            </div>

            <ul className="mb-8 space-y-4">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-3 text-sm font-bold"
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                      plan.highlight
                        ? "bg-white/10 text-[var(--success)]"
                        : "bg-[var(--primary-light)] text-[var(--primary)]"
                    }`}
                  >
                    <Check size={16} />
                  </span>

                  {feature}
                </li>
              ))}
            </ul>

            <button
             onClick={() =>
    window.open("https://www.leofudaly.com", "_blank")
  }
              className={`
                mt-auto flex h-[56px] w-full items-center justify-center gap-2
                rounded-2xl text-[16px] font-black transition duration-300
                ${
                  plan.highlight
                    ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)]"
                    : "bg-[var(--surface-secondary)] text-[var(--text)] hover:bg-[var(--primary)] hover:text-white"
                }
              `}
            >
              Vybrať balík
              <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>
    </section>
  </main>
);
}