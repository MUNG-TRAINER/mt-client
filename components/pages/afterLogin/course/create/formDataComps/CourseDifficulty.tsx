interface ICoureDifficulty {
  difficulty?: string;
}
export default function CourseDifficulty({difficulty}: ICoureDifficulty) {
  return (
    <div className="flex flex-col gap-1 [&>label]:font-bold w-full">
      <label htmlFor="difficulty">난이도</label>
      <select
        name="difficulty"
        id="difficulty"
        className="w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) text-(--mt-gray)"
        defaultValue={difficulty}
      >
        <option value="EXPERT">상</option>
        <option value="BASIC">하</option>
        <option value="STANDARD">중</option>
      </select>
    </div>
  );
}
