/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        REVO_API_URL: process.env.REVO_API_URL,
    }
}

module.exports = nextConfig
