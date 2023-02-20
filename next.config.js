/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['tsx', '!.test.ts(x)'],
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
    largePageDataBytes: 1024 * 10000,
  },
};

module.exports = nextConfig;
