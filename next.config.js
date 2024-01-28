/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        REVO_API_URL: process.env.REVO_API_URL,
    }
}

module.exports = nextConfig
