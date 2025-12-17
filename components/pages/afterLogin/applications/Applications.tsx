"use client";

import ApplicationCard from "./ApplicationCard";
import ApplicationsTabs from "./ApplicationsTabs";
import ApplicationsActionButton from "./ActionButton";
import {ApplicationType} from "@/types/applications/applicationsType";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";

interface ApplicationsProps {
  initialData: ApplicationType[];
}

const Applications: React.FC<ApplicationsProps> = ({initialData}) => {
  const {
    activeTab,
    setActiveTab,
    applicationsToShow,
    selectedIds,
    toggleSelect,
    handleAction,
  } = useApplications(initialData);

  return (
    <div className="flex flex-col w-full h-full">
      <ApplicationsTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <ul className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {applicationsToShow.map((app) => (
          <ApplicationCard
            key={app.applicationId}
            app={app}
            onSelect={toggleSelect}
            isSelected={selectedIds.includes(app.applicationId)}
          />
        ))}
      </ul>

      <ApplicationsActionButton activeTab={activeTab} onClick={handleAction} />
    </div>
  );
};

export default Applications;
