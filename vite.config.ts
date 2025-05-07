import { resolve as pathResolve } from 'path';

const resolve = (path: string) => pathResolve(__dirname, path);

// vite.config.js
export default {
  base: '/a-star',
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      '@': resolve('src'),
    },
  },
};
