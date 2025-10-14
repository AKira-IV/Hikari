/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  experimental: {
    typedRoutes: true,
  },
  eslint: {
    dirs: ['app', 'components', 'lib', 'config'],
  },
  // Optimizaciones para sistemas con poca memoria
  webpack: (config, { isServer }) => {
    // Limitar el uso de memoria de webpack
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          default: {
            minChunks: 1,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: -10,
          },
        },
      },
    };
    
    return config;
  },
  // Configuración para desarrollo con poca memoria
  ...(process.env.NODE_ENV === 'development' && {
    swcMinify: false, // Deshabilitar minificación en desarrollo
    compiler: {
      removeConsole: false,
    },
  }),
};

export default nextConfig;
