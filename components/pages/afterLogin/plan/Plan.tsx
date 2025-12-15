"use client";
import Calendar from "@/components/shared/calendar/Calendar";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import PlanFloatingBtn from "./PlanFloatingBtn";

export default function Plan() {
  const {data} = useCheckLoggedIn();
  return (
    <div className="relative w-full h-full bg-(--mt-white) p-6 rounded-md flex flex-col gap-3 ">
      <Calendar />
      <PlanFloatingBtn role={data?.role} />
    </div>
  );
}
