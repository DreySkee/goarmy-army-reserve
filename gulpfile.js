// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var less = require('gulp-less');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var nodemon = require('gulp-nodemon');
var gutil = require('gulp-util');
var order = require('gulp-order');
var replace = require('gulp-replace');

// Compile Our Less
gulp.task('less', function() {
	return gulp.src('app/styles/less/_ac2rc.less')
	.pipe(less())
	.pipe(replace('/images', '../images'))
	.pipe(rename('ac2rc.css'))
	.pipe(gulp.dest('app/styles'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
	return gulp.src('app/scripts/angular/**/*.js')
	.pipe(replace('$(', 'jQuery('))
	.pipe(concat('all.js'))
	.pipe(gulp.dest('app/scripts'))
	.pipe(rename('all.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/scripts'));
});

gulp.task('vendor', function() {
	return gulp.src('app/vendor_scripts/*.js')
	.pipe(order([
		'app/vendor_scripts/angular.min.js',
		'app/vendor_scripts/angular-animate.min.js',
		'app/vendor_scripts/angular-sanitize.js',
		'app/vendor_scripts/angular-shims-placeholder.min.js',
		'app/vendor_scripts/angular-touch.js',
		'app/vendor_scripts/angular-ui-router.min.js',
		'app/vendor_scripts/TweenMax.min.js',
		'app/vendor_scripts/ng-map'
		], {base: './'}))
	.pipe(concat('vendor.js'))
	.pipe(uglify({mangle: false}))
	.pipe(gulp.dest('app/scripts'));
});

gulp.task('serve', function() {
    nodemon({
        script: './bin/www',
        ext: 'js html',
        nodeArgs: ['--debug']
    })
    .on('restart', function() {
        gutil.log('[nodemon]', 'Restarted', gutil.colors.cyan('123'));
    })
})

// Watch Files For Changes
gulp.task('watch', function() {
	gulp.watch('app/styles/less/**/*.less', ['less']);
	gulp.watch('app/scripts/angular/**/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['less', 'watch']);
gulp.task('build', ['less', 'scripts']);