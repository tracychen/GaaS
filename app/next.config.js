/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  experimental: { appDir: true },
  env: {
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
    APP_ENV: process.env.APP_ENV,
    MULTIBAAS_API_KEY: process.env.MULTIBAAS_API_KEY,
    SCROLL_ALPHA_NETWORK_RPC_URL: process.env.SCROLL_ALPHA_NETWORK_RPC_URL,
    MUMBAI_NETWORK_RPC_URL: process.env.MUMBAI_NETWORK_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
});
