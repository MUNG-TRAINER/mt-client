"use client";

import useSSE from "@/hooks/useSSE";
import useCheckLoggedIn from "@/hooks/afterLogin/users/useCheckLoggedIn";
import {useEffect} from "react";

export default function SSEListener() {
  const {data} = useCheckLoggedIn();
  const userId = data && "userId" in data ? data.userId : null;

  const subscribeUrl = "http://localhost:8080/api/notifications/subscribe";

  const {connected} = useSSE(subscribeUrl, {
    shouldConnect: !!userId,

    onMessage: (data) => {
      // handle notification payload
      console.log("SSE notification:", data);
      // TODO: dispatch to zustand/react-query or show toast
    },
    onError: (e) => console.error("SSE error", e),
  });

  useEffect(() => {
    if (connected) console.debug("SSE connected");
  }, [connected]);

  return null;
}
