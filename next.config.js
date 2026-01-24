/**
 * Next.js Configuration
 * @type {import('next').NextConfig}
 */
module.exports = {
  output: "standalone", // Ensures standalone mode for deployments
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'pbs.twimg.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.subsocial.network',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.rapu.xyz',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'img.youtube.com',
        port: '',
      },
    ],
  },
}
