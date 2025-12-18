import Calendar from "@/components/shared/calendar/Calendar";
import PlanFloatingBtn from "./PlanFloatingBtn";

export default function Plan() {
  return (
    <div className="relative w-full h-full bg-(--mt-white) p-6 rounded-md flex flex-col gap-3 ">
      <Calendar />
      <PlanFloatingBtn />
    </div>
  );
}
