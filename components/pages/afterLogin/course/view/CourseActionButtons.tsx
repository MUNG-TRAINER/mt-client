import { HeartIcon } from "@/components/icons/courseInfoIcons";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import Link from "next/link";

export default function CourseActionButtons({
  trainerId,
  isClose,
}: {
  trainerId: number;
  isClose: boolean;
}) {
  const { checkIsOwner } = useCheckLoggedIn();
  const isOwner = checkIsOwner(trainerId);
  const disabled = isClose;
  return (
    <div className="sticky mt-5 bottom-0 z-50 flex flex-col gap-3 w-full">
      {isOwner && (
        <div className="flex justify-center gap-3">
          <Link
            href={`/`}
            className="w-full flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors"
          >
            재업로드하기
          </Link>
          {disabled ? (
            <div
              aria-disabled="true"
              className="w-full flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold opacity-50 cursor-not-allowed pointer-events-none"
            >
              수정하기
            </div>
          ) : (
            <Link
              href={`/`}
              className="w-full flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors"
            >
              수정하기
            </Link>
          )}
        </div>
      )}

      <div className="flex justify-center gap-3">
        {disabled ? (
          <div
            aria-disabled="true"
            className="flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold opacity-50 cursor-not-allowed pointer-events-none"
          >
            <HeartIcon className="size-5" />
            찜하기
          </div>
        ) : (
          <Link
            href={`/`}
            className="flex items-center justify-center bg-white gap-2 px-6 py-3 border-2 border-(--mt-gray-light) text-(--mt-gray) rounded-lg font-bold hover:bg-(--mt-gray-smoke) transition-colors"
          >
            <HeartIcon className="size-5" />
            찜하기
          </Link>
        )}
        {disabled ? (
          <div
            aria-disabled="true"
            className="flex-1 flex items-center justify-center py-3 bg-(--mt-blue-point) text-white rounded-lg font-bold shadow-lg opacity-50 cursor-not-allowed pointer-events-none"
          >
            수강 신청
          </div>
        ) : (
          <Link
            href={`/`}
            className="flex-1 flex items-center justify-center py-3 bg-(--mt-blue-point) text-white rounded-lg font-bold hover:bg-(--mt-blue) transition-colors shadow-lg"
          >
            수강 신청
          </Link>
        )}
      </div>
    </div>
  );
}
