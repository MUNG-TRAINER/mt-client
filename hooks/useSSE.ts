import {useEffect, useRef, useState} from "react";

export type UseSSEOptions = {
  shouldConnect?: boolean;
  onMessage?: (data: unknown, ev?: MessageEvent) => void;
  onOpen?: () => void;
  onError?: (err?: unknown) => void;
  queryParams?: Record<string, string>;
};

export default function useSSE(url: string, opts: UseSSEOptions = {}) {
  const {shouldConnect = true, onMessage, onOpen, onError, queryParams} = opts;
  const esRef = useRef<EventSource | null>(null);
  const retryRef = useRef(0);
  const reconnectTimeout = useRef<number | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!shouldConnect) return;

    const buildUrl = () => {
      try {
        const u = new URL(
          url,
          typeof window !== "undefined"
            ? window.location.origin
            : "http://localhost"
        );
        if (queryParams)
          Object.entries(queryParams).forEach(([k, v]) =>
            u.searchParams.set(k, v)
          );
        return u.toString();
      } catch (e) {
        return url;
      }
    };

    const start = () => {
      const url = buildUrl();
      const finalUrl = url;
      const es = new EventSource(finalUrl, {
        withCredentials: true,
      } as EventSourceInit);
      console.log("hello :: ", es);
      esRef.current = es;

      es.onopen = () => {
        retryRef.current = 0;
        setConnected(true);
        onOpen?.();
      };

      es.onmessage = (ev) => {
        try {
          const parsed = JSON.parse(ev.data);
          onMessage?.(parsed, ev);
        } catch {
          onMessage?.(ev.data, ev);
        }
      };

      es.onerror = (err) => {
        setConnected(false);
        onError?.(err);
        // EventSource auto-reconnects, but if closed explicitly, schedule a manual reconnect
        if (es.readyState === EventSource.CLOSED) scheduleReconnect();
      };
    };

    const scheduleReconnect = () => {
      const attempt = ++retryRef.current;
      const delay = Math.min(30_000, 1000 * Math.pow(2, Math.min(6, attempt)));
      if (reconnectTimeout.current)
        window.clearTimeout(reconnectTimeout.current);
      reconnectTimeout.current = window.setTimeout(() => {
        start();
      }, delay) as unknown as number;
    };

    start();

    return () => {
      if (reconnectTimeout.current)
        window.clearTimeout(reconnectTimeout.current);
      if (esRef.current) {
        esRef.current.close();
        esRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, shouldConnect, JSON.stringify(queryParams)]);

  return {connected};
}
