/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'aglawfirm.co', pathname: '/wp-content/uploads/**' }]
  }
};

export default nextConfig;
