/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', '!.test.ts(x)'],
};

module.exports = nextConfig;
