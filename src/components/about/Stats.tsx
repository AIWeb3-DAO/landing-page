import React from 'react'

export default function Stats() {
  return (
    <div className="stats-container text-white bg-gray-800 p-6 rounded-lg shadow-lg">
      {/* Community Stats Table */}
      <div className="community-stats mb-6">
        <h2 className="text-2xl font-semibold mb-4">Community Stats as of Nov. 1, 2024</h2>
        <table className="w-full text-left border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2 text-blue-500">Platform</th>
              <th className="p-2 text-blue-500">Members</th>
              <th className="p-2 text-blue-500">Growth comparing to previous month (+/-)</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-gray-900">
              <td className="p-2">Twitter Followers</td>
              <td className="p-2">23,321</td>
              <td className="p-2">+9,789</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="p-2">Discord Members</td>
              <td className="p-2">8,911</td>
              <td className="p-2">+71</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="p-2">Chinese Telegram</td>
              <td className="p-2">2,911</td>
              <td className="p-2">+50</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="p-2">Subsocial Articles</td>
              <td className="p-2">544 posts</td>
              <td className="p-2">+12</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tanssi network testnet Info */}
      <div className ="w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Tanssi network Appchain testnet</h2>
        <h3>Link: <a href=": https://polkadot.js.org/apps/?rpc=wss://fraa-flashbox-4274-rpc.a.stagenet.tanssi.network">: https://polkadot.js.org/apps/?rpc=wss://fraa-flashbox-4274-rpc.a.stagenet.tanssi.network</a></h3>
        <h3>Total addresses holding LOVE token by Nov. 7: <b>2018</b></h3>
        <p></p>
        <br></br>
      </div>

      {/* Treasury Info */}
      <div className="w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Treasury of AIWeb3</h2>
        <h3>Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT</h3>
        <h3>EVM address: 0xb4e3192EFC4D9eC0489DD1B229a96216F72d3975</h3>
        <table className="w-full text-left border-separate border-spacing-2">
          <thead>
            <tr className="bg-gray-700">
              <th className="p-2">Treasury address</th>
              <th className="p-2">Asset</th>
              <th className="p-2">Note</th>
            </tr>
          </thead>
          <tbody>

          <tr className="bg-gray-900">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                Substrate address (LOVA bot hot wallet address): 5H64sM2q44C39JuzGw5BPAfD7zuexE3X1gdW8ebQbNAQ4ygr
                Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> minted 2904500 LOVA for airdrop and 314 vDOT for all rewards </td>
              <td className="p-2 break-words whitespace-normal max-w-xs">
               For top 6 TG active users in Oct and Content creators in Oct: <a href="https://assethub-polkadot.subscan.io/extrinsic/7593922-2" className="text-blue-500 underline">View transaction</a> <br></br>
               The vDOT minted: <a href="https://hydration.subscan.io/extrinsic/6425096-2" className="text-blue-500 underline">View transaction</a>
              </td>
            </tr>          


          <tr className="bg-gray-900">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> 100 DOT + 888888 LOVA </td>
              <td className="p-2 break-words whitespace-normal max-w-xs">
               For Zealy Reward Oct 2024: <a href="https://hydration.subscan.io/extrinsic/6389531-2" className="text-blue-500 underline">View transaction</a>
              </td>
            </tr>

          <tr className="bg-gray-900">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> + 487.8 BNC</td>
              <td className="p-2 break-words whitespace-normal max-w-xs">
                From Bifrost on 11/11 for Zealy event: <a href="https://bifrost.subscan.io/extrinsic/5904225-2" className="text-blue-500 underline">View transaction</a>
              </td>
            </tr>

            <tr className="bg-gray-900">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> + 1000 Astar</td>
              <td className="p-2 break-words whitespace-normal max-w-xs">
                From Neemo Finance on 10/22 for Zealy event: <a href="https://astar.subscan.io/tx/0x5f316ddc33ee532af8bd9f100e5632b9a2bcb2fcb006e8eac35b104eb3250aa6" className="text-blue-500 underline">View transaction</a>
              </td>
            </tr>
            <tr className="bg-gray-800">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                Substrate address: 5DPVjCxjTHK4MfWf1HBYbqSCXTpyTw5mtijuvjdsttNvWyHT
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> + 2 Neurolanche NFT</td>
              <td className="p-2 break-words whitespace-normal max-w-xs">From Neurolanche</td>
            </tr>
            <tr className="bg-gray-900">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                EVM address: 0xb4e3192EFC4D9eC0489DD1B229a96216F72d3975
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> + 10,796 Astar staked on Neemo Finance</td>
              <td className="p-2 break-words whitespace-normal max-w-xs">From AIWeb3&apos;s own treasury</td>
            </tr>
            <tr className="bg-gray-800">
              <td className="p-2 break-words whitespace-normal max-w-xs">
                EVM address: 0xb4e3192EFC4D9eC0489DD1B229a96216F72d3975
              </td>
              <td className="p-2 break-words whitespace-normal max-w-xs"> + 45 USDT on Polygon</td>
              <td className="p-2 break-words whitespace-normal max-w-xs">From AIWeb3&apos;s own treasury</td>
            </tr>
          </tbody>
        </table>
      </div>

      

    </div>
  );
}


