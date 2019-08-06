'use strict';

const plugins = require('gulp-load-plugins');
const yargs = require('yargs');
const gulp = require('gulp');
const rimraf = require('rimraf');
const yaml = require('js-yaml');
const fs = require('fs');
const watch = require('gulp-watch');

const webpack = require('webpack');
const gutil = require('gulp-util');
const absPath = require('path');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');
var swPrecache = require('sw-precache');
const webpackConfig = require('./webpack.config.js');
const webpackProdConfig = require('./webpack.production.config.js');
const WebpackDevServer = require('webpack-dev-server');
//grab existing webpack config file
var configDevServer = Object.create(webpackConfig);

// Check for --production flag
const PRODUCTION = !!(yargs.argv.production);

//outputs 'production' or 'development';
const ENV = PRODUCTION ? 'production' : 'development';

//for running shell scripts
const exec = require('child_process').exec;

// Load all Gulp plugins into one variable
const $ = plugins();

// Load settings from settings.yml
const { PORT, UNCSS_OPTIONS, PATHS } = loadConfig();

function loadConfig() {
  const ymlFile = fs.readFileSync('config.yml', 'utf8');
  return yaml.load(ymlFile);
}

//for sw precache
const staticFileGlobs = [
   "/**.html",
   "assets/css/**.css",
   "assets/js/**.js",
   "assets/img/icons/**.{svg,png,jpg,gif}",
   "assets/img/placeholder-images/**.{svg,png,jpg,gif}",
]

//watch
//--------------------------------------

gulp.task('watch-img', function () {
    return watch('src/img/**/*', images);
});

gulp.task('watch-media', function () {
    return watch(PATHS.media, media);
});

gulp.task('watch-favicons', function () {
    return watch(PATHS.favicons, favicons);
});

gulp.task('watch-scss', function () {
    return watch('src/scss/**/*.scss', gulp.series(sass, sassAdmin));
});

gulp.task('watch-app-js', function () {
    return watch('src/js/app/**/*.js', javascript);
});

gulp.task('watch-vendor-js', function () {
    return watch('src/js/vendor/**/*.js', vendorJavascript).on('change', reloadWebpackDevServer);
});

gulp.task('watch-head-js', function () {
    return watch('src/js/head/**/*.js', headJavascript).on('change', reloadWebpackDevServer);
});

//build
//--------------------------------------

// Build the "dist" folder by running all of the below tasks
gulp.task('build',
 gulp.series(clean, gulp.parallel([sass, sassAdmin, javascript, vendorJavascript, headJavascript, webpackBuild, images, media, copyUploads, favicons]), generateServiceWorker));

// Build the site, run the server, then watch for file changes, and run webpack(with dev server)
gulp.task('default',
  gulp.series('build', gulp.parallel([devServer, 'watch-img', 'watch-media', 'watch-favicons', 'watch-scss', 'watch-app-js', 'watch-vendor-js', 'watch-head-js'])));

function devServer() {
  // Start a webpack-dev-server
  // ** remember to include <script src="http://localhost:8080/webpack-dev-server.js"></script>
  // in index.html file to get hot reloading working properly
  const server = new WebpackDevServer(webpack(configDevServer), {
      //location of bundle in relation to index.html (to enable serve from memory)
      //publicPath: '/assets/js/',
      publicPath: 'http://localhost:8080/assets/js/',
      inline: true,
      stats: {
          colors: true
      },
      hot: true,
      historyApiFallback: {
      rewrites: [
          // shows /index.html as the landing page
          //{ from: /^\/$/, to: '/index.html' },
          // goes to /index.php for all routes starting with /filter or /admin
          // { from: /^\/filter/, to: '/index.php' },
          // { from: /^\/admin/, to: '/index.php' },
          
          // shows /404.html on all other pages
          // { from: /./, to: '/404.html' }
        ]
      },
      contentBase: absPath.resolve(__dirname, PATHS.dist)
  });

  server.listen(8080, 'localhost', function(err) {
      if(err) throw new gutil.PluginError('webpack-dev-server', err);
      gutil.log('starting webpack dev server');
      //proxy.run();
  });
}

function reloadWebpackDevServer() {
  if (WebpackDevServer === null) {
    return false;
  }

  //WebpackDevServer.sockWrite(WebpackDevServer.sockets, 'content-changed');

  return true;
}

function webpackBuild() {
  //if production
  if(PRODUCTION) {
    return gulp.src(PATHS.react)
      .pipe(named())
      .pipe(webpackStream(webpackProdConfig, webpack))
      .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'));
  } else {
      return gulp.src(PATHS.react)
       .pipe(named())
       .pipe(webpackStream(webpackConfig, webpack))
       .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'));
  }
}

