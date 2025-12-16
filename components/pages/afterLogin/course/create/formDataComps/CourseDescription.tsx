export default function CourseDescription() {
  return (
    <>
      <label htmlFor="description">훈련 과정 내용</label>
      <textarea
        id="description"
        name="description"
        className="border border-(--mt-gray) bg-(--mt-gray-light) p-3 rounded-md resize-none"
        rows={5}
        placeholder="대략적인 해당 훈련내용을 작성해주세요."
      />
    </>
  );
}
