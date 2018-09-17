---
title: Let's Build an Infinity CSS Animating Loader!
description: In this tutorial, we use CSS offset-paths in tandem with animations to create a infinity symbol loader.
img: infinity-css-animating-loader-featured.png
date: 2017-06-16T10:00:00-07:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/KqMgaB" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/KqMgaB/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

I had an idea recently. I wanted to create an "Infinity" loader using only CSS. With a small bit of digging and playing, here's what I came up with:

<p data-height="265" data-theme-id="dark" data-slug-hash="KqMgaB" data-default-tab="result" data-user="callmenick" data-embed-version="2" data-pen-title="Infinity Loader" class="codepen">See the Pen <a href="https://codepen.io/callmenick/pen/KqMgaB/">Infinity Loader</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>) on <a href="https://codepen.io">CodePen</a>.</p>

But how!? Before you peep at the resulting code in the above pen, take a read below to learn about some fun and new CSS properties.

## Introducing CSS `offset`

The `offset` property in CSS is [defined by the MDN as](https://developer.mozilla.org/en-US/docs/Web/CSS/offset):

> a shorthand property for animating an element along a defined path.

It's a fairly new and fun property that was formerly defined as `motion`. But what exactly does it entail? If you're unfamiliar with SVG, then I'll quickly point you over to my [Getting Started with Inline SVG](http://callmenick.com/post/getting-started-inline-svg) tutorial. If you are familiar, then great. The `offset` property consists of 3 separate properties working together:

- `offset-path` - specifies the path on which an object gets positioned
- `offset-distance` - specifies the object position along an `offset-path`
- `offset-rotate` - specifies the direction of the object while positioning it along an `offset-path`

In this tutorial, we're only going to make use of the first two mentioned properties. But before we have any fun, let's dig a bit further into them.

## Understanding `offset-path` and `offset-distance`

We know what an `offset-path` is now, but how do we define one? Let's grab some more source content from the MDN:

> An offset path is either a specified path with one or multiple sub-paths or the geometry of a not-styled basic shape. Each shape or path must define an initial position for the computed value of "0" for `offset-distance` and an initial direction which specifies the rotation of the object to the initial position.

The formal syntax definition also gives us additional implementation details, such as what we can use to define our offset path. For now, let's pay attention to paths.

## Defining our Infinity Path

The easiest way (for me, at least) to create an infinity path was to use Adobe Illustrator. From there, I flexed every ounce of my design strength, and came up with this:

<svg xmlns="http://www.w3.org/2000/svg" width="65" height="28" viewBox="0 0 65 28">
  <path d="M23.71 5.21l17.58 17.58a12.43 12.43 0 0 0 17.57 0 12.43 12.43 0 0 0 0-17.57 12.43 12.43 0 0 0-17.57 0L23.71 22.79a12.43 12.43 0 0 1-17.57 0 12.43 12.43 0 0 1 0-17.57 12.43 12.43 0 0 1 17.57-.01z" fill="none" stroke="#673AB7" stroke-width="2" />
</svg>

I exported this as an SVG, then got the path coordinates and bounding box dimensions:

```
width: 65px
height: 28px
path coordinates: M23.71 5.21l17.58 17.58a12.43 12.43 0 0 0 17.57 0 12.43 12.43 0 0 0 0-17.57 12.43 12.43 0 0 0-17.57 0L23.71 22.79a12.43 12.43 0 0 1-17.57 0 12.43 12.43 0 0 1 0-17.57 12.43 12.43 0 0 1 17.57-.01z
```

Based on that data, we're easily able to apply the offset path to a CSS selector:

```css
.selector {
  offset-path: path("M23.71 5.21l17.58 17.58a12.43 12.43 0 0 0 17.57 0 12.43 12.43 0 0 0 0-17.57 12.43 12.43 0 0 0-17.57 0L23.71 22.79a12.43 12.43 0 0 1-17.57 0 12.43 12.43 0 0 1 0-17.57 12.43 12.43 0 0 1 17.57-.01z");
}
```

So far, things make sense, but as of now, there's absolutely no visual feedback. Let's get things moving.

## Applying Styles and Animations to our Element

Let's assume that we want to call our loader in our HTML like this:

```html
<span class="loader"></span>
```

Based on our data, we can initialise our loader CSS like this:

```css
.loader {
  position: relative;
  display: block;
  width: 65px;
  height: 28px;
}
```

Now that our bounding box is defined, let's create two dots. The idea here is that the dots will be chasing each other along the path of the infinity symbol. I'll use CSS pseudo elements `::before` and `::after`:

```css
.loader::before,
.loader::after {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 10px;
  height: 10px;
  background-color: #FFEB3B;
  border-radius: 50%;
  content: "";
}
```

So far so good. Two dots have been rendered, they're yellow, and they're hanging out. Now, let's position our dots along the path by applying the `offset-path` property:

```css
.loader::before,
.loader::after {
  offset-path: path("M23.71 5.21l17.58 17.58a12.43 12.43 0 0 0 17.57 0 12.43 12.43 0 0 0 0-17.57 12.43 12.43 0 0 0-17.57 0L23.71 22.79a12.43 12.43 0 0 1-17.57 0 12.43 12.43 0 0 1 0-17.57 12.43 12.43 0 0 1 17.57-.01z");
}
```

Awesome, it's coming together. Next up, we need to define our animation keyframes. We'll want to animate the dots along the path, so we'll be starting with an offset distance of 0%, and moving along to an offset distance of 100%:

```css
@keyframes loader {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```

Now, let's apply the animation to our pseudo elements. I'm using a [cubic bezier](http://callmenick.com/post/level-up-your-css-animations-with-cubic-bezier) ease-in-out function:

```css
.loader::before,
.loader::after {
  animation: loader 1500ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite;
}
```

There's motion! But the two dots look like one. Let's delay the movement of the second dot:

```
.loader::after {
  animation-delay: 100ms;
}
```

And voila! Once again, the result:

<p data-height="265" data-theme-id="dark" data-slug-hash="KqMgaB" data-default-tab="result" data-user="callmenick" data-embed-version="2" data-pen-title="Infinity Loader" class="codepen">See the Pen <a href="https://codepen.io/callmenick/pen/KqMgaB/">Infinity Loader</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Support

This is a super new property on the market, so support is pretty weak. Chrome supports it, but older versions of Chrome use `motion`. Is' under consideration for Edge and Firefox. I recommend coupling usage of this with [CSS @supports](https://developer.mozilla.org/en/docs/Web/CSS/@supports) to ensure a fallback.

## Wrap Up

Today, we looked at the new `offset` CSS property, coupled it with CSS animations, and made something cool. The possibilities continue to grow with CSS, so I encourage you to try it out. Thanks again for reading, and ff you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/KqMgaB" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/KqMgaB/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
