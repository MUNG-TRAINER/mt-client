import CreateCourseInput from "../CreateCourseInput";
import CourseLabelBox from "./common/CourseLabelBox";

export default function CourseTitle() {
  return (
    <CourseLabelBox>
      <label
        htmlFor="title"
        className="before:content-['*'] before:text-sm before:text-red-500 before:mr-1"
      >
        훈련 제목
      </label>
      <CreateCourseInput
        id="title"
        name="title"
        type="text"
        placeholder="훈련 제목"
        required
      />
    </CourseLabelBox>
  );
}
