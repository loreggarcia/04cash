import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  transpilePackages: ["@flowpool/types", "@flowpool/ui"],
  outputFileTracingRoot: path.join(__dirname, "../.."),
  experimental: {
    webpackBuildWorker: false
  }
};

export default nextConfig;
