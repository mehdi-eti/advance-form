import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    validators: 'src/validators/index.ts',
    components: 'src/components/index.tsx',
  },
  format: ['cjs', 'esm'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: true,
  splitting: true,
  shims: true,
  external: ['react', 'react-dom', 'shadcn-ui'],
});
