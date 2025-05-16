import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";

// Font configuration
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DiaryVio - Your voice, your story, your AI companion",
  description: "DiaryVio is a voice-powered digital diary platform that combines traditional journaling with advanced AI companionship.",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${playfair.variable} ${poppins.variable}`}>
      {children}
    </div>
  );
}
