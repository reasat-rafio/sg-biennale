/** @type {import('next').NextConfig} */

const STUDIO_REWRITE = {
  source: "/studio/:path*",
  destination:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3333/studio/:path*"
      : "/studio/index.html",
};

const ContentSecurityPolicy = `
  default-src 'self' 'unsafe-inline' 'unsafe-eval' *.userway.org cdn.sanity.io https://66wl3wil.api.sanity.io;
  script-src 'self' 'unsafe-inline' 'unsafe-eval'  https://www.google-analytics.com https://www.googletagmanager.com;
  child-src 'none';
  font-src 'self' fonts.gstatic.com  data:;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com; 
  base-uri 'self';
  frame-ancestors 'self';
  frame-src 'self' https://www.youtube.com https://www.onemap.gov.sg;
  img-src 'self' cdn.sanity.io 66wl3wil.api.sanity.io https://www.google.com https://www.google-analytics.com https://stats.g.doubleclick.net; 
  connect-src 'self' https://66wl3wil.api.sanity.io https://www.google-analytics.com https://www.google-analytics.com https://stats.g.doubleclick.net;
  media-src 'self' cdn.sanity.io;
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

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  rewrites: async () => [STUDIO_REWRITE],
};
