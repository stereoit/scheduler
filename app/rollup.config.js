import buble from 'rollup-plugin-buble';
import filesize from 'rollup-plugin-filesize';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import includePaths from 'rollup-plugin-includepaths';
import uglify from 'rollup-plugin-uglify';

let includePathOptions = {
  include: {},
  paths: ['src'],
  external: [],
  extensions: ['.js', '.json', '.html', '.png']
};

let rollupConfig = {
  entry: 'js/teacher.js',
  plugins: [
    includePaths(includePathOptions),
    replace({
       'process.env.NODE_ENV':'"'+process.env.NODE_ENV+'"'
    }),
    buble(),
    commonjs({
      include: 'node_modules/**',
      exclude: [ 'node_modules/moment/**']
    }),
    nodeResolve({
      jsnext: true,
      main: true
    })
  ],
  dest: 'dist/teacher.js'
};

if (process.env.NODE_ENV == "production") {
    rollupConfig.plugins.push(uglify())
}

rollupConfig.plugins.push(filesize())

export default rollupConfig;
