"use client";
import {wishlistApi} from "@/apis/wishlist/wishlistApi";

interface ApplyWishlistParams {
  wishlistItemId: number;
  dogId: number;
  courseId: number;
}

export const useApplyWishlist = () => {
  const apply = async (body: ApplyWishlistParams[]) => {
    return await wishlistApi.applyWishlist(body);
  };

  return {apply};
};
