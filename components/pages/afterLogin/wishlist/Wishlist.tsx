"use client";

import WishlistCard from "./WishlistCard";
import {useUserWishlist} from "@/hooks/afterLogin/wishlist/useWishlist";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import {useState} from "react";
import WishlistActions from "./WishlistActionButton";
import {useDeleteWishlist} from "@/hooks/afterLogin/wishlist/useDeleteWishlist";
import {useUpdateWishlist} from "./../../../../hooks/afterLogin/wishlist/usePatchWishlist";
import {useApplyWishlist} from "@/hooks/afterLogin/wishlist/useApplyWishlist";
import {useWishlistDogs} from "@/hooks/afterLogin/wishlist/useWishlistDogs";
import ConfirmModal from "./ConfirmModal";

const Wishlist = () => {
  const {wishlist, loading, refetch} = useUserWishlist();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const {dogs} = useWishlistDogs();

  const {remove} = useDeleteWishlist();
  const {update} = useUpdateWishlist();
  const {apply} = useApplyWishlist();
  const [selectedDogIds, setSelectedDogIds] = useState<Record<number, number>>(
    {}
  );
  const [modalContent, setModalContent] = useState<{
    title?: string;
    description: string;
  } | null>(null);

  const closeModal = () => setModalContent(null);

  const handleSelect = (id: number, isChecked: boolean) => {
    setSelectedIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };
  const handleChangeDog = async (wishlistItemId: number, dogId: number) => {
    const item = wishlist.find((w) => w.wishlistItemId === wishlistItemId);
    if (!item) return;

    // 장바구니 중복 체크
    const duplicate = wishlist.find(
      (w) =>
        w.courseId === item.courseId &&
        (selectedDogIds[w.wishlistItemId] ?? w.dogId) === dogId
    );
    if (duplicate && duplicate.wishlistItemId !== wishlistItemId) {
      setModalContent({
        title: "중복 선택",
        description: "이미 장바구니에 있는 반려견입니다.",
      });
      return;
    }

    try {
      await update(wishlistItemId, {dogId});
      setSelectedDogIds((prev) => ({...prev, [wishlistItemId]: dogId}));
      await refetch();
      setModalContent({
        title: "변경 완료",
        description: "반려견이 성공적으로 변경되었습니다.",
      });
    } catch (err) {
      console.error(err);
      setModalContent({
        title: "변경 실패",
        description: "반려견 변경에 실패했습니다.",
      });
    }
  };

  const handleDelete = async (ids: number[]) => {
    if (!ids.length) return;
    try {
      await remove({wishlistItemId: ids});
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };
  const handleApplyWithDog = async () => {
    if (!selectedIds.length) {
      setModalContent({description: "적어도 하나의 찜 항목을 선택해주세요."});
      return;
    }

    for (const id of selectedIds) {
      const item = wishlist.find((w) => w.wishlistItemId === id)!;
      const dogId = selectedDogIds[id] ?? item.dogId;

      // 강아지 정보 가져오기
      const dog = dogs.find((d) => d.dogId === dogId);
      if (dog && !dog.hasCounseling) {
        setModalContent({
          title: "상담 필요",
          description:
            "상담이 필요한 강아지가 포함되어있습니다. 상담을 먼저 진행해주세요.",
        });
        return;
      }
    }

    // 신청 API 호출
    try {
      const body = selectedIds.map((id) => {
        const item = wishlist.find((w) => w.wishlistItemId === id)!;
        const dogId = selectedDogIds[id] ?? item.dogId;
        return {wishlistItemId: id, dogId, courseId: item.courseId};
      });
      await apply(body);
      setModalContent({
        title: "신청 완료",
        description: "신청이 완료되었습니다!",
      });
      await refetch();
      setSelectedIds([]);
    } catch (err) {
      console.error(err);
      setModalContent({
        title: "신청 실패",
        description: "신청 중 오류가 발생했습니다.",
      });
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
            setModalContent={setModalContent}
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

      {modalContent && (
        <ConfirmModal
          isOpen={!!modalContent}
          onClose={() => setModalContent(null)}
          title={modalContent?.title ?? ""}
          description={modalContent?.description ?? ""}
        />
      )}
    </div>
  );
};

export default Wishlist;
