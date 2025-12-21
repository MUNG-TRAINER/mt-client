import SessionAccordion from "./SessionAccordion";
import {ClipboardListIcon} from "@/components/icons/courseInfoIcons";
import {ISessionType} from "@/types/course/sessionType";

export default function SessionListSection({
  sessions,
}: {
  sessions?: ISessionType[];
}) {
  if (!sessions || sessions.length === 0) return null;

  return (
    <div className="space-y-4 pt-6 border-t border-(--mt-gray-light)">
      <div className="flex items-center gap-2 pb-3">
        <ClipboardListIcon className="size-5 text-(--mt-gray)" />
        <h3 className="font-bold text-lg text-(--mt-black)">세부 훈련 내용</h3>
      </div>
      <div className="space-y-2">
        {sessions.map((session) => (
          <SessionAccordion key={session.sessionId} session={session} />
        ))}
      </div>
    </div>
  );
}
