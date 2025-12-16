import CreateCourseInput from "../CreateCourseInput";

export default function CourseLocation() {
  return (
    <>
      <label htmlFor="location">훈련 장소</label>
      <CreateCourseInput
        id="location"
        name="location"
        type="text"
        placeholder="훈련 장소"
      />
    </>
  );
}
