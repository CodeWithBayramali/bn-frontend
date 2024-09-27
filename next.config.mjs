/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*', // API istekleri için proxy tanımı
            destination: 'http://185.9.37.6:8080/api/:path*', // Backend'in HTTP adresi
          },
        ];
      },
};

export default nextConfig;
