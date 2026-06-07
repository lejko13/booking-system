import { PageHeader } from "./AdminPage";
import Owerlap from "../component/owerlap";
import CustomCalendar from "../component/CustomCalendar";

export default function WorkingHours() {
  return (
    <>
      <Owerlap />

      <PageHeader label="Dashboard" title="Pracovná doba" button="" />

      <div className="mt-8">
        <CustomCalendar />
      </div>
    </>
  );
}