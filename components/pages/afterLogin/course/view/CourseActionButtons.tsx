import { HeartIcon } from "@/components/icons/courseInfoIcons";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";

export default function CourseActionButtons({
  trainerId,
}: {
  trainerId: number;
}) {
  const { data } = useCheckLoggedIn();
  return (
    <div className="sticky bottom-0 z-50 flex flex-col gap-3 w-full">
      {data?.userId === trainerId && (
        <div>
          <button className="w-full flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors">
            수정하기
          </button>
          <button className="w-full flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors">
            재업로드하기
          </button>
        </div>
      )}

      <div className="flex gap-3">
        <button className="flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors">
          <HeartIcon className="size-5" />
          찜하기
        </button>
        <button className="flex-1 py-3 bg-(--mt-blue-point) text-white rounded-lg font-bold hover:bg-(--mt-blue) transition-colors shadow-lg">
          수강 신청
        </button>
      </div>
    </div>
  );
}
