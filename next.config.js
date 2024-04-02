/** @type {import('next').NextConfig} */
const nextConfig = {
      images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'cdn.dummyjson.com',
            port: '',
            pathname: '/**/**',
          },
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**/**',
          },
          {
            protocol: 'https',
            hostname: 'myturn-prod-images-in.s3-us-west-2.amazonaws.com',
            port: '',
            pathname: '/**/**'
          },
          {
            protocol: 'https',
            hostname: 'seachtoolshedimages.s3.us-east-2.amazonaws.com',
            port: '',
            pathname: '/**/**'
          }
        ],
      },
}

module.exports = nextConfig
