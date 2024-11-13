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

  const stats2 = [
    { discordHandle: "phalaworld", polkadotAddress: "5G3vMz4makCsSusXgVoxtE7HmwSGsyfvLKgxppJWgnsXWKmY", xp: 1970, rewardDot: 3, rewardAIWeb: 200 },
    { discordHandle: "zbj1935", polkadotAddress: "5GZTmjxreMFix11yQDv9oEkSTxbKkkt4dhRr3Bj98vibPQyJ", xp: 1960, rewardDot: 3, rewardAIWeb: 200 },
    { discordHandle: "solver1", polkadotAddress: "5H9ekPqcL9mvAtqzNeLMoQmJREp4MeGNEf2P1u75SqihbHow", xp: 1850, rewardDot: 3, rewardAIWeb: 200 },
    { discordHandle: "mentor67367", polkadotAddress: "5HC7ai1XFmmkRomxQVik3pZmsQX9Z6TLFpPamzMZFtaQkTHw", xp: 1850, rewardDot: 3, rewardAIWeb: 200 },
    { discordHandle: "blessedutu", polkadotAddress: "5HXTaxbpied1zZ14UQQMQioZX72fqeqQrrcKN4ycWpH1V5ER", xp: 1830, rewardDot: 3, rewardAIWeb: 200 },
    { discordHandle: "holp447", polkadotAddress: "5DAgtFVPDVQVDbqRxZpEJvcduF6sYjw4Jft7kBDR62L7BTSt", xp: 1800, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "boizz0421", polkadotAddress: "5Cvbheat5qQPoeNd3B5CXHqRw3aABGCXQD4Qj39L5YKD8GH3", xp: 1800, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "jennykingz", polkadotAddress: "5G7CoyRJQT21rFq8FAyRssc3ghsRZe17zZDjgXMu5gMaJBxi", xp: 1750, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "ebele5", polkadotAddress: "5HA7Drt3byyGfFAZUwjtGW17S28cjybxp9ufJKHiNV6WhCqt", xp: 1740, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "cynthia_n_", polkadotAddress: "5CZ9CFAunKg2x5dHPW1c7Y3xJSdNgbJ4yisQeb6TaZiWVu5p", xp: 1740, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "gipoo_", polkadotAddress: "5CUFNRbsjvisQuVnhRB9WY8rPd6yFkKxYaM5Ngu8prNaPAxQ", xp: 1740, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "ugooo0130", polkadotAddress: "5HBHbxRJ9nFaMJpFdGgjJe7u5dbj7KysxuNfEvBBiy6y6SGX", xp: 1710, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "favour900192", polkadotAddress: "5FAkQGZwwb4XYjxG26GmDxt9Vee6YCLpjNsfijmuiuT8iDob", xp: 1680, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "gollo77.", polkadotAddress: "5H5v6E3PxPSC2t3ZEK7JKeEXUgywtMZJN2cbbZ1jAFwphRcB", xp: 1680, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "dftyyy", polkadotAddress: "5CZzA3U8BrcZEyqvXxPPakrERZDb1FTxV4YWL4kpCJNzDEGg", xp: 1680, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "hasaki66", polkadotAddress: "5HYf9x9RyzQWwpwyq4PL9m4VFtSunecksKtDtfPSuz1NDifA", xp: 1680, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "jeffli0716", polkadotAddress: "5H1EU89jjTbUEshBSts5URnuR5GWdMeA4fBQ3Fv6J3jp1fFU", xp: 1650, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "youre0264", polkadotAddress: "5CJdnWFU84BLDvYVrYqGBZiGdPwpCkHmCSgxKKrdJgGQcdet", xp: 1640, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "hoou556", polkadotAddress: "5DL1Cgcf7FNYcghwbCM3L17LzZ5w3YKiPPxyRV6dSTL9LPm8", xp: 1640, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "jackyh1211", polkadotAddress: "5Dbxq2qXFoi2W8bdoEtDtSebqvXJq7uFZRNcrfBx2tmFd4aT", xp: 1500, rewardDot: 2, rewardAIWeb: 100 },
    { discordHandle: "cisels", polkadotAddress: "5CG4GbmgY4zEcdNwJGCyu1syunwAkq47niAqBKjCgf3VXEh1", xp: 1460, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "zj2945978", polkadotAddress: "5EgvLaGZDwNPyebuLdvHLcpNxXn6uuN35s1SDfDmLHRuhgsQ", xp: 1430, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "dragonchris", polkadotAddress: "5GN5cniJ1GMG1wW9CGshnkdCb2JdXU5xHxNG7EemsAzDk3D5", xp: 1410, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "peaches5483", polkadotAddress: "5GTgJWA4qWWoYAWX9Nmmdb6hxnVPrGeV6kQMnLaFMo67gfnB", xp: 1280, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "anjing9545", polkadotAddress: "5GKi6Fx2niH9tX8daL4qHpxqsyQTNJhEK5ZECtXr2QMmrc27", xp: 1170, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "kyrie_aiweb3", polkadotAddress: "5HQnYq6SMhSa3pHonMvcVrH4QeS2GcECS65nfqjdcrD9Jtg7", xp: 1160, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "ugmo0286", polkadotAddress: "5DCmo1nzJ6jRWrm5qyvgKj5p7LuJh3tCtUUGRbVgnjF979Bt", xp: 1140, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "faithia0943", polkadotAddress: "5EvNqhd2a12tmJ54V9pzTbLzyhkrFN3mYFt3mhkbQ5B2Mcxn", xp: 1100, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "amo198", polkadotAddress: "", xp: 1100, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "stevensu0829", polkadotAddress: "5HjbSKuHubHz6NZotPbUMecMxQDYhBxKMMKJbYVEMCGaR4ME", xp: 1050, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "songito1", polkadotAddress: "5EyTchtRJrAARuuCnezCdQ4ESXQYczkg8zU6i3SAsW86uLZM", xp: 960, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "harydom", polkadotAddress: "5He6vesf11AHz7AatfLqSuifzJcz5L1mNaLmmRFTdmhDEw52", xp: 960, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "harymary114", polkadotAddress: "5He6vesf11AHz7AatfLqSuifzJcz5L1mNaLmmRFTdmhDEw52", xp: 950, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "soomin114", polkadotAddress: "5Gx1CmH4VkvLNrRfVvzNWx6SBSVwGD1oG5gwyZ8tTMPLxgEv", xp: 950, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "harykos", polkadotAddress: "5G8zGd8UAegQYLR5TxosvDWZVWAKigqKqYLZZypF2SXmrSDD", xp: 950, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "futo2023#6811", polkadotAddress: "5DfDotEmm32Kg9BFEehi4WRrNXzukBsLsXVK5VQLFxDfmSaL", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "ngozii2023", polkadotAddress: "5CDrEKVL3st6rBWBowDEj8ED7Gfuyu1WJCWnxocfuVfGx67z", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "yamito_2023", polkadotAddress: "5G9EaTFM7Z2S4QhYXBfqRxT54PbpN75137iDnXhoDn9hK8by", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "nebu_2023", polkadotAddress: "5Do9MSmLoCRTznnuuqJXzwCBxvyCjCrH8NqKWUSN4EpzAtTE", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "benita_2023", polkadotAddress: "5D7XxDjuT1BSEz9f6qeUutdK3oy8Q3BroKvs5v1x8gGDzpa8", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "arinze_2023", polkadotAddress: "5GC291auwNa4wD8E5q4Yw26KTTaHQAxb8ZW9aLM17n2hCg1d", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "elvisoge2023", polkadotAddress: "5FjjAu7GTzBc7eH8fmq1xVHAAifpjXim2JXVAYCd1mdTGvqe", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "abor2023", polkadotAddress: "5FNZZWHX9Zzj1P4FGz1bFDkq54aNZ8HuAc4VaHzTZzNHRRRv", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "succs2023", polkadotAddress: "5FW2dozyP26snhi6ssivnudVeEvJ4nqbX7S3AqsBZ6WYNQtz", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "tyito.", polkadotAddress: "5CeZpA8vSaKpNYwzn74W6jPz9HMnnCZKMdPK91guhrtBtd9a", xp: 850, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "srrrrr0937", polkadotAddress: "5DCKZEj79RXJhYqH7KbMTWGGGxW9da5RvR3sdbmgd2bLsVEn", xp: 820, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "golila0692_41896", polkadotAddress: "5FenGNCSvet8h1GPUrBDH8yke4Q45jvZDfjLK4NiWcYZ8M4D", xp: 820, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "hvvio", polkadotAddress: "5FaZ9BWyK3KcLmne6K2M3ykPmWaYkYtNgSVp2QtQGyKZU6XJ", xp: 820, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "queen_201", polkadotAddress: "5Gv1a7kMcu7Zfoufk7eD3PnHdY5P7Kbpq2yjz6gAuaaFcTBM", xp: 810, rewardDot: 1, rewardAIWeb: 50 },
    { discordHandle: "aapppo", polkadotAddress: "5FYxxgUic8xwzW95V7r4bo1crMK9XrbKPp4Pc428jgX7QdyG", xp: 800, rewardDot: 1, rewardAIWeb: 50 },
 
  ]

  const stats3 = [
    { discordHandle: "pre210.", polkadotAddress: "5FgyUtY3F74diUSZB4VBbR1cZBEAfTuEqgfnDk85UwTekukr", xp: 2640, rewardDot: 6, rewardAIWeb: 45000 },
    { discordHandle: "stella10768", polkadotAddress: "5HnFP9ogWLAR4eBP7XqgD6sp4NcsEa843a4YtGsmi8zp3wuE", xp: 2640, rewardDot: 5, rewardAIWeb: 37500 },
    { discordHandle: "muna065", polkadotAddress: "5FnUZEqhjWjMoQ5YpNgCiZLkXBsgihDBYNtKtqcFSzjTX2Hs", xp: 2630, rewardDot: 4, rewardAIWeb: 30000 },
    { discordHandle: "ayo547", polkadotAddress: "5CaV1qByHY3rVDYqxoHte7ZxLdRk61oisrJ2jSRjhe4u3Pi6", xp: 2630, rewardDot: 3, rewardAIWeb: 22500 },
    { discordHandle: "billing667", polkadotAddress: "5EaAY362gUGEAQ8TqXTDQnfhjFkCeHronBsyzGbNBsogG3sR", xp: 2610, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "infernaldraco", polkadotAddress: "5EjtebwLM4pdjqGiUMoaDH1YgKCRhV8REgQCkwkpMkVMEk74", xp: 2510, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "prevailer0735", polkadotAddress: "Wrong address format", xp: 2400, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "dababy_123456", polkadotAddress: "5FLT9A6f7Tu4E5mYTubpofNL87Xm9qQ2yAuVPZHLcDPweUaC", xp: 2120, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "cynthia22333", polkadotAddress: "5H9C5ho25XDDT6nbXXfSBaHae1kGwg8QXB1hLNcjHTVN3HxX", xp: 2040, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "emmachuks", polkadotAddress: "5C9RhmGJ1D7HEDsUAStybicdRuTvryJ2uvJXv1L8tp65qGtp", xp: 2010, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "rayz0865", polkadotAddress: "5Eq7id5Y3AFeE5sGZxod8uxHZn9H6LVDqhTdZTXJMG823VoM", xp: 2010, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "olisco2233", polkadotAddress: "5ENc6z3ZF2zgdcveAuepmW2rJLcQ61uU1SZuaajLELJsHg2A", xp: 2000, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "gollo77.", polkadotAddress: "5FyKqqq3jo3srss742Jc2k8MdMDEDauLYDhBgC12o2FQtuWA", xp: 1990, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "gipoo_", polkadotAddress: "5F4Ewy99sZayyzZYSbnjEhKM9xjkP2HmRpV7jAbPBJ29uFoG", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "boizz0421", polkadotAddress: "5Cvbheat5qQPoeNd3B5CXHqRw3aABGCXQD4Qj39L5YKD8GH3", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "youre0264", polkadotAddress: "5DfUjBnVZbLpzdp69Gt4yREcpjKu7F7Q6XtaMEaYzrSs4QBP", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "ugmo0286", polkadotAddress: "5DqjfxuVDGvt1i9cqtyGb4swS6F3754pA6FhBhcLn4o1UwBq", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "ugooo0130", polkadotAddress: "5HQGKSqKzqq5BUxu2jriwsATYND73gAtoC4D8CzrHsHnkxtp", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "aapppo", polkadotAddress: "5CSKbPZ8YJFjLt8gDb5KnDRnjVzuBm51w5VYVqBa9j5KkGSz", xp: 1890, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "hoou556", polkadotAddress: "5GnPVHrG8SK5wUR5DfbhMu9xjD3CfrZUgVc5GhscSBDbQEFQ", xp: 1880, rewardDot: 2, rewardAIWeb: 15000 },
    { discordHandle: "dftyyy", polkadotAddress: "5GuRHt486VLjMMTYDF8WySiUq12crZfim1VSMEyUSj2kP7Fj", xp: 1880, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "hvvio", polkadotAddress: "5HTMUyHtEPJU9PJzY5p6AAU9fEEnSbqZduZmpoTFqqHBaCDN", xp: 1880, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "golila0692_41896", polkadotAddress: "5Epm4A4RatmVsXLCQ2vtvrLvHphGriydQUBr8FYpLXaDYHg4", xp: 1880, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "jojoba0038_71152", polkadotAddress: "5HHAYVJ55ZsQzPVZBqz8GBH2JLBSsJvxMEkC6SzDDTgH4Sye", xp: 1880, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "solver1", polkadotAddress: "5DCXZ26YvcmCiDYU8YJ836uJkVhMvCD2oubT4daqzviARopp", xp: 1870, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "holp447", polkadotAddress: "5HBrbRQKDbsbGScZkG77zDaP7EY1mLz9rEj3Y9aGo919MkyK", xp: 1870, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "favour900192", polkadotAddress: "5EoAV3wkah8pr6ikevqDtbwzMYGq2ynmxS2mppLN5z6yoXd2", xp: 1870, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "cynthia_n_", polkadotAddress: "5Dvow7MTWYVEESB6Q8LaimH2Fgsx8jTTrPnAwfqa3ygnqxgC", xp: 1870, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "srrrrr0937", polkadotAddress: "5FeZaybu2GL8UDmtRbyvKwr7VuwVmixNt5nwQ9aXNPFetjcr", xp: 1860, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "mentor67367", polkadotAddress: "5GNRfmQvfRMW5M96DGHECnTQVRFGvq2B3iFbv9sVzokbkVQH", xp: 1850, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "ebele5", polkadotAddress: "5HEqLXJV3RCYdhKJwuKFTSokU2dDWzgWDezdiiGCz7YuqyC3", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "queen_201_57990", polkadotAddress: "5FnncvtdeG6XTAajDxTzgeyoKh24URwmNKsW1WqyYChooXXm", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "songito1", polkadotAddress: "5EyTchtRJrAARuuCnezCdQ4ESXQYczkg8zU6i3SAsW86uLZM", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "harydom", polkadotAddress: "5EyH9Ttc7hDhJ95BPevrr8jfPgk3kczHpTN48KQb3c4nRoUa", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "faithia0943", polkadotAddress: "5EvNqhd2a12tmJ54V9pzTbLzyhkrFN3mYFt3mhkbQ5B2Mcxn", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "blessedutu", polkadotAddress: "5HXTaxbpied1zZ14UQQMQioZX72fqeqQrrcKN4ycWpH1V5ER", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "jeffli0716", polkadotAddress: "5H1EU89jjTbUEshBSts5URnuR5GWdMeA4fBQ3Fv6J3jp1fFU", xp: 1840, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "tyito.", polkadotAddress: "5G46QTQ4s7qTGGEWBwyRMASin7jwXzLQGA1kTj6H5hLt1T9j", xp: 1820, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "harykos", polkadotAddress: "5HanHo4rqxccmohbo6ui5C3JYrXXfT8R8MYkpk2ExYFkqhZJ", xp: 1820, rewardDot: 1, rewardAIWeb: 7500 },
    { discordHandle: "soomin114", polkadotAddress: "5HQXxRXsXRXrLwWFDfCVty9KDmx6veGgbbQMVTTo8aQXMWB5", xp: 1780, rewardDot: 1, rewardAIWeb: 7500 },
  ]


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

        <div style={{ height: '20px' }}></div>
        <br />

        <h2>Sep. open ambassador reward</h2>
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
                        {stats2.map((item, i) => (
                          <tr key={i} className='border-t border-gray-700'>
                            <td className='px-4 py-2'>{item.discordHandle}</td>
                            <td className='px-4 py-2'>{item.polkadotAddress}</td>
                            <td className='px-4 py-2'>{item.xp}</td>
                            <td className='px-4 py-2'>{item.rewardDot}</td>
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

        <div style={{ height: '20px' }}></div>
        <br />

        <h2>Oct. open ambassador reward</h2>
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
                          <th className='px-4 py-2'>LOVA value in DOT</th>
                          <th className='px-4 py-2'>LOVA Reward</th>
                        </tr>
                      </thead>
                      <tbody>
                        {stats3.map((item, i) => (
                          <tr key={i} className='border-t border-gray-700'>
                            <td className='px-4 py-2'>{item.discordHandle}</td>
                            <td className='px-4 py-2'>{item.polkadotAddress}</td>
                            <td className='px-4 py-2'>{item.xp}</td>
                            <td className='px-4 py-2'>{item.rewardDot}</td>
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

