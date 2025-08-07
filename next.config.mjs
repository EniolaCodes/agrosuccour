// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;
/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "f005.backblazeb2.com",
        pathname: "/file/agrosuccour-assets/**", // Adjust the path as needed
      },
    ],
  },
};

export default nextConfig;
