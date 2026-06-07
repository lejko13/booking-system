import { createContext, useContext, useState } from "react";

const WorkingHoursContext = createContext();

export function WorkingHoursProvider({ children }) {
  const [state, setState] = useState(false);

  const [open, setOpen] = useState(false);

  const [popup, setPopup] = useState({
    isOpen: false,
    message: "",
    type: "info",
  });

  const [warningModal, setWarningModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  return (
    <WorkingHoursContext.Provider
      value={{
        state,
        setState,
        open,
        setOpen,
        popup,
        setPopup,
        warningModal,
        setWarningModal,
      }}
    >
      {children}
    </WorkingHoursContext.Provider>
  );
}

export function useWorkingHours() {
  return useContext(WorkingHoursContext);
}