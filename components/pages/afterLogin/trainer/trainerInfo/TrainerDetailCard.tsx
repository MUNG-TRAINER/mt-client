import Image from "next/image";
import { ITrainerInfoType } from "@/types/trainer/trainerType";
import TagBadges from "@/components/shared/badges/TagBadges";
import { CheckBadgeIcon } from "@/components/icons/badges";

export default function TrainerDetailCard({
  trainer,
}: {
  trainer: ITrainerInfoType;
}) {
  return (
    <section className="space-y-4">
      {/* 경력 사항 */}
      {trainer.careerInfo && (
        <div className="bg-white rounded-lg border border-(--mt-gray-light) p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-(--mt-blue-light) rounded-lg">
              <svg
                className="size-5 text-(--mt-blue-point)"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-(--mt-black)">경력 사항</h3>
          </div>
          <ul className="space-y-2">
            {trainer.careerInfo?.split("-").map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-sm text-(--mt-gray)"
              >
                <span className="text-(--mt-blue-point) mt-1">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 자기소개 */}
      {(trainer.introduce || trainer.description) && (
        <div className="bg-white rounded-lg border border-(--mt-gray-light) p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-(--mt-red-smoke) rounded-lg">
              <svg
                className="size-5 text-(--mt-red-point)"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-(--mt-black)">자기소개</h3>
          </div>
          <p className="text-sm text-(--mt-gray) whitespace-pre-line leading-relaxed">
            {trainer.introduce ?? trainer.description}
          </p>
        </div>
      )}

      {/* 훈련 스타일 */}
      {(trainer.style || trainer.tag) && (
        <div className="bg-white rounded-lg border border-(--mt-gray-light) p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-(--mt-orange-smoke) rounded-lg">
              <svg
                className="size-5 text-(--mt-orange-point)"
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6Z"
                />
              </svg>
            </div>
            <h3 className="font-bold text-(--mt-black)">훈련 스타일</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[trainer.style, trainer.tag].filter(Boolean).map((item, idx) => (
              <TagBadges
                key={idx}
                classNames="bg-(--mt-orange-smoke) text-(--mt-orange-point) text-sm font-medium"
                txt={item}
              />
            ))}
          </div>
        </div>
      )}

      {/* 보유 자격증 */}
      {trainer.certificationImageUrl && (
        <div className="bg-white rounded-lg border border-(--mt-gray-light) p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-(--mt-green-smoke) rounded-lg">
              <CheckBadgeIcon className="size-5 text-(--mt-green-point)" />
            </div>
            <h3 className="font-bold text-(--mt-black)">보유 자격증</h3>
          </div>
          <div className="relative w-full rounded-lg overflow-hidden border border-(--mt-gray-light)">
            <Image
              src={trainer.certificationImageUrl}
              alt="자격증"
              width={600}
              height={400}
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      )}
    </section>
  );
}
