const mix = require('laravel-mix');
require('dotenv').config();
mix.js('src/js/app.js', 'public/js')
    .sass('src/sass/app.scss', 'public/css');
