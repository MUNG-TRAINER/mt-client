import {CheckCircleIcon} from "@/components/icons/check";
import {InformationCircleIcon} from "@/components/icons/info";

export default function CounselBadge({counselState}: {counselState: boolean}) {
  return <Badge counselState={counselState} />;
}

function Badge({counselState}: {counselState: boolean}) {
  return (
    <p className="flex gap-1 text-sm bg-(--mt-gray-smoke) px-2 py-1 rounded-lg">
      <i className="size-5">
        {counselState ? (
          <CheckCircleIcon className="text-(--mt-blue-point)" />
        ) : (
          <InformationCircleIcon className="text-(--mt-gray-point)" />
        )}
      </i>
      {counselState ? "상담 경험 있음" : "상담 경험 없음"}
    </p>
  );
}
