import {ChevronLeftIcon, ChevronRightIcon} from "@/components/icons/chevron";

interface ICourseCountBtn {
  disabled: boolean;
  plusFn: () => void;
  minusFn: () => void;
}
export default function CourseCountBtn({
  disabled,
  minusFn,
  plusFn,
}: ICourseCountBtn) {
  return (
    <div
      className={`flex gap-3 items-center  *:p-2 *:rounded-lg ${
        disabled
          ? "*:bg-(--mt-gray-light)"
          : "*:bg-(--mt-blue-point) *:text-(--mt-white)"
      }`}
    >
      <button type="button" onClick={minusFn} disabled={disabled}>
        <ChevronLeftIcon className="size-5" />
      </button>
      <button type="button" onClick={plusFn} disabled={disabled}>
        <ChevronRightIcon className="size-5" />
      </button>
    </div>
  );
}
