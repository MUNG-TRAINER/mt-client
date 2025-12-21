import Tabs from "@/components/shared/tabs/Tabs";

interface PlanTabsProps {
  activeTab: "scheduled" | "completed";
  setActiveTab: (tab: "scheduled" | "completed") => void;
}

const PlanTabs: React.FC<PlanTabsProps> = ({activeTab, setActiveTab}) => {
  const tabLabels = {
    scheduled: "예정된 훈련",
    completed: "완료된 훈련",
  };

  return (
    <Tabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabLabels={tabLabels}
    />
  );
};

export default PlanTabs;
