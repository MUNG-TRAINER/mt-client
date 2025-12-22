"use client";

interface WishlistButtonProps {
  wishlistItemId: number;
}

const WishlistButton = ({wishlistItemId}: WishlistButtonProps) => {
  return (
    <div className="flex gap-2 mt-2">
      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
        신청하기
      </button>
    </div>
  );
};

export default WishlistButton;
