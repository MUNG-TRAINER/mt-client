import CreateCourseInput from "@/components/pages/afterLogin/course/create/CreateCourseInput";
import CourseLabelBox from "@/components/pages/afterLogin/course/create/formDataComps/common/CourseLabelBox";

export default function EditCourseTitle({title}: {title: string}) {
  return (
    <CourseLabelBox>
      <label htmlFor="title">훈련제목</label>
      <CreateCourseInput
        id="title"
        type="text"
        name="title"
        defaultValue={title}
        placeholder="훈련제목을 입력하세요"
      />
    </CourseLabelBox>
  );
}
