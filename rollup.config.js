import typescript from 'rollup-plugin-typescript2'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from 'rollup-plugin-babel'
import {terser} from 'rollup-plugin-terser'
import react from 'react'

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.js',
    format: 'esm',
    name: 'r2c'
  },
  plugins: [
    resolve(),
    commonjs({
      include: /node_modules/,
      namedExports: {
        react: Object.keys(react),
      },
    }),
    typescript({
      'clean': true,
      'tsconfigOverride': {
        compilerOptions: {
          declaration: true
        }
      }
    }),
    babel({ runtimeHelpers: true }),
    // terser(),
  ],
  external: ['react', 'spritejs'],
}
