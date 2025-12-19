import Image from "next/image";
import Link from "next/link";
import TagBadges from "@/components/shared/badges/TagBadges";
import {UserIcon} from "@/components/icons/user";
import {ITrainerInfoType} from "@/types/trainer/trainerType";

export default function TrainerInfoCard({
  trainer,
}: {
  trainer?: ITrainerInfoType;
}) {
  return (
    <div className="rounded-lg bg-(--mt-blue-smoke) p-3">
      <Link
        href={`/trainer/${trainer?.trainerId}`}
        className="flex items-start gap-3 hover:opacity-80 transition-opacity"
      >
        <div className="relative size-12 rounded-full overflow-hidden bg-(--mt-blue-light) border-2 border-(--mt-blue-point) shrink-0">
          {trainer?.profileImage ? (
            <Image
              src={trainer.profileImage}
              alt={trainer.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full">
              <UserIcon className="size-6 text-(--mt-blue-point)" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-(--mt-black) mb-1">
            {trainer?.name} 훈련사
          </h3>
          <p className="text-sm text-(--mt-gray) line-clamp-2">
            {trainer?.introduce || trainer?.description}
          </p>
          {trainer?.careerInfo && (
            <ul className="mt-2 space-y-1">
              {trainer.careerInfo
                .split("-")
                .slice(0, 2)
                .map((career, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-(--mt-gray) flex items-start gap-1"
                  >
                    <span className="text-(--mt-blue-point)">•</span>
                    <span>{career.trim()}</span>
                  </li>
                ))}
            </ul>
          )}
          {trainer?.tag && trainer.tag.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {trainer.tag.split(",").map((tagElement, idx) => (
                <TagBadges
                  key={idx}
                  classNames="bg-(--mt-orange-smoke) text-(--mt-orange-point) text-sm font-bold"
                  txt={`#${tagElement.trim()}`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
