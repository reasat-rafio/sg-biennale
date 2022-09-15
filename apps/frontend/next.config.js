/** @type {import('next').NextConfig} */

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

const ContentSecurityPolicy = `
  default-src 'self' https://66wl3wil.api.sanity.io;
  child-src 'none';
  font-src 'self' https://fonts.googleapis.com  data:;
  img-src 'self' cdn.sanity.io; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline' data: https://fonts.googleapis.com/css2; 
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
