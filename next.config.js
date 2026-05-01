/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // Common Service — media library uploads
      {
        protocol: "http",
        hostname: "localhost",
        port: "5003",
        pathname: "/**",
      },
      // Add your production Common Service domain here when deploying
      // { protocol: "https", hostname: "api.example.com", pathname: "/**" },
    ],
  },
  async rewrites() {
    return [
      // Proxy specific auth endpoints to backend, but not NextAuth routes
      {
        source: "/api/auth-backend/:path*",
        destination: `${process.env.AUTH_SERVICE_BASE_URL || "http://localhost:5001"}/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
