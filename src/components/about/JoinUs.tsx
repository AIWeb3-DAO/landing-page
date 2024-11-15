import React from 'react'
import WalletSubmission2 from '@/components/videos/WalletSubmission2';

export default function JoinUs() {
  return (
    <div className="join-us-container text-white bg-gray-800 p-6 rounded-lg shadow-lg h-[90vh] overflow-y-auto">
      {/* Tutorial for Joining AIWeb3 */}
      <div className="tutorial-section mb-6">

        <h2 className="text-2xl font-semibold mb-4">Tutorial after joining AIWeb3</h2>

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

              <li>
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
              </a>{" "}
            </li>

            {/* Instructions */}
            <p>------------------------------------------------</p>
            <div className="instructions">
              <h2 className="text-2xl font-semibold mb-4">How to find your LOVA reward</h2>
              <p>Step 1: Go to Hydration, use the refer code AIWeb3 if you have not join it yet: <a href="https://hydradx.io/AIWEB3" className="text-blue-500 underline">https://hydradx.io/AIWEB3</a>
              <p>Step 2: Make sure you enable to Degen mode (on the top bar, click MEMEPAD to enable it)</p>
              <p>Step 3: Click the WALLET on the top bar if you already have it, and you can swap here: <a href="https://app.hydration.net/trade/swap" className="text-blue-500 underline">https://app.hydration.net/trade/swap</a></p>
              </p>
              <p className="text-yellow-500">Only minted by adding the same amount of DOT tokens to the pool, so in the hydration pool, if 1 DOT can swap 7500 LOVA token, we would send 7500 LOVA token only when we put 1 DOT into the pool.</p>
            </div>  
            <p>------------------------------------------------</p>    
            <br></br>
            {/* Instructions */}
            <p>------------------------------------------------</p>
            <div className="instructions">
              <h2 className="text-2xl font-semibold mb-4">How to find your LOVE token on Tanssi network</h2>
              <p>Option 1: Go to js: <a href="https://polkadot.js.org/apps/?rpc=wss://dancebox-3135.tanssi-api.network#/accounts" className="text-blue-500 underline">https://polkadot.js.org/apps/?rpc=wss://dancebox-3135.tanssi-api.network#/accounts</a>
            
              <p>Option 2: Use subwallet: <a href="https://www.subwallet.app/" className="text-blue-500 underline">https://www.subwallet.app/</a>. In settings, manage network and import network, provide the following URL: wss://dancebox-3135.tanssi-api.network</p>
              </p>

              <p className="text-yellow-500">In total, 1M LOVE tokens, 100% for community! You can only get it from airdrop (Tanssi event or AIWeb3 event) or support content creators (use !tipCreator on AIWeb3 discord to support content creators using your points)</p>
            </div>  
            <p>------------------------------------------------</p>  
            <WalletSubmission2 videoId="pdKXDUW8eqsi9nbJSfFL" />  
            <br></br>
            <p><b>Reference video tutorial for finding out the substrate address</b></p>            

            {/* Video Tutorials */}
            
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
                title="How to get substrate address using SubWallet"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              <h3 className="text-xl font-semibold mb-2">
                中文教程如何使用subwallet找到substrate地址
              </h3>
              <iframe
                className="w-full h-[400px] rounded-lg mb-4"
                src="https://www.youtube.com/embed/xpSwD8Q_RDs"
                title="How to get substrate address using SubWallet"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>      

              <h3 className="text-xl font-semibold mb-2">
                中文教程如何通过js找到substrate地址
              </h3>
              <iframe
                className="w-full h-[400px] rounded-lg mb-4"
                src="https://www.youtube.com/embed/8YuLYBMaQMs"
                title="How to get substrate address using "
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>                 

            </li>
          

          </ol>
        </div>
      </div>
    </div>
  );
}




