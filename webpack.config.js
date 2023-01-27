const path = require("path");
module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.ts|\.tsx?$/,
                include: [
                    path.resolve(__dirname, "src/ts")
                ],
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["@babel/preset-react", '@babel/preset-typescript']
                        }
                    },
                    {
                        loader: "ts-loader"
                    }
                ],
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: "source-map",
    mode: "development"
}