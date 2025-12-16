export default function CourseDifficulty() {
  return (
    <>
      <label htmlFor="difficulty">난이도</label>
      <select
        name="difficulty"
        id="difficulty"
        className="w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) text-(--mt-gray)"
      >
        <option value="-">상 / 중 / 하</option>
        <option value="상">상</option>
        <option value="중">중</option>
        <option value="하">하</option>
      </select>
    </>
  );
}
