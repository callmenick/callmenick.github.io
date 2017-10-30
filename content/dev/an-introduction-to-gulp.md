---
title: An Introduction to Gulp
description: In this tutorial, we'll introduce Gulp JS - a JavaScript task runner - and take a look at how we can implement it into a project and run some tasks.
img: /img/dev/an-introduction-to-gulp/an-introduction-to-gulp-featured.png
date: 2015-04-09T21:16:07-07:00
draft: false
---

In this article, we're going to have a very quick primer on Gulp, talking a bit about why it's so fast and efficient. Then, we'll set up a basic project with Gulp, set up some tasks, and automate the flow. Let's dig in!

## Gulp - What & Why?

As I mentioned above, Gulp is a task runner that enables automation and crunching of monotonous tasks all in one swoop. In a modern workflow, there are probably a host of tools that you're using in development and production. Some of the more popular ones are script concatenation and minifaction,  and Sass compilation. But the well runs deep, and goes into the likes of automated testing, image manipulation, sprite generation, and a host of others. At the time of writing, Gulp has 1438 plugins available. These days , I'm all aboard the Gulp train, and here's why:

1. Based off of personal experience, Gulp runs much, much faster. Tasks get crunched quicker, and the time you spend between writing code and seeing the changes in the browser is significantly less. Why is this? According to Gulp, it uses the power of node streams, giving you fast builds that don't write intermediary files to disk. I'm no expert on the topic, but if you want to read more about node streams, [check out this article.](http://www.sitepoint.com/basics-node-js-streams/)
2. The configuration and setup of a Gulp file is pretty easy to read and write.

Let's move on to setting up a Gulp project.

## Setting Up A Gulp Project

If you don't have node set up on your machine, [go ahead and do so.](https://nodejs.org/) The `npm` command line tool comes bundled with node, so you'll be ready to roll after this. Next, create a new project directory, and `cd` into it. Let's initialise our directory by running the following command:

```bash
npm init
```

It'll prompt you to set up some configuration variables and then generate a package.json file. Right now, let's just leave it at bare minimums:

```json
{
  "name": "Gulp",
  "version": "1.0.0"
}

```

Next up, let's create an empty `gulpfile.js` in our root directory. This is where all the configuration and task set up will take place. Now, let's bring in our first package, the Gulp package:

```bash
npm install --save-dev gulp
```

You'll notice that the `node_modules` directory has been created, and back in our package.json file, gulp has been added to the dev dependencies. In our gulp file, we can now reference it like this:

```javascript
// require gulp
var gulp = require('gulp');
```

We can also now set up our default task (which will do nothing):

```javascript
// default task
gulp.task('default', function() {

});
```

And there you go, we're ready to begin using gulp. At this point, we can successfully run `gulp` from the command line, and all will be well. It's a bit useless at this point though, so let's set up some dummy files and implement some tasks.

First, let's configure our directory structure like this:

```
gulpfile.js
package.json
src/
  --> js/
  --> sass/
dist/
  --> js/
  --> css/
```

If you don't use Sass, don't worry. This article isn't about Sass. Rather, we just want to demonstrate the running of multiple tasks. In the `src/js` directory, create two JavaScript files and populate them like this:

```javascript
// hello.js
function helloWorld() {
  console.log("Hello World!");
}

// goodbye.js
function goodbyeWorld() {
  console.log("Goodbye World!");
}
```

Silly, I know, but it's just for demonstration purposes. Now inside the `src/sass` directory, create a `style.scss` file, and give it some basic SCSS:

```scss
$blue: rgb(40, 170, 220);

p {
  color: $blue;
}
```

We're now ready to set up the tasks.

## Task Set Up

Given the above dummy data, we'll want to do the following before taking our app to production:

1. Concatenate the scripts into one file called `app.js`
2. Minify and rename `app.js` to `app.min.js`
3. Compile the Sass to a `style.css` CSS file
4. Minify and rename `style.css` to `style.min.css`

We'll need the necessary packages to perform these functions, so let's pull them in. We'll want the [concatenation package](https://www.npmjs.com/package/gulp-concat), the [uglify package](https://www.npmjs.com/package/gulp-uglify), the [Sass compiler plugin](https://www.npmjs.com/package/gulp-sass), the [CSS minifier package](https://www.npmjs.com/package/gulp-minify-css), and the [renaming package](https://www.npmjs.com/package/gulp-rename). We can pull in all of these packages in one swoop like this:

```bash
npm install --save-dev gulp-concat gulp-uglify gulp-sass gulp-minify-css gulp-rename
```

Before we dig into the task set up, let's take a look at three different parts of a typical gulp task:

1. We start the task by returning a chain of events. The files passed into the chain of events are accessed by `gulp.src()`, which takes a glob as its parameter. A glob is either a string to a collection of files, or a string to a direct file.
2. We can then `pipe` each event or method onto our sequence of files.
3. Finally, we will specify a destination for the output using the `dest` command.

Let's import our new packages into the gulp file:

```javascript
// require other packages
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var rename = require("gulp-rename");
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
```

The order doesn't matter. My preference is just to sort them alphabetically. Now, let's focus on the JavaScript task. First, let's create a new task:

```javascript
// scripts task
gulp.task('scripts', function() {

});
```

Let's break it down into steps now. We want to fetch all the files with a `.js` extension in the `src/js` directory, concatenate them, and save it as `app.js` in our `dist/js` directory. We then want to minify this file and rename it to `app.min.js`, and save it again in the `dist/js` directory. Here's the full task:

```javascript
// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/js/'));
});
```

It's quite readable, and walking through each step should paint a clear picture of the tasks being run in order. Go back to the command line and run:

```bash
gulp scripts
```

You should see your scripts successfully concatenated, uglified, and renamed! Let's move on to the CSS side of things. First, let's create a new task for styles:

```javascript
// styles task
gulp.task('styles', function() {

});
```

Let's look at the order of our tasks now. We want to compile our Sass and output it to a `style.css` file in the `dist/css` directory. Just as with the JavaScript, we then want to minify and rename it to `style.min.css`, and save it in the same directory. Here's the full set up:

```javascript
// styles task
gulp.task('styles', function() {
  return gulp.src('./src/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(cssmin())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/css/'));
});
```

Go ahead and run the following in the command line:

```bash
gulp styles
```

Voila, the Sass has been compiled, and the CSS minified.

## Automating With Gulp Watch

Wouldn't it be great if tasks would automatically run when a change is made in a file? It would be pretty counter productive, for example, if you had to run `gulp styles` every time you made a change to a Sass file. Gulp makes that incredibly easy with the `watch` function. Using this function, we can specify a glob to look at for changes, and specify some tasks to run when changes are seen on any of those files. Here's a very simple setup for our demonstrated case:

```javascript
// watch task
gulp.task('watch', function() {
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/sass/*.scss', ['styles']);
});
```

Now we can run `gulp watch` in the command line, and go ahead and edit our files as we wish. Let's go ahead and edit our Sass file. I just added the following:

```scss
strong {
  font-weight: 700;
}
```

Save it, and check the terminal. You'll notice that the correct task ran as soon as you saved your changed file without any interruption in the work flow. How simple was that?

## Further Streamlining With The Default Task

Remember that default task that we set up in the beginning that did nothing? That's a Gulp default, and it allows us to run the plain and simple `gulp` command. Now that we're all set up with our other tasks, we can edit the default one to something like this:

```javascript
gulp.task('default', ['scripts', 'styles', 'watch']);
```

Next time we type just `gulp` in the command line, it will run the script task, the styles task, and the watch task, compiling all our changes and watching for new ones. Pretty neat, huh?

## Wrap Up

We covered some good stuff here in this article, from implementing Gulp into your workflow, and setting up and automating tasks. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
