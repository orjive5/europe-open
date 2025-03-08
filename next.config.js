/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
            {
                protocol: 'https',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'http',
                hostname: 'img.youtube.com',
            },
            {
                protocol: 'https',
                hostname: '**.example.com',
            },
        ],
    },
}

module.exports = nextConfig