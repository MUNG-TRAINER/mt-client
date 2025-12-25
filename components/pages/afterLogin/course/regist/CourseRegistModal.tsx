"use client";

import {CheckIcon} from "@/components/icons/check";
import {IDogProfileType} from "@/types/dog/dogType";
import { WishlistDogType } from "@/types/wishlist/wishlistType";
import {randomColor} from "@/util/randomColor";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {useCreateWishlist} from "@/hooks/afterLogin/wishlist/useCreateWishlist";
import ConfirmModal from "@/components/pages/afterLogin/wishlist/ConfirmModal";
import { useApplyCourse } from "@/hooks/afterLogin/applications/useApplyCourse";


export default function CourseRegistModal({
  courseId,
  dogs,
  wishlistDogs,
}: {
  courseId: string;
  dogs: IDogProfileType[];
  wishlistDogs: WishlistDogType[];
}) {
  const [id, setId] = useState<number | null>();
  const router = useRouter();
  const [dogColors] = useState(() => randomColor(dogs));

  const handleBack = () => {
    router.back();
  };
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode"); // "apply" | "wishlist"
  const {create} = useCreateWishlist();
  const [confirmOpen, setConfirmOpen] = useState(false);
const [confirmDesc, setConfirmDesc] = useState("");
const [confirmResult, setConfirmResult] =
  useState<"wishlist" | "apply" | null>(null);
  type DogWithCounseling = IDogProfileType & {
    hasCounseling: boolean;
  };
  

  /** dog + 상담여부 */
  const mergedDogs: DogWithCounseling[] = useMemo(() => {
    return dogs.map((dog) => {
      const w = wishlistDogs.find(
        (wd) => wd.dogId === dog.dogId
      );

      return {
        ...dog,
        hasCounseling: w?.hasCounseling ?? false,
      };
    });
  }, [dogs, wishlistDogs]);

const { mutate: applyCourse } = useApplyCourse();
  const handleApply = async () => {
    if (!id) {
      setConfirmDesc("반려견을 선택해주세요.");
      setConfirmOpen(true);
      return;
    }
  
    // 찜하기
    if (mode === "wishlist") {
      try {
        await create({
          courseId: Number(courseId),
          dogId: id,
        });
        setConfirmDesc("찜 목록에 추가되었습니다.");
        setConfirmResult("wishlist");
        setConfirmOpen(true);
      } catch (e) {
        console.error(e);
        setConfirmDesc("찜 처리 중 오류가 발생했습니다.");
        setConfirmOpen(true);
      }
      return;
    }
  
    // 신청
    const selectedDog = mergedDogs.find(
      (dog) => dog.dogId === id
    );
    if (!selectedDog) return;
  
    // 상담 페이지로 넘어가기
    if (!selectedDog.hasCounseling) {
      router.push(
        `/courses/${courseId}/counseling?dogId=${id}`
      );
      return;
    }
  
  // 신청
applyCourse(
  {
    courseId: Number(courseId),
    data: { dogId: id },
  },
  {
    onSuccess: () => {
      setConfirmDesc("수강 신청이 완료되었습니다.");
      setConfirmResult("apply");
      setConfirmOpen(true);
    },
    onError: (e) => {
      console.error(e);

      if (e.message === "ALREADY_APPLIED") {
        setConfirmDesc("이미 신청한 강의입니다.");
      } else {
        setConfirmDesc("신청 중 오류가 발생했습니다.");
      }

      setConfirmResult(null);
      setConfirmOpen(true);
    },
  }
);  
  };
  



  return (
    <div className="absolute left-0 top-0 bg-(--mt-black)/75 w-full h-full z-80 flex flex-col">
      <div
        className="absolute left-0 top-0 w-full h-full"
        onClick={handleBack}
      />
      <div className="absolute bottom-0 bg-(--mt-white) w-full h-[50%] rounded-t-2xl pt-10 px-10 pb-20 flex flex-col items-center gap-5 show_modal">
        <button
          className="w-20 h-1 bg-(--mt-gray) rounded-lg"
          onClick={handleBack}
        />
        <h3 className="text-center font-bold text-xl">수강할 반려견 선택</h3>
        <ul className="w-full h-full">
          {dogs.length < 1 && (
            <li>
              <span className="text-red-500 text-center block">
                등록된 반려견 정보가 없습니다.
              </span>
            </li>
          )}
          {dogs.length > 0 && (
            <li className="w-full h-full">
              <form className="w-full h-full">
                <fieldset className="w-full h-full flex flex-col gap-3">
                  <legend>반려견 수강신청</legend>
                  {dogs.map((val, i) => (
                    <label
                      htmlFor={`${val.dogId}_${val.name}`}
                      key={val.dogId}
                      className="flex items-center gap-5 p-3 rounded-xl bg-(--mt-gray-smoke) shadow"
                    >
                      {val.profileImage ? (
                        <div className="relative size-24 rounded-full overflow-hidden">
                          <Image
                            src={val.profileImage + ""}
                            alt={`${val.name}_프로필사진`}
                            fill
                          />
                        </div>
                      ) : (
                        <div
                          className={`size-24 rounded-full ${dogColors[i]}`}
                        />
                      )}
                      <div>
                        <h4 className="font-bold">{val.name}</h4>
                        <span>{val.age} 살</span>
                      </div>
                      <div className="ml-auto">
                        <button
                          type="button"
                          className={`size-10 rounded-full ${id === val.dogId ? "bg-(--mt-blue)" : "border-3 border-(--mt-gray-point)"}`}
                          onClick={() => setId(val.dogId)}
                        >
                          {id === val.dogId && (
                            <CheckIcon className="text-(--mt-white)" />
                          )}
                        </button>
                        <input
                          id={`${val.dogId}_${val.name}`}
                          type="checkbox"
                          value={val.dogId}
                          name="dogId"
                          defaultChecked={id === val.dogId}
                          hidden
                        />
                      </div>
                      {/* 상담경험 유무 <span>{val.}</span> */}
                    </label>
                  ))}
                </fieldset>
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="bg-(--mt-white) w-full py-4 rounded-md text-xl font-bold text-(--mt-gray) mt-auto shadow text-center border-2 border-(--mt-gray-point)"
                  >
                    취소하기
                  </button>
                  <button className="bg-(--mt-blue) w-full py-4 rounded-md text-xl font-bold text-(--mt-white) mt-auto shadow" type="button" onClick={handleApply}>
                  {mode === "wishlist" ? "찜하기" : "신청하기"}
                  </button>
                </div>
              </form>
            </li>
          )}
        </ul>
        {dogs.length < 1 && (
          <Link
            href={`/mydogs/create`}
            className="text-center  text-(--mt-white) text-lg font-bold bg-(--mt-blue) rounded-md py-4 shadow"
          >
            반려견 등록하기
          </Link>
        )}
      </div>
      <ConfirmModal
  isOpen={confirmOpen}
  description={confirmDesc}
  onClose={() => {
    setConfirmOpen(false);

    if (confirmResult === "wishlist") {
      router.push("/wishlist");
    }

    if (confirmResult === "apply") {
      router.push("/application");
    }
    setConfirmResult(null);
  }}
/>
    </div>
  );
}
