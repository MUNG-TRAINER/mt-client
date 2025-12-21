import Image from "next/image";
import Link from "next/link";
import walk_course from "@/public/images/home/walk_course.jpg";
import solo_course from "@/public/images/home/solo_course.jpg";
import group_course from "@/public/images/home/group_course.jpg";
import {Metadata} from "next";
import CourseOfThisWeek from "@/components/pages/common/home/CoureOfThisWeek";

export const metadata: Metadata = {
  title: "홈 | 댕스쿨",
};

export default async function Page() {
  return (
    <div className="flex flex-col gap-4 relative w-full h-full overflow-y-auto px-6">
      <section>
        <Link
          href={"/"}
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
      <section className="flex flex-col gap-2">
        <h3 className="font-dohyeon">개인레슨과 그룹레슨은 댕스쿨</h3>
        <div className="flex justify-between gap-3 *:w-full *:h-52 *:bg-blue-200 *:overflow-hidden *:rounded-lg *:relative *:flex *:justify-center *:items-center **:transition-[filter] **:duration-200 **:ease-in-out">
          <Link href={"/"} className="relative group">
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
          <Link href={"/"} className="relative group">
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
