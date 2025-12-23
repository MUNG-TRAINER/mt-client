"use client";
import {wishlistApi} from "@/apis/wishlist/wishlistApi";

interface CreateWishlistParams {
  courseId: number;
  dogId: number;
}

export const useCreateWishlist = () => {
  const create = async (body: CreateWishlistParams) => {
    await wishlistApi.createWishlist(body);
  };

  return {create};
};
