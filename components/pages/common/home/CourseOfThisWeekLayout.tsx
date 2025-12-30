"use client";
import {ApplicationType} from "@/types/applications/applicationsType";
import {ICourseType} from "@/types/course/courseType";
import {randomColor} from "@/util/randomColor";
import Image from "next/image";
import Link from "next/link";
import locationImage from "@/public/images/application/location.jpg";
type TWeekType =
  | {type: "course"; data: ICourseType[]}
  | {type: "application"; data: ApplicationType[]};
interface ICourseOfThisWeekLayoutProps {
  title: string;
  data: TWeekType;
}

export default function CourseOfThisWeekLayout({
  title,
  data,
}: ICourseOfThisWeekLayoutProps) {
  return (
    <section className="flex flex-col gap-2 mt-2">
      <div>
        <h3 className="font-bold text-[17px]">{title}</h3>
        <p className="text-sm mb-4">다가오는 일정들을 간편하게 확인해요.</p>
      </div>

      <ul className="flex flex-col *:w-full gap-3  *:rounded-lg *:px-5 *:py-3">
        {data.type === "course"
          ? data.data.length < 1 && (
              <span className="text-sm text-(--mt-gray-point)">
                이번 주 훈련은 없습니다.
              </span>
            )
          : data.data.map((v, i, arr) => (
              <li
                key={i}
                className="shadow-md bg-white rounded-lg border border-gray-200"
              >
                <Link
                  href={`/course/${v.courseId}`}
                  className="flex items-stretch gap-4 "
                >
                  {/* 왼쪽: 이미지 */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {v.mainImage ? (
                      <Image
                        src={v.mainImage}
                        alt="메인이미지"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>

                  {/* 오른쪽: 타이틀 + 위치 */}
                  <div className="flex flex-col justify-between flex-1">
                    {/* 상단: 타이틀 */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-md font-semibold">{v.title}</h3>
                      <p className="text-[12px]">{v.description}</p>
                    </div>

                    {/* 하단: 위치 */}
                    <div className="text-sm text-gray-500 w-full justify-end flex">
                      <Image
                        src={locationImage}
                        alt="위치"
                        width={14}
                        height={14}
                        className="w-5 mx-1"
                      />
                      {v.location}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
        {data.type === "application"
          ? data.data.length < 1 && (
              <span className="text-sm text-(--mt-gray) text-center">
                이번 주 교육은 없습니다.
              </span>
            )
          : data.data.map((v, i, arr) => (
              <li
                key={i}
                className="shadow-md bg-white rounded-lg border border-gray-200"
              >
                <Link
                  href={`/course/${v.courseId}`}
                  className="flex items-stretch gap-4 "
                >
                  {/* 왼쪽: 이미지 */}
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    {v.mainImage ? (
                      <Image
                        src={v.mainImage}
                        alt="메인이미지"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300" />
                    )}
                  </div>

                  {/* 오른쪽: 타이틀 + 위치 */}
                  <div className="flex flex-col justify-between flex-1">
                    {/* 상단: 타이틀 */}
                    <div className="flex flex-col gap-1">
                      <h3 className="text-md font-semibold">{v.title}</h3>
                      <p className="text-[12px] text-gray-500">
                        {v.description}
                      </p>
                    </div>

                    {/* 하단: 위치 */}
                    <div className="text-sm text-gray-500 w-full justify-end flex">
                      <Image
                        src={locationImage}
                        alt="위치"
                        width={14}
                        height={14}
                        className="w-5 mx-1"
                      />
                      {v.location}
                    </div>
                  </div>
                </Link>
              </li>
            ))}
      </ul>
    </section>
  );
}
