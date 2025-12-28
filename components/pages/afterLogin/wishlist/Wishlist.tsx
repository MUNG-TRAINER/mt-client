"use client";
import WishlistCard from "./WishlistCard";
import WishlistActions from "./WishlistActionButton";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";
import ConfirmModal from "./ConfirmModal";
import {useWishlistHandler} from "@/hooks/afterLogin/wishlist/useWishlistHandler";
import {useCounselingModal} from "@/stores/wishlist/counselingModal";
import CounselingModal from "./modal/CounselingModal";

const Wishlist = () => {
  const {
    wishlist,
    dogs,
    loading,
    selectedIds,
    modalContent,
    handleSelect,
    handleChangeDog,
    handleDelete,
    handleApplyWithDog,
    setModalContent,
  } = useWishlistHandler();
  const {counselModalOpen} = useCounselingModal();
  if (loading)
    return (
      <div className="flex justify-center items-center mx-auto">
        <LoadingSpinner />
      </div>
    );
  if (!wishlist.length)
    return (
      <p className="text-center text-gray-500">장바구니가 비어있습니다.</p>
    );

  return (
    <div className="relative flex flex-col w-full h-full">
      <div className="flex-1 overflow-y-auto flex flex-col gap-4">
        {wishlist.map((item) => (
          <WishlistCard
            key={item.wishlistItemId}
            {...item}
            isSelected={selectedIds.includes(item.wishlistItemId)}
            onSelect={(checked) => handleSelect(item.wishlistItemId, checked)}
            onChangeDog={handleChangeDog}
            setModalContent={setModalContent}
          />
        ))}
        {counselModalOpen && <CounselingModal />}
      </div>
      <div className="sticky bottom-0 left-0 w-full bg-white p-4 z-20">
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
          containerClassName="absolute z-80 inset-0 flex items-center justify-center bg-black/50"
        />
      )}
    </div>
  );
};

export default Wishlist;
