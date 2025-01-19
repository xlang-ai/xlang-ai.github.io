/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === "production" ? "/xlang-website" : "",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false;
      config.resolve.fallback.net = false;
      config.resolve.fallback.child_process = false;
      config.resolve.fallback.dns = false;
      config.resolve.fallback.tls = false;
    }
    return config;
  },
};

module.exports = nextConfig;
