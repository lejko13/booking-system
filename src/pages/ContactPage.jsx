import Navbar from "../component/Navbar";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-[var(--navbar-height)] text-[var(--text)]">
      <Navbar />

      <section className="mx-auto grid max-w-[var(--container)] gap-10 px-[var(--section-x)] py-[var(--section-y)] lg:grid-cols-[0.9fr_1.1fr]">
        <div>

           <div className="mb-5 inline-flex items-center gap-2 rounded-[var(--radius-full)] bg-[var(--primary-light)] px-4 py-2 text-sm font-semibold text-[var(--primary)]">

  <Phone size={16} />
    Kontakt
        </div>
          

          <h1 className=" max-w-4xl
    text-[var(--hero-size)]
    font-black
    leading-[0.95]
    tracking-[-0.04em]
    text-[30px]
   md:text-[48px]
    xl:text-[55px]">
            Poďme spolu vytvoriť rezervačný systém.
          </h1>

          <p className="mt-6 max-w-xl text-[var(--body-size)] leading-8 text-[var(--text-secondary)]">
            Napíš mi, ak chceš rezervačný systém prenajať, implementovať do webu,
            alebo vytvoriť celý web aj so systémom.
          </p>

          <div className="mt-8 space-y-4">
            <ContactItem icon={<Mail size={22} />} title="Email" text="leo.fudaly@gmail.com" />
            <ContactItem icon={<Phone size={22} />} title="Telefón" text="Doplníš neskôr" />
            <ContactItem icon={<MapPin size={22} />} title="Lokalita" text="Slovensko / online" />
          </div>
        </div>

        <div className="rounded-[var(--radius-xl)] bg-[var(--surface)] p-8 shadow-[var(--shadow-card)]">
          <h2 className="text-[var(--heading-size)] font-black">
            Napíš mi správu
          </h2>

          <form
            action="https://formsubmit.co/leo.fudaly@gmail.com"
            method="POST"
            className="mt-6 space-y-4"
          >
            <input type="hidden" name="_subject" value="Nová správa z rezervačného webu" />
            <input type="hidden" name="_captcha" value="false" />

            <Input name="name" placeholder="Tvoje meno" />
            <Input name="email" type="email" placeholder="Tvoj email" />
            <Input name="phone" placeholder="Telefónne číslo" />

            <select
              name="service"
              className="h-[58px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-5 text-[17px] font-semibold text-[var(--text)] outline-none focus:border-[var(--primary)]"
            >
              <option value="">Čo potrebuješ?</option>
              <option value="prenajom-systemu">Prenájom rezervačného systému</option>
              <option value="implementacia">Implementácia do webu</option>
              <option value="web-system">Web + rezervačný systém</option>
            </select>

            <textarea
              name="message"
              rows={5}
              placeholder="Napíš mi viac o projekte..."
              required
              className="w-full resize-none rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-5 py-4 text-[17px] font-semibold text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
            />

            <button
              type="submit"
              className="flex h-[58px] w-full items-center justify-center gap-3 rounded-[var(--radius-md)] bg-[var(--primary)] text-[17px] font-extrabold text-white shadow-[var(--shadow-button)] transition hover:bg-[var(--primary-hover)]"
            >
              Odoslať správu
              <Send size={20} />
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

function Input({ name, placeholder, type = "text" }) {
  return (
    <input
      required
      type={type}
      name={name}
      placeholder={placeholder}
      className="h-[58px] w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-5 text-[17px] font-semibold text-[var(--text)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--primary)]"
    />
  );
}

function ContactItem({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface)] p-4 shadow-sm">
      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-light)] text-[var(--primary)]">
        {icon}
      </div>

      <div>
        <p className="font-bold text-[var(--text)]">{title}</p>
        <p className="text-sm text-[var(--text-secondary)]">{text}</p>
      </div>
    </div>
  );
}