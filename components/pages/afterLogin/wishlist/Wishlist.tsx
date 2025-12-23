"use client";

import WishlistCard from "./WishlistCard";
import {useUserWishlist} from "@/hooks/afterLogin/wishlist/useWishlist";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import {useState} from "react";
import WishlistActions from "./WishlistActionButton";
import {useDeleteWishlist} from "@/hooks/afterLogin/wishlist/useDeleteWishlist";
import {useUpdateWishlist} from "./../../../../hooks/afterLogin/wishlist/usePatchWishlist";
import {useApplyWishlist} from "@/hooks/afterLogin/wishlist/useApplyWishlist";

const Wishlist = () => {
  const {wishlist, loading, refetch} = useUserWishlist();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {remove} = useDeleteWishlist();
  const {update} = useUpdateWishlist();
  const {apply} = useApplyWishlist();
  const [selectedDogIds, setSelectedDogIds] = useState<Record<number, number>>(
    {}
  );

  const handleSelect = (id: number, isChecked: boolean) => {
    setSelectedIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };
  const handleChangeDog = async (wishlistItemId: number, dogId: number) => {
    try {
      await update(wishlistItemId, {dogId});
      setSelectedDogIds((prev) => ({...prev, [wishlistItemId]: dogId}));
      await refetch(); // 새로고침
      alert("반려견 변경 완료!");
    } catch (err) {
      console.error(err);
      alert("변경 실패");
    }
  };

  const handleDelete = async (ids: number[]) => {
    if (!ids.length) return;
    try {
      await remove({wishlistItemId: ids});
      alert("삭제 완료!");
      await refetch();
    } catch (err) {
      console.error(err);
      alert("삭제 실패");
    }
  };
  const handleApplyWithDog = async () => {
    if (!selectedIds.length)
      return alert("적어도 하나의 찜 항목을 선택해주세요.");

    try {
      const body = selectedIds.map((id) => {
        const item = wishlist.find((w) => w.wishlistItemId === id);
        if (!item) throw new Error("찜 항목을 찾을 수 없습니다.");

        const dogId = selectedDogIds[id] ?? item.dogId; // 변경된 값 있으면 사용, 없으면 기존
        return {
          wishlistItemId: id,
          dogId,
          courseId: item.courseId,
        };
      });
      await apply(body);
      alert("신청 완료!");
      await refetch();
      setSelectedIds([]); // 선택 초기화
    } catch (err) {
      console.error(err);
      alert("신청 실패");
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <p className="text-center text-gray-500">장바구니가 비어있습니다.</p>
    );
  }
  return (
    <div className="flex flex-col w-full h-full bg-white">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
        {wishlist.map((item) => (
          <WishlistCard
            key={item.wishlistItemId}
            wishlistItemId={item.wishlistItemId}
            title={item.title}
            description={item.description}
            tags={item.tags}
            location={item.location}
            schedule={item.schedule}
            mainImage={item.mainImage}
            dogName={item.dogName}
            type={item.type}
            price={item.price}
            lessonForm={item.lessonForm}
            isSelected={selectedIds.includes(item.wishlistItemId)}
            onSelect={(checked) => handleSelect(item.wishlistItemId, checked)}
            onChangeDog={handleChangeDog}
          />
        ))}
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-white p-4 z-20">
        {/* 하단 버튼 */}
        <WishlistActions
          selectedIds={selectedIds}
          onApply={handleApplyWithDog}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Wishlist;