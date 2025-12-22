import {IDogProfileType} from "@/types/dog/dogType";
import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import Image from "next/image";
import Link from "next/link";

async function getDogs(): Promise<IDogProfileType[]> {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/dogs`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return await res.json();
  }
  const result: IDogProfileType[] = await res.json();
  return result;
}
export default async function Page() {
  const dogs = await getDogs();
  console.log(dogs);
  return (
    <div className="absolute left-0 top-0 bg-(--mt-black)/75 w-full h-full z-80">
      <div className="absolute bottom-0 bg-(--mt-white) w-full h-80 rounded-t-2xl pt-10 px-10 pb-10 flex flex-col justify-between">
        <h3 className="text-center font-bold text-xl">수강할 반려견 선택</h3>
        <ul>
          {dogs.length < 1 && (
            <li>
              <span className="text-red-500 text-center block">
                등록된 반려견 정보가 없습니다.
              </span>
            </li>
          )}
          {dogs.length > 0 && (
            <li>
              <form>
                <fieldset>
                  <legend>반려견 수강신청</legend>
                  {dogs.map((val) => (
                    <div key={val.dogId} className="">
                      {val.profileImage ? (
                        <div className="relative">
                          <Image
                            src={val.profileImage + ""}
                            alt={`${val.name}_프로필사진`}
                            fill
                          />
                        </div>
                      ) : (
                        <div className="" />
                      )}
                      <label>{val.name}</label>
                    </div>
                  ))}
                </fieldset>
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
