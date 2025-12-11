import type {Metadata} from "next";
import {Do_Hyeon, Nanum_Gothic} from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/shared/globalNav/GlobalNav";
import HeaderBar from "@/components/shared/header/HeaderBar";
import HeaderNav from "@/components/shared/header/HeaderNav";
import Wallpapaer from "@/components/shared/wallpaper/Wallpaper";
import QueryProvider from "@/components/queryProvider/QueryProvider";

const nanumGothicFont = Nanum_Gothic({
  variable: "--font-nanum-gothic",
  style: "normal",
  weight: ["400", "700", "800"],
});
const doHyeonFont = Do_Hyeon({
  variable: "--font-dohyeon",
  style: "normal",
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | 댕스쿨",
    default: "댕스쿨 | 댕스쿨",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${nanumGothicFont.variable} ${doHyeonFont.variable} antialiased relative overflow-x-hidden`}
      >
        <Wallpapaer>
          <section className="flex flex-col justify-between min-w-[430px] min-h-full ">
            <HeaderBar className="bg-(--mt-blue)">
              <HeaderNav />
            </HeaderBar>
            <QueryProvider>
              <main className="flex-1 flex p-6">{children}</main>
            </QueryProvider>
            <GlobalNav />
          </section>
        </Wallpapaer>
      </body>
    </html>
  );
}
