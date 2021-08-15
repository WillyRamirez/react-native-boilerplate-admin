const path = require('path');

const root = path.resolve(__dirname, './');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './index.web.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.web.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        include: [
          path.resolve(root, 'index.web.js'),
          path.resolve(root, 'src'),
          path.resolve(root, 'node_modules/react-native-uncompiled'),
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
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
    },
    extensions: ['.web.js', '.js'],
  },
};
