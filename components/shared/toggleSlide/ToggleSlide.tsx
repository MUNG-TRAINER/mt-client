import {Dispatch, MouseEvent, SetStateAction} from "react";

interface IToggleSlideProps {
  toggleState: boolean;
  toggleFn: Dispatch<SetStateAction<boolean>>;
  barWidth: number;
  barHeight: number;
}
export default function ToggleSlide({
  toggleState,
  toggleFn,
  barWidth,
  barHeight,
}: IToggleSlideProps) {
  const handleToggle = (e: MouseEvent) => {
    e.stopPropagation();
    toggleFn((prev) => !prev);
  };
  return (
    <div
      className={`flex items-center rounded-3xl transition-colors duration-200 ease-in-out ${
        toggleState ? "bg-(--mt-gray-light)" : "bg-gray-400"
      }`}
      style={{width: `${barWidth}px`, height: `${barHeight}px`}}
      onClick={handleToggle}
    >
      <button
        onClick={handleToggle}
        className={`transition-transform duration-200 ease-in-out size-[${
          barWidth / 2
        }px] rounded-full ${
          toggleState
            ? "translate-x-full bg-green-500"
            : "translate-x-0 bg-(--mt-gray)"
        }`}
        style={{width: `${barWidth / 2}px`, height: `${barWidth / 2}px`}}
      ></button>
    </div>
  );
}
