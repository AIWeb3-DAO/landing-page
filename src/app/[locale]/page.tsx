import Image from "next/image";
import {useTranslations} from 'next-intl';
import LocaleSwitcher from "@/components/LocalSwitcher";
import { Inter } from 'next/font/google'
import TopNavbar from "@/components/TopNavbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Vision from "@/components/Vision";
import Parteners from "@/components/Parteners";
import {unstable_setRequestLocale} from 'next-intl/server';


type Props = {
  params: {locale: string};
};
const inter = Inter({ subsets: ['latin'] })
 // Enable static rendering

export default function Home({params: {locale}}: Props) {

  unstable_setRequestLocale(locale);
  
  const t = useTranslations('Hero');
  const b = useTranslations('Buttons');
  const a = useTranslations('About');
  const v = useTranslations('vision');
  const p = useTranslations('parteners');


  return (
    <main className={`flex flex-col items-center justify-between  bg-[url("/img/stars.svg")] bg-gray-900 ${inter.className} text-gray-300`}>
    <TopNavbar  />
   <Hero title={t("title")} subtitle={t("subtitle")} joinBtn={b("join")} partenerBtn={b("partener")} />
   <About intro={a("intro")} title_1={a("title_1")} title_2={a("title_2")} />
   <Vision title={v("title")} subtitle={v("subtitle")} />
   <Parteners title={p("title")} subtitle={p("subtitle")} />
  <p>hello  world</p>
    </main>
  );
}
