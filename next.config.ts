import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
        //pathname: '',
      },
      {
          protocol: 'https',
          hostname: 'pbs.twimg.com',
          port: '',
          //pathname: '',
        },
        {
          protocol: 'https',
          hostname: 'ipfs.subsocial.network',
          port: '',
          //pathname: '',
        },
        {
          protocol: 'https',
          hostname: 'www.rapu.xyz',
          port: '',
          //pathname: '',
        },
        {
          protocol: 'https',
          hostname: 'img.youtube.com',
          port: '',
          //pathname: '',
        },
    ],
  },
};

export default nextConfig;
