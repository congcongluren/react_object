const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { ProgressPlugin } = require('webpack');

const publicCss = [
  {
    loader: MiniCssExtractPlugin.loader,
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: [
          [
            'postcss-preset-env',
          ],
        ],
      },
    },
  },
]



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
      "&": resolve(__dirname, 'assets'),
      "~": resolve(__dirname, 'src/utils')
    }
  },
  devtool: "inline-source-map",
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
        exclude: /node_modules/,
        use: [...publicCss]
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [...publicCss, 'less-loader'],
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [...publicCss, 'sass-loader']
      },
      // scss里面引入图片的问题
      {
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        loader: 'file-loader',
        options: {
          // limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(ect|ttf|svg|woff)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'icon/[name].[ext]'
          }
        }
      }
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    host: '127.0.0.1',
    // open: true,
    static: {
      directory: resolve(__dirname, 'assets'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css'
    }),
    // new CssMinimizerPlugin(),
    new ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: 'entries',
    }),
  ]
};