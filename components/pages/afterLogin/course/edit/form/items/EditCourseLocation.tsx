import CreateCourseInput from "@/components/pages/afterLogin/course/create/CreateCourseInput";
import CourseLabelBox from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseLabelBox";

export default function EditCourseLocation({location}: {location: string}) {
  return (
    <CourseLabelBox>
      <label htmlFor="location">훈련장소</label>
      <CreateCourseInput
        id="location"
        type="text"
        name="location"
        defaultValue={location}
        placeholder="훈련제목을 입력하세요"
      />
    </CourseLabelBox>
  );
}
