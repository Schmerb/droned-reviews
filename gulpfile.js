'use strict';

// Module dependencies
const gulp        = require('gulp'),
	  browserSync = require('browser-sync'),
	  nodemon     = require('gulp-nodemon'),
	  rename      = require('gulp-rename'),
	  minifyCSS   = require('gulp-clean-css'),
	  minify      = require('gulp-minify'),
	  concat      = require('gulp-concat'),
	  watch    	  = require('gulp-watch'),
	  browserify  = require('gulp-browserify'),
	  babel       = require('gulp-babel');

const reload = browserSync.reload;

/////////////////////
// - Browser-sync
/////////////////////
gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: [
			"public/**/*.js", 
			"public/css/screen.min.css", 
			"src/**/*.ejs", 
			"src/**/*.js",
			"src/build/js/*.js"
		],
        browser: "google chrome",
        port: 7000,
	});
});

/////////////////////
// - Restart server
/////////////////////
gulp.task('nodemon', (cb) => {
	
	var started = false;
	
	return nodemon({
		script: 'server.js'
	}).on('start', () => {
		// to avoid nodemon being started multiple times
		// thanks @matthisk
		if (!started) {
			cb();
			started = true; 
		} 
    })
    .on('restart', () => {
        setTimeout(function() {
			reload({stream: false});
		}, 2000);
    })
});


////////////////////
// - Minify CSS
////////////////////
const CSS_SRC  = 'src/build/css/*.css';
const CSS_DEST = 'public/css/';

gulp.task('minify_css', () => {
	return gulp.src(CSS_SRC)
		.pipe(concat('screen.css'))
		.pipe(minifyCSS())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(CSS_DEST));
});
gulp.task('watch_css', () => {
	return watch(CSS_SRC, () => gulp.start('minify_css'));
});


////////////////////
// - BABEL / Minify
////////////////////
const JS_SRC  = 'src/build/js/*.js';
const JS_DEST = 'public/js/';
 
gulp.task('build_js', () => {
	return gulp.src(JS_SRC)
		.pipe(concat('bundle.js'))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(browserify({
			insertGlobals: true
		}))
		.pipe(minify({
			ext: {
				src: '.js',
				min: '.min.js'
			}
		}))
		.pipe(gulp.dest(JS_DEST));
});
gulp.task('watch_js', () => {
	return watch(JS_SRC, () => gulp.start('build_js'));
});

 
////////////////////
// - Entry point,
//  starts server  
//	--> listens for file changes 
//	--> triggers build
////////////////////
gulp.task('default', ['browser-sync', 'build_js', 'watch_js', 'minify_css', 'watch_css']);
