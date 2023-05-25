const fs = require('fs')
const path = require('path')
const webpack = require('webpack')

module.exports = {
  mode: 'development',

  // 解析文件夹内app.ts文件
  entry: fs.readdirSync(__dirname).reduce((entries, dir) => {
    const fullDir = path.join(__dirname, dir)
    const entry = path.join(fullDir, 'app.ts')
    if(fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
      entries[dir] = ['webpack-hot-middleware/client', entry]
    }
    return entries
  },{}),

  // 打包输出为 [文件夹名字.js]
  output: {
    path: path.join(__dirname, '__build__'),
    filename: '[name].js',
    publicPath: '/__build__/'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader'
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true 
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts','.tsx','.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
}
