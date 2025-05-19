// components/xlova/Form.tsx
"use client";

import { useState, useEffect } from "react";
import { FB_DB } from "@/lib/fbClient";
import { collection, addDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { useWalletContext } from "@/components/wallet-context";
import { Loader2 } from "lucide-react";
import { IoCheckmark } from "react-icons/io5";
import ConnectWallet from "@/components/wallet-connect/connectWallet";
import styles from "./styles.module.css";

const Form: React.FC = () => {
  const { accounts, balances, handleTransferTokens, tippingStates } = useWalletContext();

  const [name, setName] = useState("");
  const [tweetLink, setTweetLink] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const MAX_NAME_LENGTH = 15;
  const MAX_MESSAGE_LENGTH = 250;
  const FIXED_TIP_AMOUNT = 88;               // the same amount of tip
  const TOKEN_TYPE = "LOVA";

  const parseTokenBalance = (balance: string | undefined) => {
    if (!balance || typeof balance !== "string") return 0;
    const [numericPart, unit] = balance.split(" ");
    const value = Number(numericPart) || 0;

    if (!unit) return value;
    if (unit.toLowerCase().includes("k")) {
      return value * 1000;
    } else if (unit.toLowerCase().includes("m")) {
      return value * 1000000;
    } else if (unit.toLowerCase().includes("lova") || unit.toLowerCase().includes("love")) {
      return value;
    }
    return value;
  };

  const safeTokenBalance = parseTokenBalance(balances[TOKEN_TYPE]);
  const isTippingLoading = tippingStates[TOKEN_TYPE].isLoading;
  const isTippingSuccess = tippingStates[TOKEN_TYPE].isSuccess;
  const isWalletConnected = accounts.length > 0;
  const contributorAddress = accounts[0]?.address || ""; // Extract wallet address

  const recipientAddress = "5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT";

  const validateForm = () => {
    if (!name) {
      setError("Name is required");
      return false;
    }
    if (name.length > MAX_NAME_LENGTH) {
      setError(`Name must be ${MAX_NAME_LENGTH} characters or less`);
      return false;
    }
    if (!tweetLink) {
      setError("Tweet link is required");
      return false;
    }
    if (!tweetLink.includes("x.com")) {
      setError("Tweet link must contain 'x.com'");
      return false;
    }
    if (!message) {
      setError("Message is required");
      return false;
    }
    if (message.length > MAX_MESSAGE_LENGTH) {
      setError(`Message must be ${MAX_MESSAGE_LENGTH} characters or less`);
      return false;
    }
    return true;
  };

  const handleTipAndSubmit = async () => {
    // Validate the form before proceeding
    if (!validateForm()) return;

    // Check if the user has enough balance to tip
    if (FIXED_TIP_AMOUNT > safeTokenBalance) {
      setError("Insufficient $LOVA balance to tip 888 LOVA");
      return;
    }

    // Initiate the tip
    await handleTransferTokens({
      token: TOKEN_TYPE,
      amount: FIXED_TIP_AMOUNT,
      recipientAddress,
      videoId: "form-tip",
      contributor: recipientAddress,
    });
  };

  // Effect to handle Firebase update after successful tip
  useEffect(() => {
    const updateFirebase = async () => {
      if (isTippingSuccess && validateForm()) {
        try {
          const messagesRef = collection(FB_DB, "xLOVA");
          await addDoc(messagesRef, {
            name,
            tweetLink,
            message,
            timestamp: Date.now(),
            isTweet: false,
            tippedToken: TOKEN_TYPE,
            tippedAmount: FIXED_TIP_AMOUNT,
            contributorAddress, // Add wallet address to Firebase
          });
          // Reset the form after successful submission
          setName("");
          setTweetLink("");
          setMessage("");
          setError(null);
        } catch (err) {
          console.error("Error submitting message:", err);
          setError("Failed to submit message");
        }
      }
    };

    updateFirebase();
  }, [isTippingSuccess, name, tweetLink, message, contributorAddress]);

  const getTokenName = () => "$LOVA";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={styles.formContainer}
    >
      <h2 className={styles.formContainerHeading}>Support a Content</h2>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>
            Your web3 Name (max {MAX_NAME_LENGTH} characters):
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={MAX_NAME_LENGTH}
            placeholder="Your name"
            className={styles.input}
            required
          />
          <p className={styles.charCounter}>
            {name.length}/{MAX_NAME_LENGTH}
          </p>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="tweetLink" className={styles.label}>
            Tweet Link (must contain x.com):
          </label>
          <input
            type="url"
            id="tweetLink"
            value={tweetLink}
            onChange={(e) => setTweetLink(e.target.value)}
            placeholder="https://x.com/username/status/123"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            Message (max {MAX_MESSAGE_LENGTH} characters):
          </label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={MAX_MESSAGE_LENGTH}
            placeholder="Your message of support"
            className={styles.textarea}
            required
          />
          <p className={styles.charCounter}>
            {message.length}/{MAX_MESSAGE_LENGTH}
          </p>
        </div>

        {isWalletConnected ? (
          <div className={styles.inputGroup}>
            <p className={styles.paragraph}>
              Your Balance: <span className={styles.textBlue400}>{safeTokenBalance.toFixed(2)} {getTokenName()}</span>
            </p>
            <button
              type="button"
              onClick={handleTipAndSubmit}
              disabled={FIXED_TIP_AMOUNT > safeTokenBalance || isTippingLoading || isTippingSuccess}
              className={`${styles.button} ${styles.roundedFull} ${
                FIXED_TIP_AMOUNT <= safeTokenBalance && !isTippingLoading && !isTippingSuccess
                  ? `${styles.bgGreen500} hover:${styles.bgGreen600}`
                  : `${styles.bgGray500} cursor-not-allowed`
              } px-4 py-2 mt-2`}
            >
              {isTippingLoading ? (
                <Loader2 className="w-6 h-6 animate-spin inline-block" />
              ) : isTippingSuccess ? (
                <div className="flex items-center gap-2">
                  <IoCheckmark className="w-6 h-6" />
                  Tipped and Submitted
                </div>
              ) : (
                `Tip ${FIXED_TIP_AMOUNT} ${getTokenName()}`
              )}
            </button>
          </div>
        ) : (
          <div className={styles.inputGroup}>
            <ConnectWallet />
            <button className="py-2 px-4 rounded-xl bg-white text-black">
              Connect wallet
            </button>
          </div>
        )}

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </motion.div>
  );
};

export default Form;