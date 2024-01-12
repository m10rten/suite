const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: ["@mvdlei/log", "@mvdlei/env"],
};

module.exports = withContentlayer(nextConfig);
