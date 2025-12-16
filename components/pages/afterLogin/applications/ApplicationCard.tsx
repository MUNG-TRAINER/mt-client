"use client";

import Image from "next/image";
import {ApplicationType} from "@/types/applications/applicationsType";
import {useRouter} from "next/navigation";
import {useState, useEffect} from "react";

interface Props {
  app: ApplicationType;
}

const statusTextMap: Record<string, string> = {
  APPLIED: "승인 대기중",
  WAITING: "대기중",
  ACCEPT: "승인 완료",
  REJECTED: "승인 거절",
  CANCELLED: "취소됨",
};

const tagStyleMap = [
  {bg: "#E7F5FF", text: "#4263EB"},
  {bg: "#FFF3BF", text: "#F59F00"},
  {bg: "#E5DBFF", text: "#7950F2"},
];

const ApplicationCard: React.FC<Props> = ({app}) => {
  const router = useRouter();
  const tags = app.tags?.split(",") ?? [];
  const statusText = statusTextMap[app.applicationStatus];

  // 시간 포맷 함수
  const formatSchedule = (schedule?: string) => {
    if (!schedule) return ""; // 값 없으면 빈 문자열 반환
    const [start, end] = schedule.split(" ~ ");
    const formatTime = (datetime: string) => {
      if (!datetime) return "";
      const [date, time] = datetime.split(" ");
      if (!time) return date;
      const [hh, mm] = time.split(":");
      return `${date} ${hh}:${mm}`;
    };
    return `${formatTime(start)} ~ ${formatTime(end)}`;
  };
  const [myDogs, setMyDogs] = useState<{id: number; name: string}[]>([]);
  const [selectedDogId, setSelectedDogId] = useState<number>(app.dogId ?? 0);

  // 유저 반려견 리스트 가져오기
  useEffect(() => {
    fetch("http://localhost:8080/api/dogs", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch dogs");
        return res.json();
      })
      .then((data) => setMyDogs(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDogChange = () => {
    fetch(`/api/application/${app.applicationId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({dogId: selectedDogId}),
    })
      .then((res) => {
        if (!res.ok) throw new Error("강아지 변경 실패");
        return res.json();
      })
      .then(() => alert("강아지 변경 완료"))
      .catch((err) => console.error(err));
  };

  return (
    <li
      className="relative cursor-pointer flex flex-col rounded-2xl shadow-md bg-white p-4"
      style={{border: "1px solid #E9ECEF"}}
    >
      {/* 체크박스 (오른쪽 상단) */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="w-6 h-6 accent-blue-500 cursor-pointer"
        />
      </div>

      <div className="flex gap-4 pb-2">
        <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={
              app.mainImage &&
              (app.mainImage.startsWith("http") ||
                app.mainImage.startsWith("/"))
                ? app.mainImage
                : "/images/testApplication/test.jpg"
            }
            alt={app.title}
            fill
            className="object-cover"
          />
        </div>

        {/* 텍스트 영역 오른쪽 padding으로 체크박스 영역 확보 */}
        <div className="flex-1 pr-10">
          <h2 className="text-[16px] font-semibold mb-1">{app.title}</h2>
          <p className="text-xs text-gray-500 mb-2">{app.description}</p>

          <div className="flex gap-1 flex-wrap mb-2">
            {tags.map((tag, idx) => {
              const style = tagStyleMap[idx % tagStyleMap.length];
              return (
                <span
                  key={idx}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{backgroundColor: style.bg, color: style.text}}
                >
                  {tag}
                </span>
              );
            })}
          </div>
          <p className="text-xs text-gray-400 mb-1 flex gap-1">
            <Image
              src="/images/application/calendar.jpg"
              alt="달력"
              width={13} // 필수
              height={5}
              className="w-[14px] h-[15px]"
            />
            {formatSchedule(app.sessionSchedule)}
          </p>
        </div>
      </div>
      <div>
        {/* 스케줄과 강아지 이름 표시 */}
        <div className="flex mb-2 text-xs gap-1">
          {/* 왼쪽: 강아지 이름 + 아이콘 */}
          {/* <div
            className="flex items-center justify-center w-1/2 gap-2 p-1 text-gray-400"
            style={{border: "1px solid #C5C5C5", borderRadius: "0.5rem"}}
          >
            <Image
              src="/images/application/dog.jpg"
              alt="강아지"
              width={18}
              height={18}
            />
            {app.dogName}
          </div> */}
          <select
            value={String(selectedDogId)}
            onChange={(e) => setSelectedDogId(Number(e.target.value))}
            className="flex-1 border p-1 rounded text-sm"
          >
            {myDogs.length === 0 ? (
              <option key="loading" value="">
                로딩중...
              </option>
            ) : (
              myDogs.map((dog, idx) => (
                <option key={`${dog.id}-${idx}`} value={dog.id}>
                  {dog.name}
                </option>
              ))
            )}
          </select>

          {/* 오른쪽: 수정하기 버튼 */}
          <div
            className="flex items-center justify-center w-1/2 p-1"
            style={{border: "1px solid #C5C5C5", borderRadius: "0.5rem"}}
          >
            <button
              className="text-blue-500 font-semibold text-xs hover:underline"
              onClick={() => console.log("수정하기 클릭")}
            >
              수정하기
            </button>
          </div>
        </div>
      </div>
      <button
        className="flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
        style={{border: "1px solid #C5C5C5", color: "#374151"}}
      >
        {app.applicationStatus === "APPLIED" && (
          <Image
            src="/images/testApplication/clock.jpg"
            alt="승인 대기중"
            width={17}
            height={17}
          />
        )}
        {statusTextMap[app.applicationStatus]}
      </button>
    </li>
  );
};

export default ApplicationCard;
