"use client";

import useDeleteApplication from "@/hooks/afterLogin/applications/useDeleteApplication";
import {useApplicationState} from "@/stores/applicationsState";

const ApplicationsActionButton = () => {
  const {activeTab, selectedIndex} = useApplicationState();
  const {mutate} = useDeleteApplication();
  const handleOnClick = () => {
    return activeTab === "pending" ? mutate(selectedIndex) : () => {};
  };
  return (
    <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-300">
      <button
        className="w-full py-3 rounded-lg bg-(--mt-blue-point) text-white font-semibold hover:bg-blue-600 transition-colors"
        onClick={handleOnClick}
      >
        {activeTab === "pending" ? "취소하기" : "결제하기"}
      </button>
    </div>
  );
};

export default ApplicationsActionButton;
