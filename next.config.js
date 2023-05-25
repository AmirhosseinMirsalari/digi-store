/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "www.digikala.com",
      "dkstatics-public.digikala.com",
      "iili.io",
      "digikala.arvanvod.com",
      "encrypted-tbn0.gstatic.com",
      "digikala.arvanvod.ir",
    ],
  },
};

module.exports = nextConfig;
