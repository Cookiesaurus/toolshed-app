/** @type {import('next').NextConfig} */
const nextConfig = {

  compiler: {
    styledComponents: true
  },
      images: {
        remotePatterns: [
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
