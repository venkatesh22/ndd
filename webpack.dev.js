const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { DefinePlugin } = require('webpack');


module.exports = merge(common, {
   mode: 'development',
   devtool: 'source-map',
   plugins: [
    new DefinePlugin({
      'process.env': {
        'BASE_SERVICE_URL': JSON.stringify('https://my-json-server.typicode.com/venkatesh22/mock-json/')
      }
    }),
  ],
});