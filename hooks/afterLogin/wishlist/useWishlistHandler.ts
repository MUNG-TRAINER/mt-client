"use client";
import {useState} from "react";
import {useUserWishlist} from "./useWishlist";
import {useWishlistDogs} from "./useWishlistDogs";
import {useDeleteWishlist} from "./useDeleteWishlist";
import {useUpdateWishlist} from "./usePatchWishlist";
import {useApplyWishlist} from "./useApplyWishlist";

export const useWishlistHandler = () => {
  const {wishlist, loading, refetch} = useUserWishlist();
  const {dogs} = useWishlistDogs();

  const {remove} = useDeleteWishlist();
  const {update} = useUpdateWishlist();
  const {apply} = useApplyWishlist();

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedDogIds, setSelectedDogIds] = useState<Record<number, number>>(
    {}
  );
  const [modalContent, setModalContent] = useState<{
    title?: string;
    description: string;
  } | null>(null);

  const handleSelect = (id: number, isChecked: boolean) => {
    setSelectedIds((prev) =>
      isChecked ? [...prev, id] : prev.filter((i) => i !== id)
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
      setModalContent({
        title: "삭제 실패",
        description: "찜 삭제 중 오류가 발생했습니다.",
      });
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

  return {
    wishlist,
    dogs,
    loading,
    selectedIds,
    selectedDogIds,
    modalContent,
    handleSelect,
    handleChangeDog,
    handleDelete,
    handleApplyWithDog,
    setModalContent,
  };
};
