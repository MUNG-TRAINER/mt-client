interface ICourseDogSize {
  dogSize?: string;
}
export default function CourseDogSize({dogSize}: ICourseDogSize) {
  return (
    <div className="flex flex-col gap-1 [&>label]:font-bold w-full">
      <label htmlFor="dogSize">반려견 크기</label>
      <select
        name="dogSize"
        id="dogSize"
        className="w-full p-2 rounded-md bg-(--mt-gray-light) border border-(--mt-gray) text-(--mt-gray)"
        defaultValue={dogSize}
      >
        <option value="SMALL">소형견</option>
        <option value="MEDIUM">중형견</option>
        <option value="LARGE">대형견</option>
        <option value="SMALL, MEDIUM">소형견, 중형견</option>
        <option value="SMALL, LARGE">소형견, 대형견</option>
        <option value="MEDIUM, LARGE">중형견, 대형견</option>
        <option value="ALL">모든 견종</option>
      </select>
    </div>
  );
}
