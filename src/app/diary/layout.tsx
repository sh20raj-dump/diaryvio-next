import type { Metadata } from "next";
import { Inter } from "next/font/google";

// Font configuration
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DiaryVio - Your Digital Diary",
  description: "Document your life through voice, search your memories, and interact with your AI companion.",
};

export default function DiaryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.variable} font-sans`}>
      {children}
    </div>
  );
}
