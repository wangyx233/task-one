'use strict';

/**
 * 依赖的Npm插件
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var less = require('gulp-less');
var jade = require('gulp-jade');

/**
 * 定义构建任务
 */
 //编译单个文件，多个文件在src中["",""...]
 //编译匹配到的所有*less文件，除了..!,**匹配0或多个文件夹
 //i.e. gulp.src(['src/less/*.less','!src/less/**/{rest,test}.less'])
gulp.task('testLess', function () {
	gulp.src('src/less/*.less')
		.pipe(less())
		.pipe(gulp.dest('build/css'))
		.pipe(reload({stream: true}));
});

gulp.task('templates',function () {
	//var YOUR_LOCALS = {};

	gulp.src('src/jade/*.jade')
		.pipe(jade(
		//{locals:YOUR_LOCALS}
		))
		.pipe(gulp.dest('build/html'))
		.pipe(reload({stream: true}));
});


gulp.task('buildlib',function () {
	gulp.src('component/bower/**/*.{js,css}')
		.pipe(gulp.dest('build/lib/'))
});

//ctrl+c 退出任务
gulp.task('testWatch',['testLess','templates','buildlib'],function () {
	gulp.watch(['src/**/*.less','src/**/*.jade'],['testLess','templates']);
});

//静态服务器
gulp.task('serve',['testWatch'], function() {

	browserSync.init({
			server: "./build"
	});
});

/**
 * 定义默认执行的任务
 *	• 先构建项目，再启动服务
 */
gulp.task("default", ['serve']);
