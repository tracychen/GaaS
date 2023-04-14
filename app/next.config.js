/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    MULTIBAAS_API_KEY: process.env.MULTIBAAS_API_KEY,
  },
};

module.exports = nextConfig;
