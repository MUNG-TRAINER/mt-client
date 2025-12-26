import {WishlistDogType, WishlistType} from "@/types/wishlist/wishlistType";

interface WishlistCreateRequest {
  courseId: number;
  dogId: number;
}

interface WishlistDeleteRequest {
  wishlistItemId: number[];
}

interface WishlistUpdateRequest {
  dogId: number;
}
interface WishlistApplyRequest {
  wishlistItemId: number;
  dogId: number;
  courseId: number;
}

export const wishlistApi = {
  getWishlistList: async (): Promise<WishlistType[]> => {
    const res = await fetch("/api/wishlist", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    if (!res.ok) throw new Error("찜 한 내역 리스트 불러오는데 실패했습니다");

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },
  // 반려견 리스트 조회
  getDogsList: async (): Promise<WishlistDogType[]> => {
    const res = await fetch("/api/wishlist/dogs", {
      method: "GET",
      headers: {"Content-Type": "application/json"},
    });
    if (!res.ok) throw new Error("반려견 리스트를 가져오는데 실패했습니다.");

    const json = await res.json();
    return Array.isArray(json.data) ? json.data : [];
  },

  // 생성
  createWishlist: async (body: WishlistCreateRequest) => {
    const res = await fetch("/api/wishlist", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const errorBody = await res.json();
      console.error("wishlist error:", errorBody, res.status);
    
      if (errorBody.code === "ALREADY_WISHLISTED") {
        throw new Error("ALREADY_WISHLISTED");
      }
    
      throw new Error("WISHLIST_FAILED");
    }
    
  },

  // 삭제 (여러 개)
  deleteWishlist: async (body: WishlistDeleteRequest) => {
    const res = await fetch("/api/wishlist", {
      method: "DELETE",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("찜 항목 삭제에 실패했습니다");
  },

  // 수정 (강아지 변경)
  updateWishlist: async (
    wishlistItemId: number,
    body: WishlistUpdateRequest
  ) => {
    const res = await fetch(`/api/wishlist/${wishlistItemId}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("찜 항목 수정에 실패했습니다");
  },
  // 신청 (찜 → 신청)
  applyWishlist: async (body: WishlistApplyRequest[]) => {
    const res = await fetch("/api/wishlist/apply", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error("찜 항목을 신청으로 전환하는데 실패했습니다");

    const json = await res.json();
    return json.data; // 서버에서 반환한 ApplicationResponse[]
  },
};