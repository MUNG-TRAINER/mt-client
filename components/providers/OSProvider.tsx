"use client";

import getOS from "@/util/getOS";
import {useEffect} from "react";

export default function OSProvider() {
  useEffect(() => {
    const os = getOS();
    document.body.dataset.os = os;
  }, []);
  return null;
}
