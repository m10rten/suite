/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  swcMinify: true,
  reactStrictMode: true,
  transpilePackages: [
    "@mvdlei/log",
    "@mvdlei/env",
    "@mvdlei/hooks",
    "@mvdlei/tzod",
    "@mvdlei/types",
    "@mvdlei/ui",
  ],
};

export default nextConfig;
