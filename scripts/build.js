const pkg = require('../package.json');
const { build } = require('esbuild');
const { resolve } = require('path');

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: [resolve(__dirname, '../src/index.ts')],
  outfile: resolve(__dirname, '../dist/bundle.js'),
  minify: true,
  sourcemap: false,

  define: { 'process.env.NODE_ENV': `"${process.env.NODE_ENV}"` },
  target: 'es2022',
  platform: 'node',
  color: true,
  bundle: true,
};

build(options)
  .then(() => {
    console.log('Build completed!');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
