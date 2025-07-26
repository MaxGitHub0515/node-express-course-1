
import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
    entry: "./src/main.tsx",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle-[contenthash].js", // hashed filename for caching
        clean: true, // cleans old files
        publicPath: '/' //  SPA routing & assets
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
        {
            test: /\.tsx?$/,
            // or babel-loader
            use: {
                loader: 'ts-loader',
                options: {
                    configFile: "tsconfig.app.json"
                },
            } ,
            exclude: /node_modules/,   
        },
        {
            test: /\.css$/,
            use: ['style-loader', 'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        postcssOptions: {
                            plugins: ['@tailwindcss/postcss', 'autoprefixer']
                        }
                    }
                }
            ],
        },
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ['@svgr/webpack'], // SVGs as React components
        },
        {
            test: /\.svg$/i,
            type: 'asset/resource', // fallack for non-component
        },
        ] 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html', // clean HTML template
            favicon: './public/favicon.svg'
        }),
    ],
    devServer: {
        static: {
        directory: path.resolve(__dirname, 'dist'),
    },
    
    port: 3000,
    open: true,
    historyApiFallback: true, // for React Router
  },
    // run in production if it was set in env
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    // shut down the sourmap if not in production
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',

};

