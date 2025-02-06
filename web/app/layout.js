import { Geist, Geist_Mono, DM_Serif_Text } from "next/font/google";
import "./globals.css";
import Navbar from "./components/shared/Navbar";

// Import Geist Sans and Mono fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Import DM Serif Text font (specify weight explicitly)
const dmSerifText = DM_Serif_Text({
  weight: "400", // Specify available weight
  variable: "--font-dm-serif-text",
  subsets: ["latin"],
});

export const metadata = {
  title: "PokeTCGTracker",
  description: "Keep a track of your Pokemon Cards",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${dmSerifText.variable} antialiased h-full`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}