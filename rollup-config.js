import rollup      from 'rollup'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

//paths are relative to the execution path
export default {
  input: 'src/app/main.js',
  output: {
   file: './aot/dist/build.js',
   format: 'iife'
 },
  // output: './aot/dist/build.js', // output a single application bundle
  sourcemap: true,
  sourcemapFile: 'aot/dist/build.js.map',
  // format: 'iife',
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn("WARNING FROM rollup-config: " + warning.message );
  },
  plugins: [
    nodeResolve({jsnext: true, module: true,
                extensions: [ '.ts', '.js', '.json' ]}),
    commonjs({
      include: ['node_modules/rxjs/**']
    }),
    uglify()
  ]
}
