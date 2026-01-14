/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'etmacvkfvawmyxleqdgz.supabase.co',
      },
    ],
  },
  /* config options here */
};

export default nextConfig;
