import CreateCourseInput from "../CreateCourseInput";

export default function CourseCapacity() {
  return (
    <>
      <label htmlFor="capacity">제한 인원</label>
      <CreateCourseInput
        id="capacity"
        name="capacity"
        type="text"
        placeholder="제한 인원"
      />
    </>
  );
}
