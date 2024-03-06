/* @type {import('next').NextConfig} 
const withNextIntl = require("next-intl/plugin")("./i18n.ts");
const nextConfig = {};

export default nextConfig;*/

import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images : {
      remotePatterns : [
        {
          protocol : "https",
          hostname : "pbs.twimg.com",
          
        }
      ]
    }
};
 
export default withNextIntl(nextConfig);
