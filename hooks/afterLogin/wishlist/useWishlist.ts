"use client";

import { useEffect, useState } from "react";
import { WishlistType } from "@/types/wishlist/wishlistType";
import { wishlistApi } from "@/apis/wishlist/wishlistApi";

export const useUserWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    wishlistApi.getWishlistList()
      .then((res) => setWishlist(res))
      .catch(() => alert("장바구니 데이터를 불러오는 데 실패했습니다."))
      .finally(() => setLoading(false));
  }, []);

  return { wishlist, loading };
};
