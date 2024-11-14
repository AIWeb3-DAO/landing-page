'use client';

import React, { useState } from 'react';

export default function WalletSubmission({ videoId }) {
  const [walletAddress, setWalletAddress] = useState('');
  const [message, setMessage] = useState('');

  const handleSupport = async () => {
    if (!walletAddress.trim()) {
      setMessage('Please enter a valid wallet address.');
      return;
    }

    try {
      const response = await fetch('/api/support-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoId, walletAddress }),
      });

      if (response.ok) {
        setMessage('Thank you! Your wallet address has been successfully submitted.');
      } else {
        const errorData = await response.json();
        setMessage(`Error: ${errorData.message || 'Failed to submit support.'}`);
      }
    } catch (error) {
      console.error('Error submitting wallet address:', error);
      setMessage('An unexpected error occurred. Please try again.');
    }
  };

  return (
    <div className="w-full px-4 py-6 bg-blue-100">
      <h2 className="text-xl font-semibold text-center text-blue-600">
        Special AIWeb3 X MetaHub Event
      </h2>
      <p className="text-center text-gray-700 my-2">
        If you like this content, please enter your wallet address and click the support button. You can verify your
        contribution at the MetaHub special event.
      </p>
      <div className="flex justify-center items-center space-x-4 mt-4">
        <input
          type="text"
          placeholder="Enter your wallet address"
          value={walletAddress}
          onChange={(e) => setWalletAddress(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded w-1/2"
        />
        <button
          onClick={handleSupport}
          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
        >
          Support
        </button>
      </div>
      {message && (
        <p className={`text-center mt-4 ${message.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
