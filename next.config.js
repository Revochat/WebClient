/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        REVO_API_URL: process.env.REVO_API_URL,
        REVO_CLIENT_URL: process.env.REVO_CLIENT_URL,
        REVO_CDN_URL: process.env.REVO_CDN_URL,
    },

    images: {
        domains: ['localhost', 'api.revochat.org'],
    },
}

module.exports = nextConfig
