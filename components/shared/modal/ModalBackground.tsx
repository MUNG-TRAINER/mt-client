import {ReactNode} from "react";

interface IModalBackgroundProps {
  offModal?: () => void;
  contentsAligments?: string;
  classNames?: string;
  children?: ReactNode;
}
export default function ModalBackground({
  offModal,
  contentsAligments = "justify-center items-center",
  classNames = "",
  children,
}: IModalBackgroundProps) {
  return (
    <div
      className={`absolute top-0 left-0 bg-(--mt-black)/70 w-full h-full flex ${contentsAligments} ${classNames}`}
    >
      <div className="absolute w-full h-full z-70" onClick={offModal} />
      {children}
    </div>
  );
}
