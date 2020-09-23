const mix = require('laravel-mix');

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

mix.react('resources/js/app.js', 'public/js');
mix.styles(['resources/css/app.css', 'resources/css/normalize.css', 'resources/css/styles.css'], 'public/css/app.css');
mix.copyDirectory('resources/i', 'public/i');
