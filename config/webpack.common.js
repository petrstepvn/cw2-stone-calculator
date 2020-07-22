const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js', './src/scss/main.scss'],
  output: {
    filename: 'bundle.js',
    // One folder up
    path: path.resolve(path.join(__dirname, '..'), 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'CW2 Stone Calculator',
    }),
  ],
};
