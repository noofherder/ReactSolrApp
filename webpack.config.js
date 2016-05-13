module.exports = {
  entry: [
    './source/app.js'
  ],
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { presets: ['react', 'es2015'] }
    }]
  }
};
