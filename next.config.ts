import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⚠️ Cela permet à Vercel de builder même si ESLint trouve des erreurs
    ignoreDuringBuilds: true,
  },
  // Tu peux ajouter d’autres options ici si besoin
};

export default nextConfig;