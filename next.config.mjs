/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure compatibility with Vercel
  reactStrictMode: true,
  // Disable static optimization issues
  output: undefined,
  // Ensure proper transpilation
  transpilePackages: [],
};

export default nextConfig;  
