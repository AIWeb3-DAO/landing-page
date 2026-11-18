module.exports = {
  apps: [
    {
      name: "landing-page",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      env: { NODE_ENV: "production" },
    },
    {
      name: "update-time",
      script: "server/updateTIME.mjs",
    },
  ],
};
