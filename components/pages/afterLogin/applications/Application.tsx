"use client";

import ApplicationCard from "./ApplicationCard";
import ApplicationsTabs from "./ApplicationTabs";
import ApplicationsActionButton from "./ActionButton";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";

const Applications = () => {
  const {applicationsToShow, selectedIndex} = useApplications();
  return (
    <div className="flex flex-col w-full h-full bg-white ">
      <ApplicationsTabs />
      {applicationsToShow.length < 1 ? (
        <div className=" w-full text-align-center flex flex-col items-center justify-center h-[70vh] gap-4">
          <p className="text-gray-500 font-medium">신청 내역이 없습니다.</p>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
          {applicationsToShow.map((app) => (
            <ApplicationCard
              key={app.applicationId}
              app={app}
              isSelected={selectedIndex.includes(app.applicationId)}
            />
          ))}
        </ul>
      )}

      <ApplicationsActionButton />
    </div>
  );
};

export default Applications;
