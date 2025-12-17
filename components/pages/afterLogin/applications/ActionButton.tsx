"use client";

interface ApplicationsActionButtonProps {
  activeTab: "pending" | "completed";
  onClick: () => void;
}

const ApplicationsActionButton: React.FC<ApplicationsActionButtonProps> = ({
  activeTab,
  onClick,
}) => {
  return (
    <div className="sticky bottom-0 w-full p-4 bg-white border-t border-gray-300">
      <button
        className="w-full py-3 rounded-lg bg-(--mt-blue-point) text-white font-semibold hover:bg-blue-600 transition-colors"
        onClick={onClick}
      >
        {activeTab === "pending" ? "취소하기" : "결제하기"}
      </button>
    </div>
  );
};

export default ApplicationsActionButton;
