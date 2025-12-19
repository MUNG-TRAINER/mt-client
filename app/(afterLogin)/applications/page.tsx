"use client";

import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import Application from "@/components/pages/afterLogin/applications/Application";
import {useApplications} from "@/hooks/afterLogin/applications/useApplications";

const ApplicationsPage = () => {
  const {isPending} = useApplications();

  if (isPending) {
    return <LoadingSpinner message="신청 내역을 불러오는 중..." size="md" />;
  }

  return <Application />;
};

export default ApplicationsPage;
