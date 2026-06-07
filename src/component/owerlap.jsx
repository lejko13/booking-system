import { useWorkingHours } from "../context/WorkingHoursProvider";

export default function Owerlap() {
  const { state, setState ,open, setOpen} = useWorkingHours();

  if (!state) return null;

  return (
    <>
    {state && <div
      onClick={() => {setState(false),setOpen(false)}}
      className="
        fixed
        inset-0
        top-0
        z-50
        bg-black/50
        backdrop-blur-sm
      "
    />}
    
    </>
  );
}