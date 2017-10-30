---
title: Maintainable Responsive Web Design with Sass
description: In this tutorial, we take a deep dive into some of Sass' most useful features, and leverage them to build maintainable stylesheets. We'll round it off with a grid system!
img: /img/dev/maintainable-responsive-web-design-with-sass/maintainable-responsive-web-design-with-sass-featured.png
date: 2016-02-08T20:38:30-07:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="http://codepen.io/callmenick/pen/dGjPOm?editors=1100" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="http://codepen.io/callmenick/pen/dGjPOm?editors=1100" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

## Introduction

Building maintainable, responsive layouts often feels like a huge undertaking. A lot of people tend to revert to frameworks that end up having way more juice than they need. When I think of responsive layouts, I immediately think of [Sass](http://sass-lang.com/) and three of its awesome features - maps, loops, and mixins. By leveraging these features, responsive design becomes a breeze. Not to mention, you end up with exactly what you need, nothing more, nothing less. In this tutorial, we're going to take a deep dive into Sass maps, loops, and mixins, and discover their importance and usefulness. We'll move into creating some reusable, maintainable data structures and mixins for RWD. Finally, we'll round it off with something more complex - a responsive grid system. Let's dive in!

## Breaking Down Sass Maps & Loops

A [Sass map](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#maps) is one of Sass' data types. It represents an association between keys and values, much like objects in JavaScript. Here's an example of a Sass map that maps colour names to a hex value:

```scss
$colors: (
  primary: #333,
  secondary: #555,
  brand: #ff0033
);
```

Maps have a variety of [map functions](http://sass-lang.com/documentation/Sass/Script/Functions.html#map-functions) applicable to them. Retrieving a value from the map would be as simple as this:

```scss
.logo {
  color: map-get($colors, brand);
}
```

Maps also play very nicely in Sass iterative functions like [`@for`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#_10) and [`@each`](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#each-directive), which are called "control directives". Let's take a look at each in action.

The `@for` directive repeatedly outputs a set of styles by iterating **from** a **through** b, where a and b are integers. On each repetition, the counter increments, much like a traditional for loop in any programming language. Here's an example of it in action:

```scss
@for $i from 1 through 4 {
  .box-#{$i} {
    width: 4rem * $i;
  }
}
```

And the resulting output:

```css
.box-1 { width: 4rem; }
.box-2 { width: 8rem; }
.box-3 { width: 12rem; }
.box-4 { width: 16rem; }
```

An important thing to note here is the string interpolation syntax when incrementing the `.box-` selector. String interpolation is necessary when appending a variable to a string, and takes the form `#{$variable}`. It allows us to step our box selector from `.box-1` to `.box-4`.

Now, let's take a look at the `@each` directive, which will allow us to iterate over a map. We'll use our colour map as an example. This directive steps over the map iteratively, giving us access to each key and its corresponding value each step of the way. You can read the syntax like "for each key & value in the map, do something". Here's an example of it in action:

```scss
@each $key, $value in $colors {
  .item-#{$key} {
    color: $value;
  }
}
```

And here's the corresponding output:

```css
.item-primary { color: #333; }
.item-secondary { color: #555; }
.item-brand { color: #ff0033; }
```

Pretty neat, right?

## A Quick Look At Mixins

Before we dive in, I'd like to introduce one final directive that's going to help us a lot - [the mixin directive.](http://sass-lang.com/documentation/file.SASS_REFERENCE.html#mixins) Mixins are sort of like functions in a way. They can accept inputs, and return outputs. The anatomy of a mixin is as follows:

```scss
@mixin paint-red {
  color: #fff;
  background-color: #ff0000;
}
```

Using a mixin is pretty easy as well - we just call `@include` inside any selector:

```scss
.banner {
  padding: 4rem;
  @include paint-red;
}
```

The output, as you may have guessed, is as follows:

```css
.banner {
  padding: 4rem;
  color: #fff;
  background-color: #ff0000;
}
```

Let's now leverage all of these tools to add structure, speed, and maintainability to our stylesheets. We'll take a look at breakpoints and media queries, and how Sass can help us manage them beautifully.

## Breakpoints & Media Queries

When you're designing responsively, there are two key points to take into consideration:

* The amount of breakpoints
* The size of the breakpoints

Every time I start a new project, one of the first things I do is build up a map of breakpoints with their keys:

```scss
$breakpoints: (
  xs: 32rem,
  sm: 48rem,
  md: 72rem,
  lg: 96rem,
  xl: 102rem,
  xx: 120rem
);
```

For the sake of this demo, these values have been randomly selected. You may choose different widths, and a different number of breakpoints altogether! The point here is that it's all maintained and controlled by a concise, clear data structure. Next up, I'd write a reusable media query mixin. This isn't just useful for responsive grids...it's useful throughout your stylesheets. Here's what I tend to use:

```scss
@mixin break($size) {
  @media (min-width: map-get($breakpoints, $size)) {
    @content;
  }
}
```

The above mixin should be pretty straightforward to understand, but in a nutshell, it's using the `map-get` map function to fetch the corresponding value from the breakpoints map based on the passed in key. An example of this in action would be:

```scss
.el {
  display: none;

  @include break(sm) {
    display: block;
  }
}
```

And the compiled CSS would be:

```css
.el {
  display: none;
}

@media (min-width: 48rem) {
  .el {
    display: block;
  }
}
```

As you can see, the benefits here are huge for responsive design. If we're a thousand lines deep and we realise we want to change our `sm` breakpoint from `48rem` to `42rem`, we only have to change it once. On another note, we never need to keep reminding ourselves of numerical values - we just use the easier-to-remember keys like `xs`, `md`, etc. Simple, elegant, and maintainable in the long run. Let's round it off with building a responsive grid!

## Let's Build A Responsive Grid!

As a final demo, let's bootstrap a responsive grid in just **15** lines of Sass. We will, of course, be leveraging our previous breakpoints map and media query mixin. The first thing we'll want to establish is the number of items in our grid:

```scss
// number of items variable
$items: 12;
```

I chose 12, but you can literally choose any number you want here. Again, the beauty is in the maintainability of the stylesheets, as should you want 16 items 4 weeks into your project, you can change it once. Next up, let's think about our grid container. I'm a [huge advocate of flexbox](http://callmenick.com/post/flexbox-examples), and can't recommend it enough. As such, I'll be using it here. Here's our container in action:

```scss
// grid container
.grid {
  display: flex;
  flex-flow: row wrap;
}
```

That was easy, no? Next up comes the fun part - looping over everything! Here's the process:

1. We want to loop over all the breakpoints in the map and get access to both the key and value at each step of the iteration.
2. Then, we want to iterate over the number of items.
3. For each item, we want to generate a grid item that occupies that width. For example, for item 1, we'll want a item with of `(1/12) * 100%`, for item 2, a width of `(2/12) * 100%`, etc. all the way up to 12.
4. We only want those items to be that width at the desired breakpoint though, so they'll all be 100% width initially.
5. Each item will have a modifier that enables the size and corresponding breakpoints.

Here's the loop in action:

```scss
// loop over the breakpoints
@each $key, $value in $breakpoints {
  @for $i from 1 through $items {
    .grid__item--#{$key}-span-#{$i} {
      flex: 0 0 100%;
      @include break($key) {
        flex: 0 0 #{$i / $items * 100}%;
      }
    }
  }
}
```

The compiled CSS is just over 1000 lines with vendor prefixes included, but you now have total control over that in just 15 lines of Sass (comments not included). Usage, as you'd imagine, is simple:

```html
<div class="grid">
  <div class="grid__item grid__item--xs-span-1">
    xs span 1
  </div>
  <div class="grid__item grid__item--xs-span-2">
    xs span 2
  </div>
  <div class="grid__item grid__item--xs-span-3">
    xs span 3
  </div>
  <div class="grid__item grid__item--xs-span-6">
    xs span 6
  </div>
</div>
```

Nested grids are also a non issue, making many variations of layouts super simple!

## Wrap Up

And that’s a wrap! I hope this tutorial helped you get a firmer grasp of the awesome tools that Sass provides us, and encourages you to approach responsive web design more responsibly and positively. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="http://codepen.io/callmenick/pen/dGjPOm?editors=1100" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="http://codepen.io/callmenick/pen/dGjPOm?editors=1100" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>
