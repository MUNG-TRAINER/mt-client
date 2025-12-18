"use client";

import ApplicationCard from "./ApplicationCard";
import ApplicationsTabs from "./ApplicationsTabs";
import ApplicationsActionButton from "./ActionButton";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";
import {useApplicationState} from "@/stores/applicationsState";

const Applications = () => {
  const {selectedIndex} = useApplicationState();
  const {applicationsToShow} = useApplications();

  return (
    <div className="flex flex-col w-full h-full">
      <ApplicationsTabs />
      <ul className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {applicationsToShow.map((app) => (
          <ApplicationCard
            key={app.applicationId}
            app={app}
            isSelected={selectedIndex.includes(app.applicationId)}
          />
        ))}
      </ul>
      <ApplicationsActionButton />
    </div>
  );
};

export default Applications;