function generateServiceWorker(done) {
  swPrecache.write(PATHS.dist + PATHS.distAssets + '/js/service-worker.js', {
    staticFileGlobs: staticFileGlobs,
    stripPrefix: PATHS.dist,
    verbose: true,
    // skipWaiting: false,
    //unresolved urls fallback to index page
    navigateFallback: '/index.html',
    //with runtime caching the sw-toolbox library configured with the caching strategies 
    //you specify will automatically be included in your generated service worker file
    runtimeCaching: [
    {
      urlPattern: /\/assets\//,
      handler: 'fastest',
      // options: {
      //   debug: true
      // }
    },
    {
      urlPattern: /\/api\//,
      handler: 'fastest',
    },
    {
      urlPattern: /googleapis/,
      handler: 'fastest',
    },
    {
      urlPattern: /gstatic/,
      handler: 'fastest',
    },
    {
      urlPattern: /typekit/,
      handler: 'fastest',
    },
    // {
    //   urlPattern: /(.*)/,
    //   handler: 'fastest',
    // },
    ]
  }, function() {
    gutil.log('service worker generated');
    done();
  });
}

// Delete the "dist" folder
// This happens every time a build starts
function clean(done) {
  rimraf(PATHS.dist, done);
}

// Copy files out of the assets/media folder
function media() {
  return gulp.src(PATHS.media)
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/media'));
}

// Copy files out of the assets/favicons folder
// * app manifest and browserconfig file is also included in there
function favicons() {
  return gulp.src(PATHS.favicons)
    .pipe(gulp.dest(PATHS.dist + '/favicons'));
}

//Copy the uploads folder for testing
function copyUploads() {
  return gulp.src(PATHS.uploads)
    .pipe(gulp.dest(PATHS.dist + '/uploads'));
}

// Combine JavaScript into one file
// In production, the file is minified
function javascript() {
  gutil.log('updating app js');
  return gulp.src(PATHS.javascript)
    //this makes sure the output js file isn't hashed
    .pipe(named())
    .pipe($.sourcemaps.init())
    .pipe(webpackStream(simpleWebpackConfig, webpack))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'));
}

// Combine vendor js into one file
function vendorJavascript() {
  gutil.log('updating vendor js');
  return gulp.src(PATHS.vendor)
    .pipe($.concat('vendor.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Combine head js into one file
function headJavascript() {
  gutil.log('updating head js');
  return gulp.src(PATHS.head)
    .pipe($.concat('head.js'))
    .pipe($.if(PRODUCTION, $.uglify()
      .on('error', e => { console.log(e); })
    ))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/js'))
}

// Compile Sass into CSS
// In production, the CSS is compressed
function sass() {
  gutil.log('updating scss');
  return gulp.src('src/scss/app.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer())
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/css'))
}

function sassAdmin() {
  return gulp.src('src/scss/admin.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      includePaths: PATHS.sass
    })
      .on('error', $.sass.logError))
    //settings for autoprefixer in package.json
    .pipe($.autoprefixer())
    // Comment in the pipe below to run UnCSS in production
    //.pipe($.if(PRODUCTION, $.uncss(UNCSS_OPTIONS)))
    .pipe($.if(PRODUCTION, $.cssnano()))
    .pipe($.if(!PRODUCTION, $.sourcemaps.write()))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/css'))
}

//for compiling js
let simpleWebpackConfig = {
  externals: {
      // enable jQuery as an external script to use in imports
      jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      // From mapbox-gl-js README. Required for non-browserify bundlers (e.g. webpack):
      'mapbox-gl$': absPath.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js'),
      'TweenLite': absPath.resolve('./node_modules/gsap/src/minified/TweenLite.min.js'),
      'TweenMax': absPath.resolve('./node_modules/gsap/src/minified/TweenMax.min.js'),
      'TimelineLite': absPath.resolve('./node_modules/gsap/src/minified/TimelineLite.min.js'),
      'TimelineMax': absPath.resolve('./node_modules/gsap/src/minified/TimelineMax.min.js'),
      'ScrollMagic': absPath.resolve('./node_modules/scrollmagic/scrollmagic/minified/ScrollMagic.min.js'),
      'animation.gsap': absPath.resolve('./node_modules/scrollmagic/scrollmagic/minified/plugins/animation.gsap.min.js'),
      'debug.addIndicators': absPath.resolve('./node_modules/scrollmagic/scrollmagic/minified/plugins/debug.addIndicators.min.js')
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { 
         NODE_ENV: JSON.stringify(ENV),
       }
    })
  ],
}

// Copy images to the "dist" folder
// In production, the images are compressed
function images() {
  gutil.log('updating images');
  return gulp.src('src/img/**/*')
    .pipe($.if(PRODUCTION, $.imagemin({
      progressive: true
    })))
    .pipe(gulp.dest(PATHS.dist + PATHS.distAssets + '/img'));
}
