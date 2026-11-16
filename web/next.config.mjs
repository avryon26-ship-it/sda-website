/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  trailingSlash: false,
  images: { formats: ['image/avif', 'image/webp'], deviceSizes: [360, 480, 640, 828, 1080, 1280, 1600], minimumCacheTTL: 31536000 },
  // Old .php URLs and /index.php are added in the SEO phase (see docs/seo-redirect-map.md).
};
export default nextConfig;
