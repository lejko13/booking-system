import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export function Sidebar({
  activePage,
  setActivePage,
  menuItems = [],
  title = "Menu",
  bgClass = "bg-green-500",
  desktopWidth = "w-64",
}) {
  const [open, setOpen] = useState(false);

  const handleClick = (id) => {
    setActivePage(id);
    setOpen(false);
  };

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:block ${desktopWidth}  p-6`}
      >
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.id}
              active={activePage === item.id}
              icon={item.icon}
              text={item.text}
              onClick={() => handleClick(item.id)}
            />
          ))}
        </nav>
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-5 right-5 z-50 lg:hidden bg-[var(--primary)]  text-white p-4 rounded-full shadow-lg`}
      >
        <Menu size={24} />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-[var(--primary)]  rounded-t-3xl p-6 shadow-2xl`}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-white font-semibold text-lg">{title}</h2>

                <button
                  onClick={() => setOpen(false)}
                  className="text-white bg-white/20 p-2 rounded-full"
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="grid grid-cols-3 gap-4">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition ${
                        activePage === item.id
                          ? "bg-white text-[var(--primary)]"
                          : "bg-white/15 text-white"
                      }`}
                    >
                      <Icon size={24} />
                      <span className="text-xs font-medium">{item.text}</span>
                    </button>
                  );
                })}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}


function SidebarItem({ icon: Icon, text, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex w-full items-center gap-3 rounded-[var(--radius-md)]
        px-4 py-3 text-left font-bold transition
        ${
          active
            ? "bg-[var(--primary)] text-white"
            : "text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] hover:text-[var(--text)]"
        }
      `}
    >
      <Icon size={20} />
      {text}
    </button>
  );
}