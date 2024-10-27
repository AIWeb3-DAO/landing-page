
import { GrArticle, GrProjects } from "react-icons/gr";
import { MdEventNote } from "react-icons/md";
import { FaRegNewspaper } from "react-icons/fa6";
import { FiBook } from "react-icons/fi";
import { GoHome } from "react-icons/go";
import { GoProject } from "react-icons/go";
import { Newspaper, Video } from "lucide-react";

 export const sidebarItems = [
    {
        title : "Videos",
        icon : Video,
         link : "/home",
     },
     {
        title : "News",
        icon : Newspaper,
         link : "/home/news",
     },
     {
        title : "Blog",
        icon : GrArticle,
         link : "/home/blog",
     },
     {
        title : "Events",
        icon : MdEventNote,
         link : "/home/events",
     },
     
    
 ]


   export const  allCategories = [
    {
        title : "All projects",
         description : "This  is description of project category each project has  its own category",
         link : "all",
         subtracks : ["all"],
        colors : {
            fromColor : "#db2777",
            toColore : "#f43f5e",
            through : "#e879f9"
        },
    },
    {
        title : "Consumer Apps",
         description : "This  is description of project category each project has  its own category",
         link : "consumer",
         subtracks : ["SocialFi"],
        colors : {
            fromColor : "#c026d3",
            toColore : "#e879f9",
            through : "#e879f9"
        },
    },
    {
        title : "Culture",
         description : "This  is description of project category each project has  its own category",
          link : "culture",
          subtracks : ["ecosystem", "education", "music", "market place", "DAO", "art", "metaverse", "NFTs"],

        colors : {
            fromColor : "#16a34a",
            toColore : "#4ade80",
            through : "#e879f9"
        },
    },
    {
        title : "Data",
         description : "This  is description of project category each project has  its own category",
          link : "data",
          subtracks : ["dashboard", "explorer", "data storage", "stats"],
        colors : {
            fromColor : "#0d9488",
            toColore : "#99f6e4",
            through : "#e879f9"
        },
    },
    {
        title : "Defi",
         description : "This  is description of project category each project has  its own category",
          link : "defi",
          subtracks : ["Vaults", "launchpads", "lending", "digital securities"],
        colors : {
            fromColor : "#2563eb",
            toColore : "#38bdf8",
            through : "#e879f9"
        },
    },
    {
        title : "Enterprise",
         description : "This  is description of project category each project has  its own category",
         enterprise : "enterprise",
         subtracks : ["ticketing", "loyalty", "government"],
        colors : {
            fromColor : "#f472b6",
            toColore : "#db2777",
            through : "#e879f9"
        },
    },
    {
        title : "Exchanges",
         description : "This  is description of project category each project has  its own category",
          link : "exchanges",
          subtracks : ["fex" , 'trading', "swaps", "dex", "router"],
        colors : {
            fromColor : "#f43f5e",
            toColore : "#831843",
            through : "#e879f9"
        },
    },
    {
        title : "Gaming",
         description : "This  is description of project category each project has  its own category",
         link : "gaming",
         subtracks : ["battle royale", "casual", "card games", "FPS", "MOBA"],

        colors : {
            fromColor : "#5b21b6",
            toColore : "#9333ea",
            through : "#e879f9"
        },
    },
    {
        title : "Infrastructure",
         description : "This  is description of project category each project has  its own category",
         link : "infrustructure",
         subtracks : ["wallet", "API", "tools", "SDK", "Bridge"],
        colors : {
            fromColor : "#059669",
            toColore : "#14532d",
            through : "#e879f9"
        },
    },
    {
        title : "Launching soon",
         description : "This  is description of project category each project has  its own category",
         link : "comingsoon",

        colors : {
            fromColor : "#ef4444",
            toColore : "#f97316",
            through : "#e879f9"
        },
    },
    {
        title : "Service providers",
         description : "This  is description of project category each project has  its own category",
         link : "services",
         subtracks : ["payments", "dev shop", "identity"],
        colors : {
            fromColor : "#431407",
            toColore : "#f87171",
            through : "#e879f9"
        },
    },
    {
        title : "Parachains",
         description : "This  is description of project category each project has  its own category",
         link : "parachains",
        colors : {
            fromColor : "#a855f7",
            toColore : "#f0abfc",
            through : "#e879f9"
        },
    },
   ]
 export const  projectCategories = [
 
    {
        title : "Consumer Apps",
         description : "This  is description of project category each project has  its own category",
         link : "consumer",
        colors : {
            fromColor : "#c026d3",
            toColore : "#e879f9",
            through : "#e879f9"
        },
    },
    {
        title : "Culture",
         description : "This  is description of project category each project has  its own category",
          link : "culture",
        colors : {
            fromColor : "#16a34a",
            toColore : "#4ade80",
            through : "#e879f9"
        },
    },
    {
        title : "Data",
         description : "This  is description of project category each project has  its own category",
          link : "data",
        colors : {
            fromColor : "#0d9488",
            toColore : "#99f6e4",
            through : "#e879f9"
        },
    },
    {
        title : "Defi",
         description : "This  is description of project category each project has  its own category",
          link : "defi",
        colors : {
            fromColor : "#2563eb",
            toColore : "#38bdf8",
            through : "#e879f9"
        },
    },
 ]


