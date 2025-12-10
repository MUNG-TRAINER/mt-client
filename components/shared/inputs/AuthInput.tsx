import {IAuthInputType} from "@/types/components/inputTypes";
import {useId} from "react";

export default function AuthInput({
  labelTxt,
  id,
  name,
  placeholder,
  classNames = "",
  headIcon,
  tailIcon,
  stateTrueTailIcon,
  fnState = false,
  fn,
  props,
}: IAuthInputType) {
  const labelId = useId();
  return (
    <div>
      <label htmlFor={`${labelId}_${id}`}>{labelTxt}</label>
      <div>
        <i>{headIcon}</i>
        <input
          id={`${labelId}_${id}`}
          name={name}
          className={classNames}
          placeholder={placeholder}
          {...props}
        />
        {tailIcon && (
          <button onClick={fn}>
            {fnState ? <i>{stateTrueTailIcon}</i> : <i>{tailIcon}</i>}
          </button>
        )}
      </div>
    </div>
  );
}
