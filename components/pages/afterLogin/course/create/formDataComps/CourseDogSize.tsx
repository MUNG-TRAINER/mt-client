export default function CourseDogSize() {
  return (
    <>
      <label htmlFor="dogSize">반려견 크기</label>
      <select
        name="dogSize"
        id="dogSize"
        className="w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) text-(--mt-gray)"
      >
        <option value="-">소 / 중 / 대</option>
        <option value="소">소</option>
        <option value="중">중</option>
        <option value="대">대</option>
      </select>
    </>
  );
}
