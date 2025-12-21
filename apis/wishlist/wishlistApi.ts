import { WishlistType } from "@/types/wishlist/wishlistType";

export const wishlistApi = {
  getWishlistList: async (): Promise<WishlistType[]> => {
    const res = await fetch("/api/wishlist", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) throw new Error("찜 한 내역 리스트 불러오는데 실패했습니다");

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },
};