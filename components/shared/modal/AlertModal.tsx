"use client";
import { CheckIcon } from "@/components/icons/check";
import { XMarkIcon } from "@/components/icons/xMark";

interface AlertModalProps {
  isOpen: boolean;
  type: "success" | "error" | "info";
  title: string;
  message: string;
  onClose: () => void;
}

export default function AlertModal({
  isOpen,
  type,
  title,
  message,
  onClose,
}: AlertModalProps) {
  if (!isOpen) return null;

  const iconConfig = {
    success: {
      icon: CheckIcon,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      buttonColor: "bg-blue-500",
    },
    error: {
      icon: XMarkIcon,
      bgColor: "bg-red-100",
      iconColor: "text-red-500",
      buttonColor: "bg-red-500",
    },
    info: {
      icon: CheckIcon,
      bgColor: "bg-blue-100",
      iconColor: "text-blue-500",
      buttonColor: "bg-blue-500",
    },
  };

  const config = iconConfig[type];
  const Icon = config.icon;

  return (
    <div
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className={`${config.bgColor} rounded-full p-4`}>
            <Icon className={`size-10 ${config.iconColor} stroke-2`} />
          </div>
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-bold text-(--mt-black) mb-3 text-center">
          {title}
        </h3>

        {/* 메시지 */}
        <p className="text-(--mt-gray) text-sm mb-8 text-center leading-relaxed">
          {message}
        </p>

        {/* 확인 버튼 */}
        <button
          onClick={onClose}
          className={`w-full py-3.5 ${config.buttonColor} text-white rounded-xl font-bold hover:opacity-90 transition-opacity`}
        >
          확인
        </button>
      </div>
    </div>
  );
}
