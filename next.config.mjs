/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // or remove if you plan to optimize later
    domains: ["images.unsplash.com"], // 👈 add this line
  },
}

export default nextConfig
