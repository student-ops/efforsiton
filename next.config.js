/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    basePath: "/efforsition",
    images: {
        domains: ["avatars.githubusercontent.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/u/**",
            },
        ],
    },
}

module.exports = nextConfig
