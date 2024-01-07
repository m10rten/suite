const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  // transpilePackages: ["@mvdlei/ui"],
};

module.exports = withContentlayer(nextConfig);
