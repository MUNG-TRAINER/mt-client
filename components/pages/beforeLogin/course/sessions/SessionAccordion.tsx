"use client";

import {ISessionType} from "@/types/course/sessionType";
import {useState} from "react";
import {PencilSquareIcon} from "@/components/icons/pencil";
import SessionAccordionHeader from "./SessionAccordionHeader";
import SessionAccordionDetail from "./SessionAccordionDetail";
import {useSessionState} from "@/stores/session/sessionState";
import SessionEditForm from "./SessionEditForm";

interface ISessionAccordionProps {
  session: Partial<ISessionType>;
  courseId: string;
}

export default function SessionAccordion({
  session,
  courseId,
}: ISessionAccordionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {editMode, setEditModeOn} = useSessionState();
  return (
    <div className="flex flex-col border border-(--mt-gray-light) rounded-lg overflow-hidden">
      {/* 헤더 */}
      <SessionAccordionHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        content={session.content + ""}
        sessionDate={session.sessionDate + ""}
      />

      {/* 펼친 내용 */}
      {
        <div
          className={`relative border-t border-(--mt-gray-light) bg-white ${
            isOpen ? "scale-y-100 max-h-full p-4 space-y-4 " : "scale-y-0 h-0 "
          } transition-transform duration-200 ease-in-out origin-top`}
        >
          {/* 세부 정보 */}
          {editMode !== session.sessionId ? (
            <>
              <div className="pt-1 border-(--mt-gray-light) space-y-3">
                <SessionAccordionDetail
                  sessionDate={session.sessionDate + ""}
                  startTime={session.startTime + ""}
                  endTime={session.endTime + ""}
                  locationDetail={session.locationDetail + ""}
                  maxStudents={session.maxStudents + ""}
                />
              </div>
              <button
                className="absolute right-4 top-4 size-5"
                onClick={() => setEditModeOn(Number(session.sessionId))}
              >
                <PencilSquareIcon />
              </button>
            </>
          ) : (
            <SessionEditForm session={session} courseId={courseId} />
          )}
        </div>
      }
    </div>
  );
}