export const brands = [1,2,3,4,5,6,7]
export const  fireBaseConfigInfo =  {
    API_KEY  :  process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    AUTH_DOMAIN : process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    PROJECT_ID: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    BUCKET_ID : process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    SENDER_ID : process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    APP_ID :  process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID,
    MEASUREMENT_ID : process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MEASUREMENT_ID
}

export const ecosystems = [
    {
        name : "Polkadot",
         logo : "/img/Polkadot_Logo.png"
    },
    {
        name : "Kusama",
         logo : "/img/Kusama_Logo.png"
    },
    {
        name : "ajuna",
         logo : "/img/Ajuna_Logo.png"
    },
    {
        name : "Bifrost",
         logo : "/img/Bifrost_Logo.png"
    },
    {
        name : "astar",
         logo : "/img/Astar_Logo.png"
    },
    {
        name : "Centrifuge",
         logo : "/img/Centrifuge_Logo.png"
    },
    {
        name : "InvArch",
         logo : "/img/InvArch_Logo.png"
    },
    {
        name : "vara",
         logo : "/img/Vara_Logo.png"
    },
    // {
    //     name : "pilimec",
    //      logo : "/img/Subwallet_Logo.png"
    // },
    {
        name : "Sub wallet",
         logo : "/img/Zeitgeist_Logo.png"
    },

]


export const investors = [
    {
        name : "Polkadot",
         logo : "https://pbs.twimg.com/profile_images/1675780528992141312/AIth_3GW_400x400.jpg"
    },
    {
        name : "Kusama",
         logo : "/img/Kusama_Logo.png"
    },
    {
        name : "Tanssi",
         logo : "/img/Tanssi_Logo.png"
    },
    {
        name : "Sub wallet",
         logo : "https://pbs.twimg.com/profile_images/1651520550295212037/YUKs0gC5_400x400.jpg"
    },
    {
        name : "Astar network",
         logo : "/img/Astar_Logo.png"
    },
    {
        name : "Bifrost",
         logo : "https://pbs.twimg.com/profile_images/1609115144730345473/Nohy-fN5_400x400.jpg"
    },
    {
        name : "Centrifuge",
         logo : "/img/Centrifuge_Logo.png"
    },
    {
        name : "InvArch",
         logo : "/img/InvArch_Logo.png"
    },
    {
        name : "Zeitgeist",
         logo : "/img/Zeitgeist_Logo.png"
    },   
    {
        name : "Neurolanche",
         logo : "/img/Neurolanche_Logo.png"
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

export const logo = "/img/logo.png"
export const polkadot_logo = "https://pbs.twimg.com/profile_images/1675780528992141312/AIth_3GW_400x400.jpg"