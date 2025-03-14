const nextConfig = {
    images: {
        formats: ['image/webp', 'image/avif'],
        remotePatterns: [
            // {
            //     protocol: 'https',
            //     hostname: 'cdn.sanity.io',
            //     port: '',
            // },
            // {
            //     protocol: 'https',
            //     hostname: 'img.youtube.com',
            //     port: '',
            // },
            // TODO: take a look into the this later,
            // good practice is to use (only) remotePatterns
            // without domains
            {
                protocol: 'https',
                hostname: '**.example.com',
            },
        ],
        domains: ['img.youtube.com', 'cdn.sanity.io'],
        // todo: added this because reached a limit on a vercel's free tier, maybe upgrade
        unoptimized: true,
    },
}

module.exports = nextConfig