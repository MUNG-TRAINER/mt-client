import CreateCourseInput from "../CreateCourseInput";

export default function CourseTitle() {
  return (
    <>
      <label htmlFor="title">훈련 제목</label>
      <CreateCourseInput
        id="title"
        name="title"
        type="text"
        placeholder="훈련 제목"
      />
    </>
  );
}
