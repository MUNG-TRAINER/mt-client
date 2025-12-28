"use client";
import {useCounselingModal} from "@/stores/wishlist/counselingModal";
import {useRouter} from "next/navigation";

export default function CounselingModal() {
  const router = useRouter();
  const {dogId, setCounselModalClose} = useCounselingModal();
  const handleCounselingClick = (dogId: number | null) => {
    if (!dogId) return;
    setCounselModalClose();
    router.push(`/counseling/create/${dogId}`);
  };
  return (
    <Modal onClose={setCounselModalClose}>
      <h3 className="text-lg font-semibold mb-2">상담 안내</h3>
      <p className="mb-4">
        상담이 안되어 있는 반려견입니다.
        <br /> 상담하러 가시겠습니까?
      </p>
      <div className="flex justify-end gap-2">
        <button
          className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          onClick={setCounselModalClose}
        >
          취소
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => handleCounselingClick(dogId)}
        >
          상담하기
        </button>
      </div>
    </Modal>
  );
}

const Modal: React.FC<{onClose: () => void; children: React.ReactNode}> = ({
  onClose,
  children,
}) => {
  return (
    <div
      className="absolute z-80 inset-0 flex items-center justify-center bg-black/50"
      onClick={onClose} // 배경 클릭 시 닫기
    >
      <div
        className="bg-white rounded-xl p-6 w-80 relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 전파 막기
      >
        <button
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};
