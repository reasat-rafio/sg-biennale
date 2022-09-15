/** @type {import('next').NextConfig} */

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

const ContentSecurityPolicy = `
  default-src 'self';
  child-src http://localhost:3000;
  style-src 'self' http://localhost:3000;
  font-src 'self';  
  script-src 'self' 'unsafe-inline' *.sanity.io;
  style-src 'self' 'unsafe-inline' *.sanity.io
`;
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

module.exports = {
  reactStrictMode: true,
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ["raw-loader", "glslify-loader"],
    });

    return config;
  },
  images: {
    domains: ["cdn.sanity.io"],
  },

  // async headers() {
  //   return [
  //     {
  //       source: "/:path*",
  //       headers: securityHeaders,
  //     },
  //   ];
  // },
  rewrites: async () => [STUDIO_REWRITE],
};
