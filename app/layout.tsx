import type { Metadata } from "next";
import { Geist, Geist_Mono, Karla } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const karla = Karla({
  variable: '--font-karla',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Game Maker's Club",
  description: "University of Melbourne's Game Maker's Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${karla.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <Header />
            <div className="flex-1">
              {children}
            </div>
          <Footer />  
        </div>   
      </body>
    </html>
  );
}
