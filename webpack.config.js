const webpack = require('webpack');

const DEBUG = process.env.NODE_ENV !== 'production';

module.exports = {
  devtool: DEBUG ? 'cheap-module-eval-source-map' : 'hidden-source-map',

  context: `${__dirname}/src`,
  entry: {
    app: './app.js',
    vendor: ['lodash']
  },

  output: {
    devtoolModuleFilenameTemplate: 'webpack:///[absolute-resource-path]',
    filename: '[name].min.js',
    path: `${__dirname}/dist`
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['latest', { modules: false }]
            ]
          }
        }]
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),

    new webpack.optimize.UglifyJsPlugin({
      output: { comments: false },
      sourceMap: true
    })
  ]
};
