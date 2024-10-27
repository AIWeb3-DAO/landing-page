import TopNavbar from "@/components/navbar/top-navbar";
import { brands } from "@/constants";
import { TwitterLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" font-[family-name:var(--font-geist-sans)]  mx-auto ">
      <TopNavbar   />
      <div className="w-full min-h-screen flex flex-col items-center justify-center ">
         <div className="max-w-2xl flex flex-col items-center justify-center">
          <h1 className="text-5xl text-center font-medium my-4">Where developers <br />  
          <span className="text-purple-500">suffer together</span>
          </h1>
          <p className="text-center text-2xl font-thin">We know how hard it is to be a developer. It doesn’t have to be. <br />
          Personalized news feed, dev communities and search, much better than what’s out there. Maybe ;)</p>

          <div className="py-4 px-6 rounded-lg border my-5 max-w-sm w-48 flex items-center justify-center bg-white ">
            <p className="text-black">Join us</p>
          </div>
         </div>

          <section  className=" h-screen w-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/img/back-1.svg'), url('/img/bg-stars.svg')",
              }}
          >
        
          <div className="max-w-6xl mx-auto max-h-[800px] h-[578px] bg-gradient-to-br from-purple-200 to-purple-500/75 shadow-2xl rounded-xl shadow-blue-500 p-1  ">
           <Image   src={`/img/her-img.png`} width={1000} height={700} alt="cover image" className="rounded-xl w-full object-cover" />
             
          </div>
          
          <div className="max-w-7xl mx-auto my-9 flex justify-between">
             <div className="  overflow-hidden">
               <h1 className="font-medium text-4xl">The world&apos;s best developer <br /> platform for <span className="text-purple-600">staying up to date</span></h1>

                <div className="grid grid-cols-7 max-w-md   animate-slide  border bg-purple-600 gap-4 mt-5">
                  {brands.map((item, i) =>  (
                    <div key={i} className="w-11 h-11 rounded-full border"> lOGO </div>
                  ))}
                </div>
             </div>


             <div className="">
       <div>
        <div>
        <p className="font-thin">Trusted by</p>
         <p className="font-medium text-xl">1000+ Of Parachains</p>
         </div>
         <div className="my-4 grid grid-cols-2 gap-3">
          <div className="p-2 flex flex-col items-center justify-center bg-blue-500/25 rounded-xl">
            <TwitterLogoIcon className="w-12 h-12"  />
            <p className="font-semibold">2k X followers</p>
          </div>
          <div className="p-2 flex flex-col items-center justify-center bg-blue-500/25 rounded-xl">
            <TwitterLogoIcon className="w-12 h-12"  />
            <p className="font-semibold">1k Telegram members</p>
          </div>
          </div>
       </div>
             </div>
          </div>
          </section>
      </div>

     <div className="border-t border-blue-400 h-[60vh] flex items-center justify-center">
       <p>Footer links back-links</p>
     </div>
    </div>
  );
}
