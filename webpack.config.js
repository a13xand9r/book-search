const path = require("path")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js"
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new HTMLWebpackPlugin({ template: path.join(__dirname, "src", "index.html") }),
        new CleanWebpackPlugin()
    ],
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(jpeg|jpg|png|svg)/,
                use: ["file-loader"]
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }
        ]
    }
}