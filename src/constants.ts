export const IPFS_GATEWAY = "https://ipfs.subsocial.network/ipfs/"
export const placeholderImg = `https://pbs.twimg.com/media/GMA73SDbgAAR3tx?format=jpg&name=4096x4096`


export const ecosystems = [
    {
        name: "Polkadot",
        logo: "/img/Polkadot_Logo.png"
    },
    {
        name: "Kusama",
        logo: "/img/Kusama_Logo.png"
    },
    {
        name: "ajuna",
        logo: "/img/Ajuna_Logo.png"
    },
    {
        name: "Bifrost",
        logo: "/img/Bifrost_Logo.png"
    },
    {
        name: "astar",
        logo: "/img/Astar_Logo.png"
    },
    {
        name: "Centrifuge",
        logo: "/img/Centrifuge_Logo.png"
    },
    {
        name: "InvArch",
        logo: "/img/InvArch_Logo.png"
    },
    {
        name: "vara",
        logo: "/img/Vara_Logo.png"
    },
    // {
    //     name : "pilimec",
    //      logo : "/img/Subwallet_Logo.png"
    // },
    {
        name: "Sub wallet",
        logo: "/img/Zeitgeist_Logo.png"
    },

]

export const investors = [
    {
        name: "Polkadot",
        logo: "/img/Polkadot_Logo.png"
    },
    {
        name: "Kusama",
        logo: "/img/Kusama_Logo.png"
    },
    {
        name: "Tanssi",
        logo: "/img/Tanssi_Logo.png"
    },
    {
        name: "Sub wallet",
        logo: "/img/Subwallet_Logo.png"
    },
    {
        name: "Astar network",
        logo: "/img/Astar_Logo.png"
    },
    {
        name: "Bifrost",
        logo: "/img/Bifrost_Logo.png"
    },
    {
        name: "Centrifuge",
        logo: "/img/Centrifuge_Logo.png"
    },
    {
        name: "InvArch",
        logo: "/img/InvArch_Logo.png"
    },
    {
        name: "Zeitgeist",
        logo: "/img/Zeitgeist_Logo.png"
    },
    {
        name: "Neurolanche",
        logo: "/img/Neurolanche_Logo.png"
    },
    // {
    //     name : "Polimec",
    //      logo : "https://pbs.twimg.com/profile_images/1648609268097007621/zLCEEksk_400x400.jpg"
    // },
    // {
    //     name : "Appilon",
    //      logo : "https://pbs.twimg.com/profile_images/1580202528515543044/FKkX06AB_400x400.jpg"
    // },
]


export const tipTier = [
    { amount: 1, name: "Big up", emoji: "🖐️" },
    { amount: 5, name: "High Five", emoji: "🖐️" },
    { amount: 10, name: "Perfect Ten", emoji: "🔟" },
    {
        amount: 15, name: "Sweet Spot", emoji: "🎯"
    },
    { amount: 20, name: "Twenties Twist", emoji: "💫" },
    { amount: 25, name: "Silver Splash", emoji: "🌊" },
    { amount: 30, name: "Thrifty Thrill", emoji: "🎈" },
    { amount: 35, name: "Lucky Leap", emoji: "🍀" },
    { amount: 40, name: "Fab Forty", emoji: "💃" },
    { amount: 45, name: "Cheers Charm", emoji: "🥂" },
    { amount: 50, name: "Golden Give", emoji: "🌟" },
    { amount: 55, name: "Fifty-Five Fling", emoji: "💃" },
    { amount: 60, name: "Sixty Sparkle", emoji: "✨" },
    { amount: 65, name: "Radiant Rise", emoji: "☀️" },
    { amount: 70, name: "Heavenly Help", emoji: "😇" },
    { amount: 75, name: "Joyful Jump", emoji: "🌈" }, { amount: 80, name: "Energetic Eighty", emoji: "💥" },
    { amount: 85, name: "Breezy Boost", emoji: "🌬️" },
    { amount: 90, name: "Nifty Ninety", emoji: "🎩" },
    //{ amount: 95, name: "Vibrant Victory", emoji: "🏆" },
    //{ amount: 100, name: "Century Celebration", emoji: "🎉" }
];

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
export const SUPABASE_URL_CLIENT = rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`;
export const SUPABASE_NON_KEY_URL = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//export const logo= "https://pbs.twimg.com/profile_images/1637269369658171392/CHS2SlUh_400x400.jpg"
export const logo = "/img/logo.png"
export const polkadot_logo = "/img/Polkadot_Logo.png"
export const PLACE_HOLDER = `https://ipfs.subsocial.network/ipfs/bafybeiezgdmkzq3pou4z2vapf2kgje3dstk6fsgm4fx5zpgsd6ygdjpxea`




export const fireBaseConfigInfo = {
    API_KEY: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    AUTH_DOMAIN: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    BUCKET_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    SENDER_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
    MEASUREMENT_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID
}