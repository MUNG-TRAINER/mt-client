import {IAuthInputType} from "@/types/components/inputTypes";
import {useId} from "react";

export default function AuthInput({
  labelTxt,
  id,
  name,
  type,
  placeholder,
  classNames = "",
  headIcon,
  tailIcon,
  stateTrueTailIcon,
  fnState = false,
  fn,
  errMsg,
  ...props
}: IAuthInputType) {
  const labelId = useId();
  const checkId =
    id === "sido" || id === "sigungu" || id === "roadname" || id === "postcode";
  return (
    <div className="flex flex-col gap-2 w-full">
      <label
        htmlFor={`${labelId}_${id}`}
        className={`font-bold ${checkId && "cursor-pointer"}`}
      >
        {labelTxt}
      </label>
      <div className="relative flex items-center">
        <i className="absolute size-5 ml-3 text-(--mt-gray)">{headIcon}</i>
        <input
          id={`${labelId}_${id}`}
          name={name}
          type={type}
          className={`border border-(--mt-gray-light) pl-10 py-2 w-full ${classNames} rounded-xl ${
            checkId ? "bg-(--mt-gray-light) cursor-pointer" : "bg-(--mt-white) "
          }`}
          placeholder={placeholder}
          {...props}
        />
        {tailIcon && (
          <button
            onClick={fn}
            className="absolute right-0 mr-3 size-5"
            type="button"
          >
            {fnState ? (
              <i className="size-5 text-(--mt-gray)">{stateTrueTailIcon}</i>
            ) : (
              <i className="size-5 text-(--mt-gray)">{tailIcon}</i>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col">
        {errMsg &&
          errMsg.map((val, i) => (
            <small key={i} className="text-red-500">
              {val}
            </small>
          ))}
      </div>
    </div>
  );
}
