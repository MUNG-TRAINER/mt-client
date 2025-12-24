"use client";

import {useEffect, useState} from "react";
import {WishlistType} from "@/types/wishlist/wishlistType";
import {wishlistApi} from "@/apis/wishlist/wishlistApi";

export const useUserWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await wishlistApi.getWishlistList();
      setWishlist(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return {wishlist, loading, error, refetch: fetchWishlist};
};