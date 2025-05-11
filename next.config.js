/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Disable the built-in not-found page generation
  output: "export",
  // Downgrade React to a compatible version
  experimental: {
    esmExternals: "loose",
  },
}

module.exports = nextConfig
