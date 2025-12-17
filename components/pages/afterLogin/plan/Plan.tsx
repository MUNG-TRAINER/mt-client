"use client";
import Calendar from "@/components/shared/calendar/Calendar";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import PlanFloatingBtn from "./PlanFloatingBtn";
import {useState} from "react";
import PlanTabs from "./PlanTabs";

export default function Plan() {
  const {data} = useCheckLoggedIn();
  const [activeTab, setActiveTab] = useState<"scheduled" | "completed">(
    "scheduled"
  );

  return (
    <div className="relative w-full h-full bg-(--mt-white) p-6 rounded-md flex flex-col gap-3 ">
      <Calendar />
      <div className="text-[18px] font-semibold mt-5 mb-5">
        나의 훈련 전체 보기
      </div>
      <PlanTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <PlanFloatingBtn role={data?.role} />
    </div>
  );
}
