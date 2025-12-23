"use client";
import { wishlistApi } from "@/apis/wishlist/wishlistApi";
import { WishlistDogType } from "@/types/wishlist/wishlistType";
import { useEffect, useState } from "react";

export const useWishlistDogs = () =>{
    const [dogs, setDogs] = useState<WishlistDogType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const fetchWishlistDogs =async () => {
        setLoading(true);
        setError(null);
        try{
            const data = await wishlistApi.getDogsList();
            setDogs(data);
        }catch (err){
            setError(err as Error)
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchWishlistDogs();
      }, []);
    
      return { dogs, loading, error, refetch: fetchWishlistDogs };
};