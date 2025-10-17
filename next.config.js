/**
 * CommonJS wrapper for next.config.ts to improve compatibility in some environments (Vercel build)
 */
const { createRequire } = require('module');
const requireModule = createRequire(import.meta ? import.meta.url : __filename);

try {
  // Try to load the TypeScript config if present
  const tsConfig = requireModule('./next.config.ts');
  module.exports = tsConfig && tsConfig.default ? tsConfig.default : tsConfig;
} catch (e) {
  // Fallback: basic config
  module.exports = {
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
}
