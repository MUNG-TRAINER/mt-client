"use client";

import {useUserWishlist} from "@/hooks/afterLogin/wishlist/useWishlist";
import Wishlist from "@/components/pages/afterLogin/wishlist/Wishlist";
const WishlistPage = () => {
  const {loading} = useUserWishlist();

  if (loading) return <div>찜 한 내역을 불러오는 중..</div>;

  return <Wishlist />;
};

export default WishlistPage;
