import {IBoxBtnStatefulProps} from "@/types/components/btnTypes";

export default function SlideBtn({
  txt,
  states,
  fnState,
  divProps,
  btnProps,
}: IBoxBtnStatefulProps) {
  return (
    <div className={`${states ? "" : ""}`} {...divProps}>
      <button onClick={fnState} {...btnProps}>
        {txt}
      </button>
    </div>
  );
}
