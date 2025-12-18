import CreateCourseInput from "../CreateCourseInput";
import CourseLabelBox from "./common/CourseLabelBox";
interface ICourseLocation {
  labelTxt: string;
  inputName: string;
  placeholder: string;
}
export default function CourseLocation({
  inputName,
  labelTxt,
  placeholder,
}: ICourseLocation) {
  return (
    <CourseLabelBox>
      <label htmlFor={inputName}>{labelTxt}</label>
      <CreateCourseInput
        id={inputName}
        name={inputName}
        type="text"
        placeholder={placeholder}
      />
    </CourseLabelBox>
  );
}
