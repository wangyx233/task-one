'use strict';

/**
 * 依赖的Npm插件
 */
var gulp = require('gulp');
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
		.pipe(gulp.dest('build/css'));
});

gulp.task('templates',function () {
	//var YOUR_LOCALS = {};

	gulp.src('src/jade/*.jade')
		.pipe(jade(
		//{locals:YOUR_LOCALS}
		))
		.pipe(gulp.dest('build/html'))
});

gulp.task('buildlib',function () {
	gulp.src('component/bower/angular/angular.js')
		.pipe(gulp.dest('src/**/*.html'))
});


//ctrl+c 退出任务
gulp.task('testWatch',function () {
	gulp.watch(['src/**/*.less','src/**/*.jade'],['testLess','templates']);
});
/**
 * 定义默认执行的任务
 *	• 先构建项目，再启动服务
 */
gulp.task("default", ['testLess','templates','testWatch']);
