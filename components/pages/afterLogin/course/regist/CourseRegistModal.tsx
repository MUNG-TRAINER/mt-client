"use client";

import {CheckIcon} from "@/components/icons/check";
import {IDogProfileType} from "@/types/dog/dogType";
import {randomColor} from "@/util/randomColor";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {useState} from "react";

export default function CourseRegistModal({
  courseId,
  dogs,
}: {
  courseId: string;
  dogs: IDogProfileType[];
}) {
  const [id, setId] = useState<number | null>();
  const router = useRouter();
  const [dogColors] = useState(() => randomColor(dogs));

  const handleBack = () => {
    router.back();
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
                  <button className="bg-(--mt-blue) w-full py-4 rounded-md text-xl font-bold text-(--mt-white) mt-auto shadow">
                    신청하기
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
    </div>
  );
}
