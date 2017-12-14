'use strict';

// Module dependencies
const gulp        = require('gulp'),
	  browserSync = require('browser-sync'),
	  reload      = browserSync.reload,
	  nodemon     = require('gulp-nodemon'),
	  rename      = require('gulp-rename'),
	  minifyCSS   = require('gulp-clean-css'),
	  minify      = require('gulp-minify'),
	  concat      = require('gulp-concat'),
	  browserify  = require('gulp-browserify'),
	  babel       = require('gulp-babel');


/////////////////////
// - Browser-sync
/////////////////////
gulp.task('browser-sync', ['nodemon'], () =>  {
	browserSync.init(null, {
		proxy: "http://localhost:8080",
        files: ["public/**/*.js"],
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
// - BABEL / Minify
////////////////////
const JS_SRC  = 'build/js/*.js';
const JS_DEST = 'public/js/';
 
gulp.task('build_es6', () => {
	gulp.watch([JS_SRC], () => {
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
			.pipe(gulp.dest(JS_DEST))
	});
});

////////////////////
// - Minify CSS
////////////////////
const CSS_SRC  = 'build/css/*.css';
const CSS_DEST = 'public/css/';

gulp.task('minify-css', () => {
	gulp.watch([CSS_SRC], () => {
		return gulp.src(CSS_SRC)
			.pipe(concat('screen.css'))
			.pipe(minifyCSS())
			.pipe(rename({suffix: '.min'}))
			.pipe(gulp.dest(CSS_DEST))
	});
});
 

// Reload browser on file save
gulp.task('default', ['browser-sync', 'build_es6', 'minify-css'], () => {
	gulp.watch(["**/*.html", "**/*.css", "**/*.js", "**/**/*.ejs", "*.json", "*.md"], () => {
		reload();
	});
});
