import CreateCourseInput from "../CreateCourseInput";
import CourseLabelBox from "./common/CourseLabelBox";

export default function CourseItems() {
  return (
    <CourseLabelBox>
      <label htmlFor="items">준비물</label>
      <CreateCourseInput
        id="items"
        name="items"
        type="text"
        placeholder="준비물을 입력해주세요"
      />
    </CourseLabelBox>
  );
}
