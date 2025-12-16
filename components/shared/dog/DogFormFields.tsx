import { memo } from "react";
import DogInput from "@/components/shared/inputs/DogInput";
import { UserIcon } from "@/components/icons/user";
import { IDogProfileType } from "@/types/dog/dogType";

interface DogFormFieldsProps {
  defaultValues?: Partial<IDogProfileType>;
}

const DogFormFields = memo(function DogFormFields({
  defaultValues,
}: DogFormFieldsProps) {
  return (
    <>
      {/* 기본 정보 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-(--mt-black)">기본 정보</h2>

        <DogInput
          labelTxt="이름"
          id="name"
          name="name"
          type="text"
          placeholder="반려견 이름을 입력하세요"
          headIcon={<UserIcon />}
          required={true}
          defaultValue={defaultValues?.name}
        />

        <DogInput
          labelTxt="견종"
          id="breed"
          name="breed"
          type="text"
          placeholder="예: 골든 리트리버, 포메라니안"
          required={true}
          defaultValue={defaultValues?.breed}
        />

        <div className="grid grid-cols-2 gap-3">
          <DogInput
            labelTxt="나이"
            id="age"
            name="age"
            type="number"
            placeholder="나이 (살)"
            required={true}
            min="0"
            max="30"
            defaultValue={defaultValues?.age}
          />

          <DogInput
            labelTxt="체중"
            id="weight"
            name="weight"
            type="number"
            placeholder="체중 (kg)"
            required={true}
            min="0"
            step="0.1"
            defaultValue={defaultValues?.weight}
          />
        </div>

        {/* 성별 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">
            성별<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="M"
                required
                defaultChecked={defaultValues?.gender === "M"}
                className="size-4"
              />
              <span>남</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="F"
                required
                defaultChecked={defaultValues?.gender === "F"}
                className="size-4"
              />
              <span>여</span>
            </label>
          </div>
        </div>

        {/* 중성화 여부 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">
            중성화 여부<span className="text-red-500 ml-1">*</span>
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isNeutered"
                value="true"
                required
                defaultChecked={defaultValues?.isNeutered === true}
                className="size-4"
              />
              <span>완료</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="isNeutered"
                value="false"
                required
                defaultChecked={defaultValues?.isNeutered === false}
                className="size-4"
              />
              <span>미완료</span>
            </label>
          </div>
        </div>
      </div>

      {/* 상세 정보 */}
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-(--mt-black)">상세 정보</h2>

        <div className="flex flex-col gap-2">
          <label htmlFor="personality" className="font-bold">
            성격<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="personality"
            name="personality"
            placeholder="반려견의 성격을 입력하세요 (예: 활발하고 사람을 좋아함)"
            required
            defaultValue={defaultValues?.personality}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="habits" className="font-bold">
            습관/특징<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="habits"
            name="habits"
            placeholder="반려견의 습관이나 특징을 입력하세요 (예: 산책을 좋아하고 공놀이를 즐김)"
            required
            defaultValue={defaultValues?.habits}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="healthInfo" className="font-bold">
            건강 정보<span className="text-red-500 ml-1">*</span>
          </label>
          <textarea
            id="healthInfo"
            name="healthInfo"
            placeholder="건강 상태나 특이사항을 입력하세요 (예: 건강 상태 양호, 슬개골 탈구 있음)"
            required
            defaultValue={defaultValues?.healthInfo}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none"
          />
        </div>
      </div>
    </>
  );
});

export default DogFormFields;
