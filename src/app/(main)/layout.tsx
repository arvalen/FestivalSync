import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import QueryProvider from "../../modules/providers/QueryProvider";
import { defaultSEOConfig } from "../../../next-seo.config";
import Sidebar from "@/containers/Sidebar";
import RightSidebar from "@/containers/RightSidebar";
import Header from "@/containers/Header";
import { ProviderReduxToolkit } from "@/modules/providers/redux_provider";
import DndWrapper from "@/modules/providers/DndWrapper";
import { TopButton } from "@/components/TopButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  ...defaultSEOConfig,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <DndWrapper>
          <ProviderReduxToolkit>
            <QueryProvider>
              <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex relative">
                  <div className="w-[300px] sticky top-0 h-screen overflow-y-auto hidden md:block">
                    <Sidebar />
                  </div>
                  <main className="flex-1 min-w-0 flex justify-center px-4">
                    <div className="w-full max-w-[600px]">
                      <Toaster position="top-center" />
                      {children}
                    </div>
                  </main>
                  <div className="w-[300px] sticky top-0 h-screen overflow-y-auto hidden lg:block">
                    <RightSidebar />
                  </div>
                </div>
                <TopButton />
              </div>
            </QueryProvider>
          </ProviderReduxToolkit>
        </DndWrapper>
      </body>
    </html>
  );
}
