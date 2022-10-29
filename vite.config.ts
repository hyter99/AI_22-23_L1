import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { checker } from 'vite-plugin-checker';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       jsxRuntime: 'automatic',
//     }),
//     checker({
//       typescript: {
//         tsconfigPath: './tsconfig.vite.json',
//       },
//     }),
//   ],
//   root: __dirname + '/src/frontend',
//   publicDir: __dirname + '/src/frontend/public',
//   build: {
//     outDir: __dirname + '/.vite',
//   }
// });

export default defineConfig(({mode, command}) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return {
    plugins: [
      react({
        jsxRuntime: 'automatic',
      }),
      checker({
        typescript: {
          tsconfigPath: './tsconfig.vite.json',
        },
      }),
    ],
    root: __dirname + '/src/frontend',
    publicDir: __dirname + '/src/frontend/public',
    build: {
      outDir: __dirname + '/.vite',
    },
    //envDir: __dirname + "/.env"
  }
});
