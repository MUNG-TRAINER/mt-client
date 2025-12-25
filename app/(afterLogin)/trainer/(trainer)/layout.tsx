import {API_BASE_URL} from "@/util/env";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {ReactNode} from "react";
async function getLoggedIn() {
  const cookie = await cookies();
  const res = await fetch(`${API_BASE_URL}/auth/check`, {
    method: "GET",
    headers: {
      Cookie: cookie.toString(),
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return await res.json();
}
export default async function TrainerModeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const loggedInResponse = await getLoggedIn();
  const role = loggedInResponse?.data?.role ?? loggedInResponse?.role;
  if (role !== "TRAINER") {
    redirect("/");
  }
  return <>{children}</>;
}
