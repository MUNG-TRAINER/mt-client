"use client";
import { useQuery } from "@tanstack/react-query";
import { counselingApi } from "@/apis/counseling/counselingApi";

export default function useMyCounselings() {
  return useQuery({
    queryKey: ["counselings", "my"],
    queryFn: () => counselingApi.getMyCounselings(),
  });
}
