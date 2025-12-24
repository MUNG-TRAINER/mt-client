import { IRoundBoxColorBtnProps } from "@/types/components/btnTypes";

export default function RoundboxColorBtn({
  txt,
  btnColor = "bg-(--mt-blue-point)",
  btnTxtColor = "text-(--mt-white)",
  btnIcon,
  states = true,
  ...props
}: IRoundBoxColorBtnProps) {
  return (
    <button
      className={`flex justify-center items-center gap-2 w-full py-4 rounded-2xl font-bold ${btnColor} ${btnTxtColor} ${
        states ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={states}
      {...props}
    >
      {txt}
      {btnIcon && <i>{btnIcon}</i>}
    </button>
  );
}
