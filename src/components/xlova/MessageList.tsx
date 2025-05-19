"use client";

import { useEffect, useState } from "react";
import { FB_DB } from "@/lib/fbClient";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { motion } from "framer-motion";
import Link from "next/link";
import styles from "./styles.module.css";

interface Message {
  id: string;
  name: string;
  tweetLink: string;
  message: string;
  timestamp: number;
  tippedAmount: number;
  isTweet: boolean;
}

const MessageList: React.FC = () => {
  const [notTweetedMessages, setNotTweetedMessages] = useState<Message[]>([]);
  const [tweetedMessages, setTweetedMessages] = useState<Message[]>([]);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [totalTippedAmount, setTotalTippedAmount] = useState<number>(0);

  useEffect(() => {
    const messagesQuery = query(
      collection(FB_DB, "xLOVA"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const messageList: Message[] = [];
        let tippedSum = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const tippedAmount = Number(data.tippedAmount) || 0; // Ensure tippedAmount is a number
          messageList.push({
            id: doc.id,
            name: data.name || "Anonymous",
            tweetLink: data.tweetLink || "",
            message: data.message || "",
            timestamp: data.timestamp || Date.now(),
            tippedAmount: tippedAmount,
            isTweet: data.isTweet || false,
          });
          tippedSum += tippedAmount; // Add to the running sum
        });

        const notTweeted = messageList.filter((msg) => !msg.isTweet);
        const tweeted = messageList.filter((msg) => msg.isTweet);

        setNotTweetedMessages(notTweeted);
        setTweetedMessages(tweeted);
        setTotalTippedAmount(tippedSum); // Update the total tipped amount
      },
      (error) => {
        console.error("Error fetching messages:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  const truncateMessage = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const toggleMessage = (messageId: string) => {
    setExpandedMessages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(messageId)) {
        newSet.delete(messageId);
      } else {
        newSet.add(messageId);
      }
      return newSet;
    });
  };

  const renderMessageList = (messages: Message[], title: string) => (
    <div className={styles.sectionWrapper}>
      <h3 className={styles.sectionHeading}>{title}</h3>
      {messages.length === 0 ? (
        <p className={styles.paragraph}>No messages in this category yet.</p>
      ) : (
        <ul className={styles.messageListUl}>
          {messages.map((msg, index) => {
            const isExpanded = expandedMessages.has(msg.id);
            const displayedMessage = isExpanded
              ? msg.message
              : truncateMessage(msg.message, 100);

            return (
              <motion.li
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={styles.messageCard}
              >
                <div className={styles.messageHeader}>
                  <div className={styles.nameWrapper}>
                    <strong className={styles.textBlue400}>{msg.name}</strong>
                    <span
                      className={`${styles.tweetStatus} ${
                        msg.isTweet ? styles.tweetPosted : styles.tweetNotPosted
                      }`}
                    >
                      {msg.isTweet ? "Tweeted" : "Not Tweeted"}
                    </span>
                  </div>
                  <span className={styles.paragraph}>
                    {new Date(msg.timestamp).toLocaleString()}
                  </span>
                </div>
                <p className={`${styles.paragraph} ${styles.messageText}`}>
                  {displayedMessage}
                  {msg.message.length > 100 && (
                    <button
                      onClick={() => toggleMessage(msg.id)}
                      className={styles.readMoreButton}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
                {msg.tweetLink && msg.tweetLink.includes("x.com") ? (
                  <Link
                    href={msg.tweetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${styles.button} ${styles.bgPurple600} ${styles.roundedFull} ${styles.fontSemibold} px-4 py-2 hover:${styles.bgPurple700}`}
                  >
                    View Tweet on X
                  </Link>
                ) : (
                  <p className={styles.paragraph}>No tweet link available</p>
                )}
              </motion.li>
            );
          })}
        </ul>
      )}
    </div>
  );

  return (
    <div className={styles.messageList}>
      <h2 className={styles.messageListHeading}>X Support (Total Tipped Amount: <span className={styles.textBlue400}>{totalTippedAmount.toLocaleString()} $LOVA, #tweets: {tweetedMessages.length})</span></h2>
      {renderMessageList(notTweetedMessages, "Messages Ready to Tweet")}
      {renderMessageList(tweetedMessages, "Tweeted Messages")}
    </div>
  );
};

export default MessageList;