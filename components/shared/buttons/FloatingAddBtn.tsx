import {PlusIcon} from "@/components/icons/add";
import {HTMLAttributes, MouseEvent} from "react";
interface IFloatingAddBtnProps extends HTMLAttributes<HTMLButtonElement> {
  btnState: boolean;
  clickFn: () => void;
  classNames?: string;
}
export default function FloatingAddBtn({
  btnState,
  clickFn,
  classNames,
  ...prev
}: IFloatingAddBtnProps) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    clickFn();
  };
  return (
    <button
      className={`z-90 fixed bottom-24 right-5 bg-blue-500 p-5 rounded-full transition-transform duration-200 ease-in-out ${
        btnState ? "translate-x-[200%]" : "translate-x-0"
      } ${classNames}`}
      onClick={handleClick}
      {...prev}
    >
      <i>
        <PlusIcon className="size-6 text-white" />
      </i>
    </button>
  );
}
