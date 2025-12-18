import type { Metadata } from "next";
import { Do_Hyeon, Nanum_Gothic } from "next/font/google";
import "./globals.css";
import GlobalNav from "@/components/shared/globalNav/GlobalNav";
import HeaderBar from "@/components/shared/header/HeaderBar";
import HeaderNav from "@/components/shared/header/HeaderNav";
import Wallpapaer from "@/components/shared/wallpaper/Wallpaper";
import QueryProvider from "@/components/providers/queryProvider/QueryProvider";
import OSProvider from "@/components/providers/OSProvider";

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
        className={`${nanumGothicFont.variable} ${doHyeonFont.variable} antialiased relative overflow-y-auto`}
      >
        <OSProvider />
        <QueryProvider>
          <Wallpapaer>
            <section className="flex flex-col justify-between max-w-[500px] min-h-full mx-auto md:mr-32">
              <HeaderBar className="bg-(--mt-blue)">
                <HeaderNav />
              </HeaderBar>
              <main
                className={`flex items-center h-[1100px] [body[data-os=android]_&]:h-[750px] [body[data-os=ios]_&]:h-[750px] p-6 overflow-y-auto`}
              >
                {children}
              </main>
              <GlobalNav />
            </section>
          </Wallpapaer>
        </QueryProvider>
      </body>
    </html>
  );
}
