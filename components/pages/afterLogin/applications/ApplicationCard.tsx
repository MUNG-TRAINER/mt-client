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

  const [myDogs, setMyDogs] = useState<{id: number; name: string}[]>([]);
  const [selectedDogId, setSelectedDogId] = useState<number>(app.dogId ?? 0);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);

  const closeModal = () => setRejectModalOpen(false);

  // 시간 포맷 함수
  const formatSchedule = (schedule?: string) => {
    if (!schedule) return "";
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
      {/* 체크박스 */}
      <div
        className="absolute top-4 right-4 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="checkbox"
          className="w-6 h-6 accent-blue-500 cursor-pointer"
        />
      </div>

      {/* 이미지 + 텍스트 영역 */}
      <div className="flex gap-4 pb-2">
        <div className="relative w-24 h-24 sm:w-40 sm:h-40 rounded-xl overflow-hidden flex-shrink-0">
          <Image
            src={
              app.mainImage &&
              (app.mainImage.startsWith("http") ||
                app.mainImage.startsWith("/"))
                ? app.mainImage
                : "/images/application/test.jpg"
            }
            alt={app.title}
            fill
            className="object-cover"
          />
        </div>

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
        </div>
      </div>

      {/* 강아지 이름 + 일정 */}
      <div className="flex mb-2 text-xs gap-4">
        <div className="flex items-center justify-center gap-2 p-1 text-gray-400">
          <Image
            src="/images/application/dog.jpg"
            alt="강아지"
            width={18}
            height={18}
          />
          {app.dogName}
        </div>
        <p className="text-xs text-gray-400 mb-1 flex gap-1 items-center">
          <Image
            src="/images/application/calendar.jpg"
            alt="달력"
            width={13}
            height={5}
            className="w-[14px] h-[15px] items-center"
          />
          {formatSchedule(app.sessionSchedule)}
        </p>
      </div>

      {/* 상태별 버튼 */}
      <div className="flex gap-2 mt-2">
        {/* 거절 */}
        {app.applicationStatus === "REJECTED" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#374151"}}
            >
              승인 거절
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#EF4444"}}
              onClick={() =>
                app.rejectReason
                  ? setRejectModalOpen(true)
                  : alert("거절 사유가 없습니다.")
              }
            >
              거절사유
            </button>
          </>
        )}

        {/* 승인 완료 */}
        {app.applicationStatus === "ACCEPT" && (
          <>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
              style={{border: "1px solid #C5C5C5", color: "#10B981"}}
            >
              승인 완료
            </button>
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg bg-blue-100 text-blue-600"
              onClick={() => console.log("결제하기 클릭")}
            >
              결제하기
            </button>
          </>
        )}

        {/* 승인 대기 */}
        {app.applicationStatus === "APPLIED" && (
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-semibold rounded-lg"
            style={{border: "1px solid #C5C5C5", color: "#374151"}}
          >
            <Image
              src="/images/application/clock.jpg"
              alt="승인 대기중"
              width={20}
              height={19}
            />
            {statusText}
          </button>
        )}
      </div>

      {/* 거절사유 모달 */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-6 w-80 relative">
            <h3 className="text-lg font-semibold mb-2">거절 사유</h3>
            <p className="text-sm text-gray-700">
              {app.rejectReason?.trim() || "사유 없음"}
            </p>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setRejectModalOpen(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default ApplicationCard;
