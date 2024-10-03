import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    // Add the MiniCssExtractPlugin only in production mode
    if (!dev && !isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }

    return config;
  },
};

export default nextConfig;
