"use client";

import Image from "next/image";
import { Tabs } from "../ui/tabs";
import AboutDao from "./AboutDao";
import Services from "./Services";
import JoinUs from "./JoinUs";
import Team from "./Team";

export function AboutTabs() {
  const tabs = [
    {
      title: "About",
      value: "about",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10  border bg-black">
          <h1 className="text-xl md:text-4xl font-bold text-white text-center my-4">👋 About Ai web3</h1>
        <AboutDao  />
        </div>
      ),
    },
    {
      title: "Services",
      value: "services",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p className="text-xl md:text-4xl font-bold text-white text-center my-4">Services tab</p>
        <Services  />
        </div>
      ),
    },
    {
      title: "Join Us",
      value: "joinus",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10  border bg-black">
          <p className="text-xl md:text-4xl font-bold text-white text-center my-4">🥳 How to Join</p>
         <JoinUs  />
        </div>
      ),
    },
    {
      title: "Team",
      value: "team",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10  border bg-black">
          <p className="text-xl md:text-4xl font-bold text-white text-center my-4">⛱ Ai web3 Team</p>
         <Team  />
        </div>
      ),
    },
   /* {
      title: "Random",
      value: "random",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Random tab</p>
          <DummyContent />
        </div>
      ),
    },*/
  ];

  return (
    <div className="h-[70vh] md:h-[45rem] [perspective:1000px] relative b flex flex-col max-w-6xl mx-auto w-full  items-center justify-center my-4">
      <Tabs tabs={tabs} />
    </div>
  );
}

const DummyContent = () => {
  return (
    <Image
      src="/linear.webp"
      alt="dummy image"
      width="1000"
      height="1000"
      className="object-cover object-left-top h-[60%]  md:h-[90%] absolute -bottom-10 inset-x-0 w-[90%] rounded-xl mx-auto"
    />
  );
};
