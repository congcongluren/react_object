const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    mian: "./src/index.js",
    // test:'./src/test.js',
  },
  output: {
    filename: "js/main.js",
    path: resolve(__dirname, "dist"),
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": resolve(__dirname, 'src/'),
      "&": resolve(__dirname, 'src/static'),
      "~": resolve(__dirname, 'src/utils')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(__dirname, "src"),
        exclude: /node_modules/,
        enforce: "pre",
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", // 将es5+转换成es5
                "@babel/preset-react", // 将react中的jsx语法转换成js语法
                // '@babel/preset-typescript'  // 将react中ts
              ],
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        include: resolve(__dirname, "src"),
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env", // 将es5+转换成es5
                "@babel/preset-react", // 将react中的jsx语法转换成js语法
                // "@babel/preset-typescript", // 将react中ts
              ],
              cacheDirectory: true,
            },
          },
          "ts-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        loader: 'url-loader',
        exclude: /.(html|less|css|sass|js|jsx|ts|tsx)$/,
        options:{
          limit: 10000,
          name: 'img/[name].[ext]',
        }
      }
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    host: '127.0.0.1',
    open: true,
    // static: {
    //   directory: resolve(__dirname, 'public'),
    // },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    })
  ]
};