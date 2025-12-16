import {usersApi} from "@/apis/users/usersApi";
import {useQuery} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function useMe() {
  const router = useRouter();
  const {data, isPending, isError} = useQuery({
    queryKey: ["me"],
    queryFn: () => usersApi.me(),
    retry: false,
  });
  useEffect(() => {
    if (isError) {
      router.replace("/login");
    }
  }, [isError, router]);
  return {data, isPending};
}
