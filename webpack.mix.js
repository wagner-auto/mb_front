const mix = require('laravel-mix');
const BrowserSyncPlugin=require("browser-sync-webpack-plugin");
if ( ! mix.inProduction()) {
    mix.webpackConfig({
        devtool: 'inline-source-map'
    });
    mix.webpackConfig(() => {
        return {
            plugins: [
                new BrowserSyncPlugin({
                    host: 'localhost',
                    port: 3003,
                    watch: true,
                    server: { baseDir: ['public'] }
                })
            ]
        };
    });
}
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.js('./src/js/app.js', 'public/js')
    .autoload({
        jquery: ['$', 'window.jQuery', 'jQuery']
    })
    .extract(['jquery','d3','d3-array','owl.carousel',"@fancyapps/fancybox"])
    .sass('./src/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false,
        autoprefixer: {
            options: {
                browsers:[
                    'last 6 versions'
                ]
            }
        }
    })
