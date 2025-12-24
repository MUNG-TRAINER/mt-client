"use client";
import {wishlistApi} from "@/apis/wishlist/wishlistApi";

interface UpdateWishlistParams {
  dogId: number;
}

export const useUpdateWishlist = () => {
  const update = async (wishlistItemId: number, body: UpdateWishlistParams) => {
    if (wishlistItemId == null) {
      throw new Error("wishlistItemId is undefined");
    }
    await wishlistApi.updateWishlist(wishlistItemId, body);
  };
  return {update};
};