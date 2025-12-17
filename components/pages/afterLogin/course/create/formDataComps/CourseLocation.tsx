import CreateCourseInput from "../CreateCourseInput";
import CourseLabelBox from "./common/CourseLabelBox";

export default function CourseLocation() {
  return (
    <CourseLabelBox>
      <label htmlFor="location">훈련 장소</label>
      <CreateCourseInput
        id="location"
        name="location"
        type="text"
        placeholder="훈련 장소"
      />
    </CourseLabelBox>
  );
}
