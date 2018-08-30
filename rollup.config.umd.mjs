import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.mjs',
  output: {
    format: 'umd',
    name: 'OpenGraph',
    file: 'dist/OpenGraph.js'
  },
  plugins: [
    babel()
  ]
}
