import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/TopNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';
import { AuthModalWrapper } from "@/components/auth/AuthModalWrapper";


// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap'
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: 'swap'
});

export const metadata = {
  title: "AIWeb3 Dao",
  description: "AIWeb3 is a decentralized media initiative that offers the platform for creators to earn tokens for their content.",
  canonical: "https://www.canonical.ie/",
  openGraph: {
    title: 'Discover Polkadot | Parachains',
    description: 'Ai web3 is a decentralized media initiative that offers the platform for creators to earn tokens for their content.',
    images: [
      {
        url: 'https://zfijyshxzcpbcrofuptf.supabase.co/storage/v1/object/public/quests_platform/Discover%20Polkadot.png',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} font-sans w-full bg-background text-foreground antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader color="#22d3ee" showSpinner={false} />
          <NavbarDemo />
          {children}
          <Footer />

          <AuthModalWrapper />
        </ThemeProvider>

      </body>
    </html>
  );
}
