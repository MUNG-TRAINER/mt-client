import { IRoundBoxColorBtnProps } from "@/types/components/btnTypes";

export default function RoundboxColorBtn({
  txt,
  btnColor = "bg-(--mt-blue-point)",
  btnTxtColor = "text-(--mt-white)",
  btnIcon,
  disabled = false,
  ...props
}: IRoundBoxColorBtnProps) {
  return (
    <button
      className={`flex justify-center items-center gap-2 w-full py-4 rounded-2xl font-bold ${btnColor} ${btnTxtColor} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
      {...props}
    >
      {txt}
      {btnIcon && <i>{btnIcon}</i>}
    </button>
  );
}
