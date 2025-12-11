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
  ...props
}: IAuthInputType) {
  const labelId = useId();
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={`${labelId}_${id}`}>{labelTxt}</label>
      <div className="relative flex items-center">
        <i className="absolute size-5 ml-3 text-(--mt-gray)">{headIcon}</i>
        <input
          id={`${labelId}_${id}`}
          name={name}
          className={`border border-(--mt-gray-light) pl-10 py-2 w-full ${classNames}`}
          placeholder={placeholder}
          {...props}
        />
        {tailIcon && (
          <button onClick={fn} className="absolute right-0 mr-3 size-5">
            {fnState ? (
              <i className="size-5 text-(--mt-gray)">{stateTrueTailIcon}</i>
            ) : (
              <i className="size-5 text-(--mt-gray)">{tailIcon}</i>
            )}
          </button>
        )}
      </div>
      <small className="text-red-500">에러메세지</small>
    </div>
  );
}
