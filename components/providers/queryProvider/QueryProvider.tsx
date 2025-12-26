"use client";

import {customQueryClient} from "@/util/queryClient";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {ReactNode} from "react";

export default function QueryProvider({children}: {children: ReactNode}) {
  return (
    <QueryClientProvider client={customQueryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
