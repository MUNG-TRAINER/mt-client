import {IRoundBorderBoxBtnProps} from "@/types/components/btnTypes";

export default function RoundBorderboxBtn({
  txt,
  icon,
  ...props
}: IRoundBorderBoxBtnProps) {
  return (
    <button
      className="flex gap-1 justify-center items-center border border-(--mt-gray-point) w-full py-2 rounded-lg"
      {...props}
    >
      <i className="size-6 text-(--mt-gray)">{icon}</i>
      <span>{txt}</span>
    </button>
  );
}
