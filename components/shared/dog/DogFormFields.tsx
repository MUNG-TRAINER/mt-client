import { memo, useState } from "react";
import DogInput from "@/components/shared/inputs/DogInput";
import { DogIcon } from "@/components/icons/dog";
import { IDogProfileType } from "@/types/dog/dogType";

interface DogFormFieldsProps {
  defaultValues?: Partial<IDogProfileType>;
}

const DogFormFields = memo(function DogFormFields({
  defaultValues,
}: DogFormFieldsProps) {
  // defaultValues를 초기값으로만 사용 (리렌더링 시에도 자동 반영)
  const [selectedGender, setSelectedGender] = useState<"M" | "F">(
    () => defaultValues?.gender || "M"
  );
  const [selectedNeutered, setSelectedNeutered] = useState<boolean>(
    () => defaultValues?.isNeutered ?? false
  );

  return (
    <div className="flex flex-col gap-6">
      {/* 필수 정보 섹션 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-(--mt-black)">필수 정보</h2>
          <span className="text-xs text-(--mt-gray) bg-(--mt-gray-light) px-2 py-1 rounded">
            필수 입력
          </span>
        </div>

        <DogInput
          labelTxt="이름"
          id="name"
          name="name"
          type="text"
          placeholder="반려견 이름을 입력하세요"
          headIcon={<DogIcon />}
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

        {/* 성별 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">
            성별<span className="text-red-500 ml-1">*</span>
          </label>
          <input type="hidden" name="gender" value={selectedGender} readOnly />
          <div className="flex gap-3" role="radiogroup" aria-label="성별 선택">
            <button
              type="button"
              role="radio"
              aria-checked={selectedGender === "M"}
              onClick={() => setSelectedGender("M")}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                selectedGender === "M"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-(--mt-gray)"
              }`}
            >
              남
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={selectedGender === "F"}
              onClick={() => setSelectedGender("F")}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                selectedGender === "F"
                  ? "bg-pink-500 text-white"
                  : "bg-gray-100 text-(--mt-gray)"
              }`}
            >
              여
            </button>
          </div>
        </div>

        {/* 중성화 여부 */}
        <div className="flex flex-col gap-2">
          <label className="font-bold">
            중성화 여부<span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="hidden"
            name="isNeutered"
            value={String(selectedNeutered)}
            readOnly
          />
          <div
            className="flex gap-3"
            role="radiogroup"
            aria-label="중성화 여부 선택"
          >
            <button
              type="button"
              role="radio"
              aria-checked={selectedNeutered}
              onClick={() => setSelectedNeutered(true)}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                selectedNeutered
                  ? "bg-green-500 text-white"
                  : "bg-gray-100 text-(--mt-gray)"
              }`}
            >
              완료
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={!selectedNeutered}
              onClick={() => setSelectedNeutered(false)}
              className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
                !selectedNeutered
                  ? "bg-gray-400 text-white"
                  : "bg-gray-100 text-(--mt-gray)"
              }`}
            >
              미완료
            </button>
          </div>
        </div>

        {/* 사람 사회화 수준 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="humanSocialization" className="font-bold">
            사람 사회화 수준<span className="text-red-500 ml-1">*</span>
          </label>
          <p className="text-xs text-(--mt-gray) -mt-1">
            사람에 대한 친화력 정도를 선택하세요
          </p>
          <select
            id="humanSocialization"
            name="humanSocialization"
            required
            defaultValue={defaultValues?.humanSocialization || ""}
            className="border border-(--mt-gray-light) p-3 rounded-xl focus:border-(--mt-blue-point) focus:outline-none"
          >
            <option value="" disabled>
              선택하세요
            </option>
            <option value="LOW">낮음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">높음</option>
          </select>
        </div>

        {/* 동물 사회화 수준 */}
        <div className="flex flex-col gap-2">
          <label htmlFor="animalSocialization" className="font-bold">
            동물 사회화 수준<span className="text-red-500 ml-1">*</span>
          </label>
          <p className="text-xs text-(--mt-gray) -mt-1">
            다른 동물에 대한 친화력 정도를 선택하세요
          </p>
          <select
            id="animalSocialization"
            name="animalSocialization"
            required
            defaultValue={defaultValues?.animalSocialization || ""}
            className="border border-(--mt-gray-light) p-3 rounded-xl focus:border-(--mt-blue-point) focus:outline-none"
          >
            <option value="" disabled>
              선택하세요
            </option>
            <option value="LOW">낮음</option>
            <option value="MEDIUM">보통</option>
            <option value="HIGH">높음</option>
          </select>
        </div>
      </div>

      {/* 구분선 */}
      <div className="border-t border-(--mt-gray-light)"></div>

      {/* 선택 정보 섹션 */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-(--mt-black)">선택 정보</h2>
          <span className="text-xs text-(--mt-gray) bg-(--mt-gray-light) px-2 py-1 rounded">
            선택 입력
          </span>
        </div>
        <p className="text-sm text-(--mt-gray) -mt-2">
          아래 정보는 선택사항이며, 입력하지 않아도 등록이 가능합니다.
        </p>

        <DogInput
          labelTxt="체중"
          id="weight"
          name="weight"
          type="number"
          placeholder="체중 (kg)"
          required={false}
          min="0"
          step="0.1"
          defaultValue={defaultValues?.weight}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="personality" className="font-bold">
            성격
          </label>
          <textarea
            id="personality"
            name="personality"
            placeholder="반려견의 성격을 입력하세요 (예: 활발하고 사람을 좋아함)"
            defaultValue={defaultValues?.personality}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none focus:border-(--mt-blue-point) focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="habits" className="font-bold">
            습관/특징
          </label>
          <textarea
            id="habits"
            name="habits"
            placeholder="반려견의 습관이나 특징을 입력하세요 (예: 산책을 좋아하고 공놀이를 즐김)"
            defaultValue={defaultValues?.habits}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none focus:border-(--mt-blue-point) focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="healthInfo" className="font-bold">
            건강 정보
          </label>
          <textarea
            id="healthInfo"
            name="healthInfo"
            placeholder="건강 상태나 특이사항을 입력하세요 (예: 건강 상태 양호, 슬개골 탈구 있음)"
            defaultValue={defaultValues?.healthInfo}
            className="border border-(--mt-gray-light) p-3 rounded-xl min-h-24 resize-none focus:border-(--mt-blue-point) focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
});

export default DogFormFields;
