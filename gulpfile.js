var   gulp         = require('gulp'),
		sass         = require('gulp-sass'),
		autoprefixer = require('gulp-autoprefixer'),
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify'),
		imagemin     = require('gulp-imagemin'),
      pngquant     = require('imagemin-pngquant');

gulp.task('browser-sync', ['styles', 'scripts'], function() {
		browserSync.init({
				server: {
						baseDir: "./"
				},
				browser: 'firefox',
				notify: false //off message updates
		});
});

gulp.task('styles', function () {
	return gulp.src('sass/*.sass')
		.pipe(sass({
			// includePaths: require('node-bourbon').includePaths
		})
		.on('error', sass.logError))
		// .pipe(rename({
		// 	suffix: '.min', 
		// 	prefix : ''
		// }))
		.pipe(autoprefixer([
			'last 25 versions', 
			'> 1%', 
			'ie 8'
			], { 
				cascade: false 
			}))
		// .pipe(cleanCSS()) //Minify CSS
		.pipe(gulp.dest('css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	return gulp.src([
		'./app/libs/jquery/jquery-1.11.2.min.js',
		])
		.pipe(concat('libs.js'))
		// .pipe(uglify()) //Minify libs.js
		.pipe(gulp.dest('./app/js/'));
});

gulp.task('watch', function () {
	gulp.watch('sass/*.sass', ['styles']);
	// gulp.watch('app/libs/**/*.js', ['scripts']);
	// gulp.watch('app/js/*.js').on("change", browserSync.reload);
	gulp.watch('./*.html').on('change', browserSync.reload);
});

gulp.task('default', ['browser-sync', 'watch']);


//Optimize Images
gulp.task('img', function() {
    return gulp.src('images/**/*')
        .pipe(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('app/img'));
});
