"use client";

import React from "react";

interface WishlistActionsProps {
  selectedIds: number[];
  onApply: () => void;
  onDelete: (ids: number[]) => void;
}

const WishlistActions: React.FC<WishlistActionsProps> = ({
  selectedIds,
  onApply,
  onDelete,
}) => {
  return (
    <div className="flex gap-1 w-full">
      <button
        className="flex-1 bg-blue-500 text-white px-3 py-2.5 rounded hover:bg-blue-600 transition"
        onClick={onApply}
      >
        신청하기
      </button>
      <button
        className="flex-1 bg-gray-200 text-gray-700 px-3 py-2.5 rounded hover:bg-gray-300 transition"
        onClick={() => onDelete(selectedIds)}
      >
        삭제하기
      </button>
    </div>
  );
};

export default WishlistActions;
