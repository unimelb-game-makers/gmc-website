import type { Metadata } from "next";
import localFont from 'next/font/local';
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
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const akira = localFont({
  src: "./fonts/Akira/AkiraExpandedDemo.otf",
  variable: "--font-akira",
});

const arsenica = localFont({
  src: [
    { path: "./fonts/Arsenica/ArsenicaTrial-Light.ttf", weight: "300" },
    { path: "./fonts/Arsenica/ArsenicaTrial-Regular.ttf", weight: "400" },
    { path: "./fonts/Arsenica/ArsenicaTrial-Medium.ttf", weight: "500" },
    { path: "./fonts/Arsenica/ArsenicaTrial-Demibold.ttf", weight: "600" },
    { path: "./fonts/Arsenica/ArsenicaTrial-Bold.ttf", weight: "700" },
    { path: "./fonts/Arsenica/ArsenicaTrial-Extrabold.ttf", weight: "800" },
  ],
  variable: "--font-arsenica",
});

const tasaOrbiter = localFont({
  src: "./fonts/TASAOrbiter/TASAOrbiter-VariableFont_wght.ttf",
  variable: "--font-tasa-orbiter",
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
        className={`${geistSans.variable} ${geistMono.variable} ${karla.variable} ${akira.variable} ${arsenica.variable} ${tasaOrbiter.variable} font-tasa-orbiter antialiased`}
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
