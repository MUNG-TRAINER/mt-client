"use client";

import { useUserWishlist } from "@/hooks/afterLogin/wishlist/useWishlist";

const WishlistPage = () => {
  const { wishlist, loading } = useUserWishlist();

  if (loading) return <div>로딩 중...</div>;

  return (
    <div>
      {wishlist.map((item) => (
        <div key={`${item.wishlistItemId}-${item.dogId}`}>
          {item.title} - {item.dogName} - {item.price}원
        </div>
      ))}
    </div>
  );
};

export default WishlistPage;
