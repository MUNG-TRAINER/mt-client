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
      <label
        htmlFor={inputName}
        className="before:content-['*'] before:text-sm before:text-red-500 before:mr-1"
      >
        {labelTxt}
      </label>
      <CreateCourseInput
        id={inputName}
        name={inputName}
        type="text"
        placeholder={placeholder}
        required
      />
    </CourseLabelBox>
  );
}
