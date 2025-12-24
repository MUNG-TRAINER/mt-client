"use client";
import {wishlistApi} from "@/apis/wishlist/wishlistApi";

interface DeleteWishlistParams {
  wishlistItemId: number[];
}

export const useDeleteWishlist = () => {
  const remove = async (body: DeleteWishlistParams) => {
    await wishlistApi.deleteWishlist(body);
  };
  return {remove};
};