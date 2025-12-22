import { useEffect, RefObject } from "react";

interface UseFocusTrapProps {
  isOpen: boolean;
  modalRef: RefObject<HTMLDivElement | null>;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
}

export function useFocusTrap({
  isOpen,
  modalRef,
  closeButtonRef,
}: UseFocusTrapProps) {
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // 모달이 열릴 때 닫기 버튼으로 포커스 이동
    closeButtonRef.current?.focus();

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      // 모달 내 포커스 가능한 모든 요소 찾기
      const focusableElements = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Shift + Tab: 첫 번째 요소에서 마지막 요소로
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
      // Tab: 마지막 요소에서 첫 번째 요소로
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    window.addEventListener("keydown", handleFocusTrap);
    return () => {
      window.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen, modalRef, closeButtonRef]);
}
