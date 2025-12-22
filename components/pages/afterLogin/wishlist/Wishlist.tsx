"use client";

import WishlistCard from "./WishlistCard";
import {useUserWishlist} from "@/hooks/afterLogin/wishlist/useWishlist";
import LoadingSpinner from "@/components/shared/feedback/LoadingSpinner";

const Wishlist = () => {
  const {wishlist, loading} = useUserWishlist();

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
    <div className="w-full p-6 flex flex-col gap-4">
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
        />
      ))}
    </div>
  );
};

export default Wishlist;
