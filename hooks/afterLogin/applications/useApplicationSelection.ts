"use client";
import {useState} from "react";

/**
 * 신청 항목 선택 상태 관리 훅
 * courseId-dogId 형태의 키로 선택 상태를 관리
 */
export function useApplicationSelection() {
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());

  const toggleSelection = (courseId: number, dogId: number) => {
    const key = `${courseId}-${dogId}`;
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(key)) {
        newSet.delete(key);
      } else {
        newSet.add(key);
      }
      return newSet;
    });
  };

  const clearSelection = () => {
    setSelectedItems(new Set());
  };

  return {
    selectedItems,
    toggleSelection,
    clearSelection,
  };
}
