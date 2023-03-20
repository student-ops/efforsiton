/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = {
    images: {
        domains: ["avatars.githubusercontent.com"],
    },
}
module.exports = {
    images: {
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
