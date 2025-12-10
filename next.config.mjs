import bundleAnalyzer from '@next/bundle-analyzer';
import { createMDX } from 'fumadocs-mdx/next';
import createNextIntlPlugin from 'next-intl/plugin';

// 看清楚：这里的路径必须和你实际文件一致！！
// 如果你的 request.ts 不在这个位置，需要告诉我目录
const withNextIntl = createNextIntlPlugin('./src/core/i18n/request.ts');
const withMDX = createMDX();
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.VERCEL ? undefined : 'standalone',
  reactStrictMode: false,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
      },
    ],
  },
  async redirects() {
    return [];
  },
  turbopack: {
    resolveAlias: {},
  },
  experimental: {
    turbopackFileSystemCacheForDev: true,
    ...(process.env.VERCEL ? {} : { mdxRs: true }),
  },
  reactCompiler: true,
};

// 将多个插件按顺序“包裹”在一起
export default withNextIntl(
  withMDX(
    withBundleAnalyzer(nextConfig)
  )
);
