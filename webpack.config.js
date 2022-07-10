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
        // exclude: /node_modules/,
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
      {
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: "asset", // 一般会转换为 "asset/resource"
        generator: {
          filename: "img/[name]_[hash:8][ext]", // 独立的配置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024 // 8kb （低于8kb都会压缩成 base64）
          }
        },
      },
      // 字体文件
      {
        test: /\.(otf|eot|woff2?|ttf|svg)$/i,
        type: "asset", // 一般会转换为 "asset/inline"
        generator: {
          filename: "icon/[name]_[hash:8][ext]", // 独立的配置
        },
        parser: {
          dataUrlCondition: {
            maxSize: 2 * 1024 // 2kb （低于2kb都会压缩）
          }
        },
      },

      // {
      //   test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: './img/[name].[hash:8].[ext]',
      //     esModule: false
      //   }
      // },
      // {
      //   test: /\.(ect|ttf|svg|woff)$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       name: 'icon/[name].[ext]'
      //     }
      //   }
      // }
    ],
  },
  devServer: {
    hot: true,
    port: 3000,
    https: true,
    host: "0.0.0.0",
    // open: true,
    static: [
      { directory: resolve(__dirname, 'assets'), },
      { directory: resolve(__dirname, 'public'), }
    ],
    proxy: {
      '/exportImage': {
        target: 'http://127.0.0.1:4000/',
        changeOrigin:true,
      }
    }
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