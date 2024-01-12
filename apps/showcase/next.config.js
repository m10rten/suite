const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: [
    "@mvdlei/log",
    "@mvdlei/env",
    "@mvdlei/hooks",
    "@mvdlei/tzod",
    "@mvdlei/types",
  ],
};

module.exports = withContentlayer(nextConfig);
