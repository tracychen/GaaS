/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MULTIBAAS_API_KEY: process.env.MULTIBAAS_API_KEY,
    SCROLL_ALPHA_NETWORK_RPC_URL: process.env.SCROLL_ALPHA_NETWORK_RPC_URL,
    MUMBAI_NETWORK_RPC_URL: process.env.MUMBAI_NETWORK_RPC_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};

module.exports = nextConfig;
