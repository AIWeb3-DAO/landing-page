import React from 'react'
import WalletSubmission2 from '@/components/videos/WalletSubmission2';

export default function JoinUs() {
  return (
    <div className="join-us-container text-white bg-gray-800 p-6 rounded-lg shadow-lg h-[90vh] overflow-y-auto">
      {/* Tutorial for Joining AIWeb3 */}
      <div className="tutorial-section mb-6">
        <h2 className="text-2xl font-semibold mb-4">Tutorial after Joining AIWeb3</h2>

        {/* Step-by-Step Text Guide */}
        <div className="text-tutorial mb-6">
          <h3 className="text-xl font-semibold mb-2">Step-by-Step Guide</h3>
          <ol className="list-decimal ml-6 space-y-4">
            <li>
              If you haven't joined the AIWeb3 Discord, join{" "}
              <a
                href="https://discord.com/invite/pQtZG8UQfk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                AIWeb3 Discord server
              </a>.
            </li>
            <li>
              After joining Discord, go to the #bot-channel here:{" "}
              <a
                href="https://discord.com/channels/1069016441854099489/1070795846712578068"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                AIWeb3 Discord bot channel
              </a>{" "}
              and copy and paste the following command to submit your substrate address:
              <div className="bg-gray-700 p-2 rounded mt-2 text-sm font-mono">
                <code>!添加地址 substrate 5xxxxxx</code>
              </div>
              <span className="text-sm">
                Replace <code>5xxxxxx</code> with your substrate address, which must start with "5" and is valid within the Polkadot ecosystem.
              </span>
              If everything went well, you should obtain the 紫粉L0 role (your name should appear in purple). This is essential to ensure future reward distribution.
            </li>
            <li>
              If you have any questions, feel free to ask in the English channel for help:{" "}
              <a
                href="https://discord.com/channels/1069016441854099489/1168217790910574622"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 underline"
              >
                AIWeb3 Discord English channel
              </a>.
            </li>
          </ol>

          <p>-----------------------------------------------------------------------------</p>

          {/* Instructions for LOVA */}
          <hr className="my-4" />
          <div className="instructions">
            <h2 className="text-2xl font-semibold mb-4">How to Find Your LOVA Reward</h2>
            <ol className="list-decimal ml-6 space-y-4">
              <li>
                Go to Hydration and use the referral code <b>AIWeb3</b> if you haven’t joined yet:{" "}
                <a href="https://hydradx.io/AIWEB3" className="text-blue-500 underline">
                  https://hydradx.io/AIWEB3
                </a>.
              </li>
              <li>Enable Degen Mode (click MEMEPAD on the top bar to enable it).</li>
              <li>
                Visit Crosschain on Hydration:{" "}
                <a
                  href="https://app.hydration.net/cross-chain?referral=AIWEB3"
                  className="text-blue-500 underline"
                >
                  https://app.hydration.net/cross-chain?referral=AIWEB3
                </a>. Select LOVA on AssetHub as the source chain and transfer it to Hydration.
              </li>
              <li>
                Click WALLET on the top bar, and you can swap assets here:{" "}
                <a href="https://app.hydration.net/trade/swap" className="text-blue-500 underline">
                  https://app.hydration.net/trade/swap
                </a>.
              </li>
            </ol>
            <p className="text-yellow-500 mt-4">
              LOVA tokens are minted only when an equivalent amount of DOT is added to the pool. For example, if 1 DOT swaps for 7500 LOVA tokens, 7500 LOVA will only be sent after adding 1 DOT to the pool.
            </p>
          </div>

          <p>-----------------------------------------------------------------------------</p>

          {/* Instructions for LOVE on Tanssi */}
          <hr className="my-4" />
          <div className="instructions">
            <h2 className="text-2xl font-semibold mb-4">How to Find Your LOVE Token on Tanssi Network</h2>
            <ol className="list-decimal ml-6 space-y-4">
              <li>
                Option 1: Use Polkadot.js:{" "}
                <a
                  href="https://polkadot.js.org/apps/?rpc=wss://dancebox-3135.tanssi-api.network#/accounts"
                  className="text-blue-500 underline"
                >
                  https://polkadot.js.org/apps/?rpc=wss://dancebox-3135.tanssi-api.network#/accounts
                </a>.
              </li>
              <li>
                Option 2: Use SubWallet:{" "}
                <a href="https://www.subwallet.app/" className="text-blue-500 underline">
                  https://www.subwallet.app/
                </a>. Go to settings, manage networks, and import the network using the following URL:
                <code className="block mt-2 bg-gray-700 p-2 rounded">wss://dancebox-3135.tanssi-api.network</code>
              </li>
            </ol>
            <p className="text-yellow-500 mt-4">
              LOVE tokens are capped at 1M, 100% reserved for the community! You can only receive them via airdrops (Tanssi or AIWeb3 events) or by supporting content creators (use <code>!tipCreator</code> on AIWeb3 Discord).
            </p>
          </div>
          <p>-----------------------------------------------------------------------------</p>

          <br></br>
          <WalletSubmission2 videoId="pdKXDUW8eqsi9nbJSfFL" /> 

          {/* Video Tutorials */}
          <hr className="my-4" />
          <div className="video-tutorials">
            <h3 className="text-xl font-semibold mb-2">
              Video: How to Create a JS Wallet and Find Your Substrate Address
            </h3>
            <iframe
              className="w-full h-[400px] rounded-lg mb-4"
              src="https://www.youtube.com/embed/q7JNpbZCFU8"
              title="How to create a JS wallet and find the substrate address"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h3 className="text-xl font-semibold mb-2">
              Video: How to Get a Substrate Address Using SubWallet
            </h3>
            <iframe
              className="w-full h-[400px] rounded-lg mb-4"
              src="https://www.youtube.com/embed/xpSwD8Q_RDs"
              title="How to get a substrate address using SubWallet"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h3 className="text-xl font-semibold mb-2">中文教程：如何使用 SubWallet 找到 Substrate 地址</h3>
            <iframe
              className="w-full h-[400px] rounded-lg mb-4"
              src="https://www.youtube.com/embed/xpSwD8Q_RDs"
              title="中文教程：如何使用 SubWallet 找到 Substrate 地址"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <h3 className="text-xl font-semibold mb-2">中文教程：如何通过 JS 找到 Substrate 地址</h3>
            <iframe
              className="w-full h-[400px] rounded-lg mb-4"
              src="https://www.youtube.com/embed/8YuLYBMaQMs"
              title="中文教程：如何通过 JS 找到 Substrate 地址"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}





