import CreateCourseInput from "../CreateCourseInput";

export default function CourseSchedule() {
  return (
    <>
      <label htmlFor="schedule">일자</label>
      <CreateCourseInput
        id="schedule"
        name="schedule"
        type="date"
        placeholder="일자"
      />
    </>
  );
}
