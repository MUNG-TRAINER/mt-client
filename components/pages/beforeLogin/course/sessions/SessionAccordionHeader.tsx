import {ChevronDownIcon} from "@/components/icons/chevron";
import {useSessionState} from "@/stores/session/sessionState";
import {Dispatch, SetStateAction} from "react";
interface ISessionAccordionHeader {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  content: string;
  sessionDate: string;
}

const formatDateForDisplay = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}.${month}.${day}`;
};
export default function SessionAccordionHeader({
  isOpen,
  setIsOpen,
  content,
  sessionDate,
}: ISessionAccordionHeader) {
  const {setEditModeOff} = useSessionState();
  const handleToggleOpen = () => {
    setIsOpen((prev) => !prev);
    setEditModeOff();
  };
  return (
    <button
      onClick={handleToggleOpen}
      className="w-full flex items-center justify-between p-4 hover:bg-(--mt-gray-smoke) transition-colors"
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <span
          className={`font-bold text-(--mt-black) transition-all ${
            isOpen ? "line-clamp-3" : "text-base truncate"
          }`}
        >
          {content}
        </span>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {!isOpen && (
          <span className="text-sm text-(--mt-gray)">
            {formatDateForDisplay(sessionDate)}
          </span>
        )}

        <ChevronDownIcon
          className={`size-5 text-(--mt-gray) transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
    </button>
  );
}
