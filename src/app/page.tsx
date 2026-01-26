import { Hero } from "@/components/Hero";
import { Hero2 } from "@/components/Hero2";
import { JoinMail } from "@/components/MailList";
import { LatestDemo } from "@/components/blogs/Latest";
import Supporters from "@/components/supporters/SupportedBy";
import TrustedBy from "@/components/supporters/TrustedBy";
import Image from "next/image";
import { NavbarDemo } from "@/components/TopNavbar";
import { WishTreeCanvas } from "@/components/wishtree/WishTreeCanvas";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between max-w-7xl mx-auto pt-20">
      <WishTreeCanvas />


      <Hero2 />
      <TrustedBy />
      <Supporters />
      <JoinMail />
    </main>
  );
}
