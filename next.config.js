/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: process.env.NODE_ENV === "production" ? "/xlang-website" : "",
  assetPrefix: process.env.NODE_ENV === "production" ? "/xlang-website" : "",
};

module.exports = nextConfig;
