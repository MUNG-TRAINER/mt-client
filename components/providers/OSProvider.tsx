"use client";

import getOS from "@/util/getOS";
import { useEffect } from "react";

export default function OSProvider() {
  useEffect(() => {
    try {
      const os = getOS();
      if (document.body) {
        document.body.dataset.os = os;
      }
    } catch (error) {
      console.error("OS 감지 중 에러:", error);
    }
  }, []);

  return null;
}
