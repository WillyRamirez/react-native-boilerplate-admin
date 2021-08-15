const webpack = require('webpack');
const path = require('path');

const appDirectory = path.resolve(__dirname, './');

module.exports = {
  entry: [path.resolve(appDirectory, 'index.web.js')],
  output: {
    filename: 'bundle.web.js',
    path: path.resolve(appDirectory, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(appDirectory, 'index.web.js'),
          path.resolve(appDirectory, 'src'),
          path.resolve(appDirectory, 'node_modules/react-native-uncompiled')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            // The 'metro-react-native-babel-preset' preset is recommended to match React Native's packager
            presets: ['module:metro-react-native-babel-preset'],
            // Re-write paths to import only the modules needed by the app
            plugins: ['react-native-web'],
          },
        },
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name].[ext]',
            esModule: false,
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  },
};
