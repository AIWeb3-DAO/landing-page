module.exports = {
    output: "standalone", // Ensures standalone mode for deployments
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
  }
