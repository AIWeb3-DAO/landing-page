"use client";

import React, { useState, useEffect } from "react";
import ShareButtons from "./ShareButtons";
import { HelpingHand } from "lucide-react";
import { FaFire } from "react-icons/fa";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";
import { FB_DB } from "@/lib/fbClient";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TipModal from "./TipModal";
import { ModalProvider, ModalTrigger, ModalBody, ModalContent } from "./ui/animated-modal";
import { timeAgo } from "@/lib/utils";
import { truncateText } from "@/utils/truncateTxt";
import { useWalletContext } from "./wallet-context";
import ConnectWallet from "./wallet-connect/connectWallet";
import { usePathname } from "next/navigation";

// Debug imports
console.log({
  ModalProvider,
  ModalTrigger,
  ModalBody,
  ModalContent,
  TipModal,
  ShareButtons,
  ConnectWallet,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
});

type StatsProps = {
  stats?: any;
  tokenstats?: any;
  createdAt?: any;
  videoId?: any;
  tips?: any;
  viewCounts?: any;
};

export default function FullVideoStats({ stats, tokenstats, createdAt, videoId, tips, viewCounts }: StatsProps) {
  const [isTokenSent, setIsTokenSent] = useState(true);
  const [viewCount, setViewCount] = useState<number | null>(null);
  const { accounts } = useWalletContext();
  const currentDate = new Date();
  const videoCreatedAt = createdAt ? new Date(createdAt) : new Date();
  const diffInMilliseconds = currentDate.getTime() - videoCreatedAt.getTime();
  const diffInHours = diffInMilliseconds / (60 * 60 * 1000);
  const WEBSITE_URL = "https://y.aiweb3.org/";
  const pathname = usePathname();
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);

  const id = videoId || (pathname.startsWith("/videos/") ? pathname.slice(8) : pathname);

  useEffect(() => {
    const incrementAndFetchViews = async () => {
      if (FB_DB && id) {
        try {
          const docRef = doc(FB_DB, "youtube", id);
          await updateDoc(docRef, { views: increment(1) });
          const updatedDoc = await getDoc(docRef);
          if (updatedDoc.exists()) {
            const data = updatedDoc.data();
            setViewCount(data.views || 0);
          } else {
            console.error("Document does not exist");
          }
        } catch (error) {
          console.error("Error incrementing and fetching views:", error);
        }
      }
    };
    incrementAndFetchViews();
  }, [id]);

  console.log("Rendering FullVideoStats, accounts:", accounts);

  return (
    <div className="flex flex-col md:flex-row justify-start md:justify-between md:items-center px-2 border-b border-gray-400/60 dark:border-gray-800 pb-2 my-3">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm dark:text-gray-400 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="xs:text-xs text-blue-500">{createdAt ? timeAgo(createdAt) : "N/A"}</p>
        </div>
        <div className="flex gap-2 items-center text-sm dark:text-gray-400 text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 md:w-5 md:h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
            />
          </svg>
          <p className="text-xs text-blue-500">{viewCount ?? viewCounts ?? "0"} views</p>
        </div>
      </div>

      <div className="flex gap-6 items-center md:justify-center mt-4 md:my-0">
        {accounts && accounts.length > 0 ? (
          ModalProvider ? (
            <ModalProvider>
              <ModalTrigger>
                <div
                  className="flex items-center gap-2 hover:text-text-primary cursor-pointer"
                  onClick={() => setSelectedSupport("LOVE in Tanssi")}
                >
                  <p className="text-sm md:font-semibold bg-black text-white">Support (LOVE in Tanssi)</p>
                </div>
              </ModalTrigger>
              <ModalTrigger>
                <div
                  className="flex items-center gap-2 hover:text-text-primary cursor-pointer"
                  onClick={() => setSelectedSupport("LOVA in ACALA")}
                >
                  <p className="text-sm md:font-semibold bg-black text-white">Support (LOVA in ACALA)</p>
                </div>
              </ModalTrigger>
              <ModalBody>
                <ModalContent>
                  {selectedSupport ? (
                    <TipModal
                      videoId={id}
                      contributorAddress={accounts[0]?.address}
                      supportType={selectedSupport}
                    />
                  ) : (
                    <p className="text-center text-white">Please select a support option</p>
                  )}
                </ModalContent>
              </ModalBody>
            </ModalProvider>
          ) : (
            <p className="text-red-500">Error: ModalProvider is not available</p>
          )
        ) : (
          <>
            <ConnectWallet />
            <button className="py-2 px-4 rounded-xl bg-white text-black">Connect wallet</button>
          </>
        )}

        <Dialog>
          <DialogTrigger>
            <div className="items-center gap-2 hover:text-text-primary cursor-pointer flex">
              <HelpingHand className="w-6 h-6" />
              <p className="text-sm font-semibold">Contributors</p>
            </div>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 max-w-lg">
            <DialogHeader>
              <DialogTitle className="mb-4">Contributors</DialogTitle>
              <DialogDescription>
                <div className="max-h-64 overflow-y-auto">
                  <table className="min-w-full bg-gray-800 text-white">
                    <thead className="sticky top-0 bg-gray-800">
                      <tr>
                        <th className="px-4 py-2">Contributor Address</th>
                        <th className="px-4 py-2">Contributed Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats?.map((item, i) => (
                        <tr key={i} className="border-t border-gray-700">
                          <td className="px-4 py-2">{truncateText(item, 20)}</td>
                          <td className="px-4 py-2">{tokenstats?.[i] ?? "N/A"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}