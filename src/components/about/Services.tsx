import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LuHelpingHand } from "react-icons/lu";

export default function Services() {
  const stats = [
    {
      discordHandle: "zj2945978",
      polkadotAddress: "5EgvLaGZDwNPyebuLdvHLcpNxXn6uuN35s1SDfDmLHRuhgsQ",
      xp: 1700,
      rewardDOT: 3,
      rewardAIWeb: 200,
    },
    {
      discordHandle: "zy3185622",
      polkadotAddress: "5FnS189wF7YsqHhhpaYidCKYDw6DesvedUFL2qdr9Wumczg4",
      xp: 1690,
      rewardDOT: 3,
      rewardAIWeb: 200,
    },
    {
      discordHandle: "zxn8172",
      polkadotAddress: "5Enutyya9sqsy1fW7JB5yBeZF9x6sRqL9g7SCbtyZdHTtFvB",
      xp: 1690,
      rewardDOT: 3,
      rewardAIWeb: 200,
    },
    {
      discordHandle: "thirteenx__",
      polkadotAddress: "5ECYyZgp4dhSWVMZUbNBTxk4aHZPfFBGLpfZp7Be5EeU5zhs",
      xp: 1670,
      rewardDOT: 3,
      rewardAIWeb: 200,
    },
    {
      discordHandle: "dragonchris",
      polkadotAddress: "5GN5cniJ1GMG1wW9CGshnkdCb2JdXU5xHxNG7EemsAzDk3D5",
      xp: 1650,
      rewardDOT: 3,
      rewardAIWeb: 200,
    },
    {
      discordHandle: "kyrie_aiweb3",
      polkadotAddress: "5HQnYq6SMhSa3pHonMvcVrH4QeS2GcECS65nfqjdcrD9Jtg7",
      xp: 1650,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "peaches5483",
      polkadotAddress: "5GTgJWA4qWWoYAWX9Nmmdb6hxnVPrGeV6kQMnLaFMo67gfnB",
      xp: 1620,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "jackyh1211",
      polkadotAddress: "5Dbxq2qXFoi2W8bdoEtDtSebqvXJq7uFZRNcrfBx2tmFd4aT",
      xp: 1580,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "pishuai",
      polkadotAddress: "5HKfUsimJ5km5uvVbAexzz16pM9nZMmcbPBNPQ31XL6MSEh6",
      xp: 1520,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "rossnash7966",
      polkadotAddress: "5CYD2eNrcayh6k5winZFh6KdYjuWkEMK5y27meKAZcKUS2Yw",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "michelepalumbo5827",
      polkadotAddress: "5GTyK7ogRDCE7hsbAsAPxG21xg4GPQxewjZaAkj8r1yCXAUA",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "baptistenolet",
      polkadotAddress: "5FeiSaBHBnW8tp4fcad6N74j5evnEu1aY2yQNiyJZhkvfyLa",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "georgeevan2569",
      polkadotAddress: "5Ebi25ZCxvi5xYrUTFMTcnyXb5fs7JW1zi7Q76Zeubiu1r6b",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "joelpowell2835",
      polkadotAddress: "5EsyJjDcxFGhaBPRZMGVLne1zah7q8KdD8mvmQbSQQ61J6Mm",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "brittalindgren7933",
      polkadotAddress: "5G4cJLz17brtZb7XVN3rvfiozar3uQ4DposTs8N9jWj1v2rc",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "lisaschreiber.",
      polkadotAddress: "5ChWadS183nbLwtvXXMVET6Zcz1cycgi4fn2Cm8isb4L82rw",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "hawkinsjayden_",
      polkadotAddress: "5Fe8yeMRdjpfLtRYgTWQSRWVcCRUiimUi8UePWT15mL76AfN",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "peterlester5860",
      polkadotAddress: "5Fh6LisxJmxL4Kiu9hMgjXTXHnz1A2B4qFfjdfXeWBBNtPgg",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "boonejane.",
      polkadotAddress: "5DjoNBSddvXSjjvy7jDLdCPS2Ec31yJqZZPmenVmZmHdDeUy",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "arnaldosanti_",
      polkadotAddress: "5DMF5qbCqjdfB8XCsbdmSuKBW1GXvYUx127aiAbXrGoxwjw1",
      xp: 1490,
      rewardDOT: 2,
      rewardAIWeb: 100,
    },
    {
      discordHandle: "juanacosta1051",
      polkadotAddress: "5FhQrtsDrWLyU5zoH624HNrMrnNFyEwqZJtTc51CLyTfA2ug",
      xp: 1490,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "cisels",
      polkadotAddress: "5CG4GbmgY4zEcdNwJGCyu1syunwAkq47niAqBKjCgf3VXEh1",
      xp: 1480,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "jeffli0716",
      polkadotAddress: "5H1EU89jjTbUEshBSts5URnuR5GWdMeA4fBQ3Fv6J3jp1fFU",
      xp: 1370,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "antonsundberg.",
      polkadotAddress: "5HBnngtd7ZvpHeWyG49ztYFaWqVRowUayPmJeo5DoQBeUSHH",
      xp: 1210,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "jat1168",
      polkadotAddress: "5CMA1yC3B4VdqRMpxrjm8tZgSgQy96wY15A71uwn8AD3XJNq",
      xp: 1170,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "mariannarizzi.",
      polkadotAddress: "5HWGT4LgRnroCQqnDHvNYPKHb5i5LeT2fUWfVK68BbB3gK3D",
      xp: 1140,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "jennykingz",
      polkadotAddress: "5G7CoyRJQT21rFq8FAyRssc3ghsRZe17zZDjgXMu5gMaJBxi",
      xp: 1130,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "contrerasalfredo.",
      polkadotAddress: "5F1zrRiwrrdwayZ2iiNhr859WMhDQCq4D9kwNtCRi4byW7HY",
      xp: 970,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "ramonmendez2160",
      polkadotAddress: "5EhrGFUArD2cLwS1z4xHj1XTqfpuKC9cpGBr5jCXmuuqFzpi",
      xp: 960,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "alfstromberg.",
      polkadotAddress: "5EvHMxj9ZiUxPPQGK8crY2fsD1F3FV4sJTPGvsSLtiQCmfTr",
      xp: 880,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "thibaultmartin6250",
      polkadotAddress: "5HDpH7Ck6GjAvgubpEdGo9CGBiSmW2edgVDjRsY3LtFsqs6p",
      xp: 780,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "futo2023#6811",
      polkadotAddress: "5DfDotEmm32Kg9BFEehi4WRrNXzukBsLsXVK5VQLFxDfmSaL",
      xp: 680,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "jietester",
      polkadotAddress: "5HYKh3ALtiSQcwNzbYC3m97WRWbQ1sbokE1u1ykVdHZ9iFCX",
      xp: 650,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "dr.cao",
      polkadotAddress: "5CkWjh9tdPkJCFVmbSknjDk8MVuUinhu6fCnbu6DVxggLpbv",
      xp: 590,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "simonmarie_",
      polkadotAddress: "5DM15R241aWbjXBRbHk9HupenzvqQUkXNGbNLEDsfRk7dfxM",
      xp: 580,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "elvisoge2023",
      polkadotAddress: "5FjjAu7GTzBc7eH8fmq1xVHAAifpjXim2JXVAYCd1mdTGvqe",
      xp: 520,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "succs2023",
      polkadotAddress: "5FW2dozyP26snhi6ssivnudVeEvJ4nqbX7S3AqsBZ6WYNQtz",
      xp: 510,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "ngozii2023",
      polkadotAddress: "5CDrEKVL3st6rBWBowDEj8ED7Gfuyu1WJCWnxocfuVfGx67z",
      xp: 500,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "benita_2023",
      polkadotAddress: "5D7XxDjuT1BSEz9f6qeUutdK3oy8Q3BroKvs5v1x8gGDzpa8",
      xp: 500,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "arinze_2023",
      polkadotAddress: "5GC291auwNa4wD8E5q4Yw26KTTaHQAxb8ZW9aLM17n2hCg1d",
      xp: 490,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "restnet",
      polkadotAddress: "Not found",
      xp: 480,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "yamito_2023",
      polkadotAddress: "5G9EaTFM7Z2S4QhYXBfqRxT54PbpN75137iDnXhoDn9hK8by",
      xp: 480,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "nebu_2023",
      polkadotAddress: "5Do9MSmLoCRTznnuuqJXzwCBxvyCjCrH8NqKWUSN4EpzAtTE",
      xp: 470,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "dababy_123456",
      polkadotAddress: "Not found",
      xp: 450,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "watersmelvyn1257",
      polkadotAddress: "5HKfUsimJ5km5uvVbAexzz16pM9nZMmcbPBNPQ31XL6MSEh6",
      xp: 450,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "botellaelena.",
      polkadotAddress: "5CFrHYqKARJRYjAAEGd9Y7SsPMv7w6UMUpyboF3zeJcFqXmJ",
      xp: 440,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "dotever",
      polkadotAddress: "5CZh43voYeYx3PgtYgL5PzoNs3VZLqLmHKXYX61X9fyYPBQM",
      xp: 290,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "oneln",
      polkadotAddress: "5DaLQzMt5MjXScHS6myyEwtY9u4HeFKFZKfsh3TXphcNBVMw",
      xp: 290,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "liupeng.",
      polkadotAddress: "5HjjKq6J198DiW1PgVDG9cK946rAKJ5tstM3Xvzb1fS7VVnD",
      xp: 270,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    {
      discordHandle: "alicewen",
      polkadotAddress: "5C8VumbGx4KoJCdAf5ptMz48wCFzv4dJbGkJ6fJap2wVS76t",
      xp: 210,
      rewardDOT: 1,
      rewardAIWeb: 50,
    },
    // Add the rest of the entries here following the same structure
  ];

  return (
    <div className='w-full h-full flex items-center justify-center'>
        <h2>Aug. open ambassador reward</h2>
        <Dialog>
          <DialogTrigger>
            <div className='items-center gap-2 hover:text-text-primary cursor-pointer flex'>
              <LuHelpingHand className='w-6 h-6' />
              <p className='text-sm font-semibold'>Click here to check</p>
            </div>
          </DialogTrigger>
          <DialogContent className='bg-gray-900'>
            <DialogHeader>
              <DialogTitle className='mb-4'>Contributors</DialogTitle>
              <DialogDescription>
                <div className=''>
                  <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                    <table className='min-w-full bg-gray-800 text-white'>
                      <thead>
                        <tr>
                          <th className='px-4 py-2'>Discord Handle</th>
                          <th className='px-4 py-2'>Polkadot Address</th>
                          <th className='px-4 py-2'>XP</th>
                          <th className='px-4 py-2'>Reward DOT</th>
                          <th className='px-4 py-2'>Reward AIWeb</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats.map((item, i) => (
                          <tr key={i} className='border-t border-gray-700'>
                            <td className='px-4 py-2'>{item.discordHandle}</td>
                            <td className='px-4 py-2'>{item.polkadotAddress}</td>
                            <td className='px-4 py-2'>{item.xp}</td>
                            <td className='px-4 py-2'>{item.rewardDOT}</td>
                            <td className='px-4 py-2'>{item.rewardAIWeb}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
  );
}

