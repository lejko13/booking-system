import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, X } from "lucide-react";
import { supabase } from "../lib/supabase";
import PricePicker from '../component/vyber'
import { PageHeader } from "./AdminPage";
import {PRICE_OPTIONS,DURATION_OPTIONS} from '../data/info'

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",

    price: "",
    duration_minutes: "",
  });

  useEffect(() => {
    getServices();
  }, []);

  async function getServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setServices(data || []);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.price || !form.duration_minutes) return;

    const serviceData = {
      name: form.name,
  
      price: Number(form.price),
      duration_minutes: Number(form.duration_minutes),
    };

    if (editingId) {
      const { error } = await supabase
        .from("services")
        .update(serviceData)
        .eq("id", editingId);

      if (error) {
        console.error(error);
        return;
      }
    } else {
      const { error } = await supabase.from("services").insert([
        {
          ...serviceData,
          is_active: true,
        },
      ]);

      if (error) {
        console.error(error);
        return;
      }
    }

    setForm({
      name: "",
 
      price: "",
      duration_minutes: "",
    });

    setEditingId(null);
    getServices();
  }

  async function deleteService(id) {
    const { error } = await supabase.from("services").delete().eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    getServices();
  }

  function editService(service) {
    setEditingId(service.id);

    setForm({
      name: service.name || "",

      price: service.price || "",
      duration_minutes: service.duration_minutes || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({
      name: "",

      price: "",
      duration_minutes: "",
    });
  }

  async function toggleActive(service) {
    const { error } = await supabase
      .from("services")
      .update({
        is_active: !service.is_active,
      })
      .eq("id", service.id);

    if (error) {
      console.error(error);
      return;
    }

    getServices();
  }

  const inputClass =
    "w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] px-4 py-3 font-bold text-[var(--text)] outline-none transition focus:border-[var(--primary)]";

  return (
    <div className=" grid gap-6 text-[var(--text)] ">
      <PageHeader label="Dashboard" title="Sluzby" button="" />

      <form
        onSubmit={handleSubmit}
        className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-extrabold text-[var(--primary)]">Služby</p>
            <h2 className="text-[var(--heading-size)] font-black leading-none">
              {editingId ? "Upraviť službu" : "Nová služba"}
            </h2>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] p-3 text-[var(--text-secondary)] transition hover:text-[var(--text)]"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="mt-6 space-y-4">
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
            placeholder="Názov služby"
          />

     

         <PricePicker
         podmienka = {() => console.log("koko")
         }
            value={form.price}
            znak = "€"
            onChange={(price) =>
                setForm({
                ...form,
                price,
                })
            }
            options={PRICE_OPTIONS}
            placeholder="Cena €"
            />

            <PricePicker
            znak = "min"
            value={form.duration_minutes}
            onChange={(duration) =>
                setForm({
                ...form,
                duration_minutes: duration,
                })
            }
            options={DURATION_OPTIONS }
            placeholder="Trvanie v minútach"
            />

          <button className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-full)] bg-[var(--primary)] px-6 py-3 font-bold text-[var(--text-white)] shadow-[var(--shadow-button)] transition hover:bg-[var(--primary-hover)]">
            <Plus size={18} />
            {editingId ? "Uložiť zmeny" : "Vytvoriť službu"}
          </button>
        </div>
      </form>

      <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--surface)] p-6 shadow-[var(--shadow-card)]">
        <div>
          <p className="font-extrabold text-[var(--primary)]">Manažment</p>
          <h2 className="text-[var(--heading-size)] font-black leading-none">
            Zoznam služieb
          </h2>
        </div>

        <div className="mt-6 space-y-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="grid gap-4 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] p-4 md:grid-cols-[1fr_0.3fr_0.3fr_0.4fr_auto]"
            >
              <div className="h-full w-full  flex items-center">
                <p className="font-black text-[var(--text)]">
                  {service.name}
                </p>
                
              </div>

              <div className="">
                <p className="text-sm font-bold text-[var(--text-secondary)]">
                  Cena
                </p>
                <p className="font-black text-[var(--text)]">
                  {service.price} €
                </p>
              </div>

              <div>
                <p className="text-sm font-bold text-[var(--text-secondary)]">
                  Trvanie
                </p>
                <p className="font-black text-[var(--text)]">
                  {service.duration_minutes} min
                </p>
              </div>

              <button
                type="button"
                onClick={() => toggleActive(service)}
                className={`rounded-[var(--radius-full)] border px-4 py-2 text-sm font-bold transition ${
                  service.is_active
                    ? "border-[var(--primary-border)] bg-[var(--primary-light)] text-[var(--primary)]"
                    : "border-[var(--danger-border)] bg-[var(--danger-light)] text-[var(--danger-dark)]"
                }`}
              >
                {service.is_active ? "Aktívna" : "Neaktívna"}
              </button>

              <div className="flex gap-2">
               <button
                    type="button"
                    onClick={() => editService(service)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-border)] bg-[var(--primary-light)] text-[var(--primary)] transition hover:bg-[var(--surface)]"
                    >
                    <Pencil size={18} />
                    </button>

                    <button
                    type="button"
                    onClick={() => deleteService(service.id)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--danger-border)] bg-[var(--danger-light)] text-[var(--danger-dark)] transition hover:bg-[var(--surface)]"
                    >
                    <Trash2 size={18} />
                    </button>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <p className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--surface-secondary)] p-5 font-bold text-[var(--text-secondary)]">
              Zatiaľ nemáš vytvorenú žiadnu službu.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}