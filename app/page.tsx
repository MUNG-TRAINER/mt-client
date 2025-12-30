import Image from "next/image";
import Link from "next/link";
import walk_course from "@/public/images/home/mainimage3.jpg";
import solo_course from "@/public/images/home/solo_course.jpg";
import group_course from "@/public/images/home/group_course.jpg";
import dog_main from "@/public/images/home/dog_image.png";
import {Metadata} from "next";
import CourseOfThisWeek from "@/components/pages/common/home/CoureOfThisWeek";

export const metadata: Metadata = {
  title: "홈",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 relative w-full h-full overflow-y-auto px-6">
      <section>
        <div className="flex justify-between gap-1 mt-10 mb-15 items-end ">
          <div>
            <h2 className="text-(--mt-blue-point) text-[26px] font-bold mb-2">
              날씨 좋은 날,
            </h2>
            <h2 className="text-[26px] font-bold mb-2 ">반려견과 함께</h2>
            <h2 className="text-[26px] font-bold mb-5">나가볼까요?</h2>
            <p className="break-keep items-end mt-12">
              가벼운 산책부터 훈련으로 이어지는 하루를 시작해요.
            </p>
          </div>
          <div>
            <Image src={dog_main} alt="반려견 일러스트" placeholder="blur" />
            <Link href="/course/search">
              <button className="bg-(--mt-blue-point) text-(--mt-white) w-full p-2 rounded-lg mt-10">
                훈련 보러 가기
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section>
        <Link
          href="/course/search?lessonForm=WALK"
          className="relative w-full h-80 flex rounded-lg overflow-hidden group"
        >
          <div className="relative brightness-80 group-hover:brightness-100 transition-[filter] duration-200 ease-in-out w-full h-full">
            <Image
              src={walk_course}
              alt="무료산책홍보이미지"
              fill
              placeholder="blur"
            />
          </div>
          <div className="absolute right-0 bottom-0 flex flex-col justify-end items-end *:text-(--mt-white) px-4 py-3 transition-transform duration-200 ease-in-out group-hover:translate-x-100">
            <p className="text-lg font-bold">무료산책모임</p>
            <p className="text-sm font-bold">반려견 무료 산책 모임</p>
          </div>
        </Link>
      </section>
      <section className="flex flex-col mt-7 mb-5">
        <h3 className="font-bold text-[17px]">함께 만드는 훈련 시간</h3>
        <p className="text-sm mb-2">
          우리아이에게 맞는 훈련을 멍스쿨에서 찾아보세요.
        </p>
        <div className="flex justify-between gap-3 *:w-full *:h-52 *:bg-blue-200 *:overflow-hidden *:rounded-lg *:relative *:flex *:justify-center *:items-center **:transition-[filter] **:duration-200 **:ease-in-out">
          <Link
            href="/course/search?lessonForm=PRIVATE"
            className="relative group"
          >
            <Image
              src={solo_course}
              alt="개인 레슨 로고"
              className="brightness-80 group-hover:brightness-100"
              fill
              placeholder="blur"
              sizes="200"
            />
            <h4 className="absolute text-(--mt-white) font-bold group-hover:opacity-0">
              개인 레슨
            </h4>
          </Link>
          <Link
            href="/course/search?lessonForm=GROUP"
            className="relative group"
          >
            <Image
              src={group_course}
              alt="그룹 레슨 로고"
              className="brightness-80 group-hover:brightness-100"
              fill
              placeholder="blur"
              sizes="200"
            />
            <h4 className="absolute text-(--mt-white) font-bold group-hover:opacity-0">
              그룹 레슨
            </h4>
          </Link>
        </div>
      </section>
      <CourseOfThisWeek />
    </div>
  );
}
