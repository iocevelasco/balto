/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  experimental: {
    appDir: true,
  },
  //output: "standalone",
  reactStrictMode: true,
  swcMinify: true,
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
    },
  },
  images: {
    domains: ['i.imgur.com', 'strapi-content-webv3.s3.amazonaws.com', 'erdesarrollo.com.ve'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
    ],
  },
  webpack (config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/,
        use: ['@svgr/webpack', 'url-loader'],
      },
    )

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i

    config.resolve.alias['@'] = path.join(__dirname, './src')
    config.resolve.alias['@/*'] = path.join(__dirname, './src/*')
    config.resolve.alias['@/components'] = path.join(
      __dirname,
      './src/components',
    )
    config.resolve.alias['@/components/*'] = path.join(
      __dirname,
      './src/components/*',
    )
    config.resolve.alias['@/utils'] = path.join(
      __dirname,
      './src/app/utils',
    )
    config.resolve.alias['@/utils/*'] = path.join(
      __dirname,
      './src/utils/*',
    )
    config.resolve.alias['@/services/*'] = path.join(
      __dirname,
      './src/app/services/*',
    )

    return config
  },
}

module.exports = nextConfig
