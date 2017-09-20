'use strict';

// Module dependencies
const gulp        = require('gulp'),
	  browserSync = require('browser-sync'),
	  reload      = browserSync.reload,
	  nodemon     = require('gulp-nodemon'),
	  rename      = require('gulp-rename'),
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
 
gulp.task('build_es6', () => {
	gulp.watch(['public/js/base/*.js'], () => {
		return gulp.src('public/js/base/*.js')
		    .pipe(concat('all.js'))
			.pipe(babel({
				presets: ['env'],
				plugins: [
					'transform-object-assign',
					['transform-runtime', {
						"helpers": false,
						"polyfill": true,
						"regenerator": true,
						"moduleName": "babel-runtime"
					}]
				]
			}))
			.pipe(browserify({
				insertGlobals: true
			}))
			.pipe(minify({
				min: '.js'
			}))
			.pipe(gulp.dest('public/js/build'))
	});
});

// Reload browser on file save
gulp.task('default', ['browser-sync', 'build_es6'], () => {
	gulp.watch(["**/*.html", "**/*.css", "**/*.js", "**/**/*.ejs", "*.json", "*.md"], () => {
		reload();
	});
});
