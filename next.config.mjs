/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/v1/api:path*', // API istekleri için proxy tanımı
            destination: 'http://185.9.37.6:8080/v1/api:path*', // Backend'in HTTP adresi
          },
        ];
      },
};

export default nextConfig;
