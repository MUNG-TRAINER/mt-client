"use client";

import {CheckIcon} from "@/components/icons/check";
import {IDogListType} from "@/types/dog/dogType";
import {randomColor} from "@/util/randomColor";
import Image from "next/image";
import Link from "next/link";
import {Dispatch, FormEvent, SetStateAction, useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {useCreateWishlist} from "@/hooks/afterLogin/wishlist/useCreateWishlist";
import ConfirmModal from "@/components/pages/afterLogin/wishlist/ConfirmModal";
import {useApplyCourse} from "@/hooks/afterLogin/applications/useApplyCourse";
import {useWishlistDogs} from "@/hooks/afterLogin/wishlist/useWishlistDogs";
import {useFCMState} from "@/stores/fcm/fcmState";
import {fcmApi} from "@/apis/fcm/fcmApi";

export default function CourseRegistModal({
  trainerId,
  trainerToken,
  courseId,
  dogs,
  mode,
  modalOff,
}: {
  trainerId: number;
  trainerToken: string;
  courseId: string;
  dogs: IDogListType | undefined;
  mode: "wishlist" | "apply" | null;
  modalOff: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  //states
  const [id, setId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const [dogColors] = useState(() => dogs && randomColor(dogs));
  //zustand
  const {setUserId, setTrainerToken} = useFCMState();

  const handleBack = () => {
    // animate close then call modalOff
    setOpen(false);
    setTimeout(() => modalOff(false), 300);
  };

  useEffect(() => {
    // prevent background scroll while modal open
    document.body.style.overflow = "hidden";
    // slight delay to trigger enter animation
    const t = setTimeout(() => setOpen(true), 10);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmDesc, setConfirmDesc] = useState("");
  const [confirmResult, setConfirmResult] = useState<
    "wishlist" | "apply" | null
  >(null);

  const {create} = useCreateWishlist();
  const {mutate: applyCourse} = useApplyCourse();
  const {dogs: wishlistDogs} = useWishlistDogs();

  const handleApply = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!id) {
      setConfirmDesc("반려견을 선택해주세요.");
      setConfirmOpen(true);
      return;
    }

    // 중복 체크: 찜내역
    if (mode === "wishlist") {
      try {
        // 찜내역 가져오기
        let wishlist = [];
        try {
          const res = await fetch("/api/wishlist", {
            method: "GET",
            headers: {"Content-Type": "application/json"},
          });
          if (res.ok) {
            const json = await res.json();
            wishlist = Array.isArray(json.data)
              ? json.data
              : json.data?.data || [];
          }
        } catch {}
        // 타입 명시: WishlistType
        interface WishlistType {
          courseId: number;
          dogId: number;
          // ... 기타 필요한 필드
        }
        const isDuplicate = (wishlist as WishlistType[]).some(
          (w) => w.courseId === Number(courseId) && w.dogId === id,
        );
        if (isDuplicate) {
          setConfirmDesc("이미 찜한 강의입니다.");
          setConfirmOpen(true);
          return;
        }
        await create({
          courseId: Number(courseId),
          dogId: id,
        });
        setConfirmDesc("찜 목록에 추가되었습니다.");
        setConfirmResult("wishlist");
        setConfirmOpen(true);
        router.push("/wishlist");
      } catch (e) {
        console.error(e);
        setConfirmDesc("이미 찜한 강의입니다.");
        setConfirmOpen(true);
      }
      return;
    }

    // 신청내역 중복 체크
    let applications = [];
    try {
      const res = await fetch("/api/application/list", {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      if (res.ok) {
        const json = await res.json();
        applications = Array.isArray(json.data)
          ? json.data
          : json.data?.data || [];
      }
    } catch {}
    console.log("신청내역:", applications);
    // 타입 명시: ApplicationType
    interface ApplicationType {
      courseId: number;
      dogId: number;
      applicationStatus: string;
      // ... 기타 필요한 필드
    }
    const isAlreadyApplied = (applications as ApplicationType[]).some(
      (app) =>
        app.courseId === Number(courseId) &&
        app.dogId === id &&
        ["APPLIED", "WAITING", "ACCEPT", "PAID"].includes(
          String(app.applicationStatus),
        ),
    );
    if (isAlreadyApplied) {
      setConfirmDesc("이미 신청한 강의입니다.");
      setConfirmOpen(true);
      return;
    }

    // 신청
    const selectedDog = dogs && dogs.find((dog) => dog.dogId === id);
    if (!selectedDog) return;

    // 상담 여부 확인
    const selectedWishlistDog = wishlistDogs?.find((wd) => wd.dogId === id);

    const hasCounseling = selectedWishlistDog?.hasCounseling === true;

    if (!hasCounseling) {
      // 상담 안 된 강아지는 상담 안내 모달 띄우고 이동
      setConfirmDesc("상담이 안된 반려견입니다. 상담페이지로 이동합니다.");
      setConfirmOpen(true);
      setUserId(Number(trainerId));
      setTrainerToken(trainerToken);
      setTimeout(() => {
        setConfirmOpen(false);
        router.push(`/counseling/create/${id}`);
      }, 1500);
      return;
    }
    // 신청
    applyCourse(
      {
        courseId: Number(courseId),
        data: {dogId: id},
      },
      {
        onSuccess: async () => {
          setConfirmDesc("수강 신청이 완료되었습니다.");
          setConfirmResult("apply");
          await fcmApi.sendFCMMsg({
            userId: trainerId,
            title: `${selectedDog.name}의 수강신청이 도착했어요.`,
            msgBody: `${selectedDog.name}의 수강신청이 도착했어요.`,
            desc: `${selectedDog.name}의 상담신청이 도착했어요.`,
            url: `/trainer/applications`,
            token: trainerToken ?? "",
          });
          setConfirmOpen(true);
          router.push("/applications");
        },
        onError: (e) => {
          console.error(e);
          if (e.message === "ALREADY_APPLIED") {
            setConfirmDesc("이미 신청한 강의입니다.");
          } else {
            // 백엔드에서 전달된 에러 메시지를 그대로 표시
            setConfirmDesc(e.message || "신청 중 오류가 발생했습니다.");
          }

          setConfirmResult(null);
          setConfirmOpen(true);
        },
      },
    );
  };

  return (
    <div className="absolute inset-0 z-70">
      {/* overlay */}
      <div
        onClick={handleBack}
        className={`absolute inset-0 bg-(--mt-black)/75 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        style={{zIndex: 1}}
      />
      {/* 중앙 모달 */}
      <div
        className={`show_modal absolute bottom-0 z-10 bg-white rounded-t-2xl shadow-2xl pt-10 px-8 pb-6 flex flex-col items-center gap-6 w-full h-56 transition-transform duration-300 ease-in-out ${
          open
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        style={{height: "auto"}}
      >
        <button
          className="w-20 h-1 bg-(--mt-gray) rounded-lg"
          onClick={handleBack}
        />
        <h3 className="text-center font-bold text-xl">수강할 반려견 선택</h3>
        <ul className="w-full flex-1 mb-5 p-2 overflow-y-auto">
          {dogs && dogs.length < 1 && (
            <li>
              <span className="text-red-500 text-center block">
                등록된 반려견 정보가 없습니다.
              </span>
            </li>
          )}
          {dogs && dogs.length > 0 && (
            <li className="w-full h-full  ">
              <form
                onSubmit={handleApply}
                className="w-full h-full flex flex-col"
              >
                <fieldset className="w-full flex-1 flex flex-col gap-3 overflow-y-auto pb-4">
                  <legend>반려견 수강신청</legend>
                  {dogs &&
                    dogs.map((val, i) => (
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
                            className={`size-24 rounded-full ${dogColors![i]}`}
                          />
                        )}
                        <div>
                          <h4 className="font-bold">{val.name}</h4>
                          <span>{val.age} 살</span>
                        </div>
                        <div className="ml-auto">
                          <button
                            type="button"
                            className={`size-10 rounded-full ${
                              id === val.dogId
                                ? "bg-(--mt-blue)"
                                : "border-3 border-(--mt-gray-point)"
                            }`}
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
                      </label>
                    ))}
                </fieldset>
                <div className="flex items-center gap-3 w-full shrink-0 mt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-(--mt-white) w-full py-4 rounded-md text-xl font-bold text-(--mt-gray) mt-auto shadow text-center border-2 border-(--mt-gray-point)"
                  >
                    취소하기
                  </button>
                  <button
                    className="bg-(--mt-blue) w-full py-4 rounded-md text-xl font-bold text-(--mt-white) mt-auto shadow"
                    type="submit"
                  >
                    {mode === "wishlist" ? "찜하기" : "신청하기"}
                  </button>
                </div>
              </form>
            </li>
          )}
        </ul>
        {dogs && dogs.length < 1 && (
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
            // 모달 닫고 이동
            setTimeout(() => router.push("/wishlist"), 0);
          }

          if (confirmResult === "apply") {
            setTimeout(() => router.push("/applications"), 0);
          }

          setConfirmResult(null);
        }}
      />
    </div>
  );
}
