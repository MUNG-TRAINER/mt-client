import CreateCourseInput from "../CreateCourseInput";

export default function CourseItems() {
  return (
    <>
      <label htmlFor="items">준비물</label>
      <CreateCourseInput
        id="items"
        name="items"
        type="text"
        placeholder="일자"
      />
    </>
  );
}
