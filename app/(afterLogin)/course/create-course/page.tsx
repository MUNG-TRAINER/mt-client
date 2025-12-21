import CreateCourse from "@/components/pages/afterLogin/course/create/formDataComps/CreateCourse";
import {Metadata} from "next";
export const metadata: Metadata = {
  title: "수업생성하기",
};
export default function page() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <CreateCourse />
    </div>
  );
}
