"use client";

import Tabs from "@/components/shared/tabs/Tabs";
import {useApplicationState} from "@/stores/applicationsState";

const ApplicationsTabs = () => {
  const {activeTab, setActiveTab} = useApplicationState();
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
