import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavbarDemo } from "@/components/TopNavbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/graphql/client";
import Footer from "@/components/Footer";
import NextTopLoader from 'nextjs-toploader';
import { UserContextProvider } from "@/components/UserContext";
const inter = Inter({ subsets: ["latin"] });
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Head from "next/head";
import { Header } from "@/components/auth/header";

export const metadata = {
  title: "AIWeb3 Dao",
   description : "AIWeb3 is a decentralized media initiative that offers the platform for creators to earn tokens for their content. ",
   canonical : "https://www.canonical.ie/",
   openGraph: {
    title: 'Discover Polkadot | Parachains',
    description: 'Ai web3 is a decentralized media initiative that offers the platform for creators to earn tokens for their content.',
    images : [
      {
        url: 'https://zfijyshxzcpbcrofuptf.supabase.co/storage/v1/object/public/quests_platform/Discover%20Polkadot.png',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
      {
        url: 'https://zfijyshxzcpbcrofuptf.supabase.co/storage/v1/object/public/quests_platform/Discover%20Polkadot.png',
        width: 800,
        height: 600,
        alt: 'Og Image Alt',
      },
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
 
   
    <html lang="en">
      <body  className={`${inter.className}  w-full bg-black text-gray-200`}>

   
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
   
   <NextTopLoader />
      {children}
      <Footer  />
     
      </ThemeProvider>
     
      </body>
     
    </html>
  
  );
}
