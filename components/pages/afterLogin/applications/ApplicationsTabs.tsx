"use client";

interface ApplicationsTabsProps {
  activeTab: "pending" | "completed";
  setActiveTab: (tab: "pending" | "completed") => void;
}

const ApplicationsTabs: React.FC<ApplicationsTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <div className="flex border-b border-gray-300 sticky top-0 bg-white z-10">
      <button
        onClick={() => setActiveTab("pending")}
        className={`w-1/2 py-2 font-semibold ${
          activeTab === "pending"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500"
        }`}
      >
        승인 전
      </button>
      <button
        onClick={() => setActiveTab("completed")}
        className={`w-1/2 py-2 font-semibold ${
          activeTab === "completed"
            ? "border-b-2 border-blue-500 text-blue-500"
            : "text-gray-500"
        }`}
      >
        승인 결과
      </button>
    </div>
  );
};

export default ApplicationsTabs;
