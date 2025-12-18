"use client";

import Tabs from "@/components/shared/tabs/Tabs";

interface ApplicationsTabsProps {
  activeTab: "pending" | "completed";
  setActiveTab: (tab: "pending" | "completed") => void;
}

const ApplicationsTabs: React.FC<ApplicationsTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabLabels = {
    pending: "승인 전",
    completed: "승인 결과",
  };

  return (
    <Tabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      tabLabels={tabLabels}
    />
  );
};

export default ApplicationsTabs;
