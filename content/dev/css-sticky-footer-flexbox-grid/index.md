---
title: CSS Sticky Footer with Flexbox and Grid
description: In this quick tutorial, we'll build a sticky footer layout two ways — using CSS Flexbox and Grid.
img: sticky-footer-featured.png
date: 2019-04-08T15:48:05-07:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/collection/XjwEaq/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Collection on CodePen
  </a>
</div>

A long standing layout challenge for front end folks has been the "sticky footer" layout. A sticky footer is one that sticks to the bottom of the page if there's not enough content to fill up a minimum of 100% the screen height, but also one that gets pushed further down the viewport like normal if there is enough content.

![Sticky footer visual](sticky-footer-visual.png)

Nowadays, it's pretty simple to achieve this layout! We're going to explore two ways:

1. Using [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
2. Using [Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)

But first, let's look at some common HTML and CSS for our layout.

## The Common HTML and CSS

I'm going to structure my layout pretty simply, with a `header`, `main`, and `footer`, and I'll wrap all of those in a `.wrapper` element:

```html
<div class="wrapper">
  <header></header>
  <main></main>
  <footer></footer>
</div>
```

This gives me a pretty contained structure to work with, and some easy targets for my layout. As far as the styling goes, we'll want to make sure that our `.wrapper` element is at least the height of the viewport at all times:

```css
.wrapper {
  min-height: 100vh;
}
```

Let's jump into the specifics.

## The Flexbox Way

With Flexbox, my thought process is that I first need a [column based `flex-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction). With that, I can then set my `header` and `footer` to occupy as much space as their contents require, while the `main` should always fill up a minimum of all of the available space left. Here's what the CSS looks like:

```css
.wrapper {
  display: flex;
  flex-direction: column;
}

header,
footer {
  flex: 0 1 auto;
}

main {
  flex: 1;
}
```

Voila! Simple. Here's a little CodePen demo that allows you to dynamically add content to see the changes.

<p class="codepen" data-height="600" data-theme-id="light" data-default-tab="result" data-user="callmenick" data-slug-hash="xeRWOg" data-preview="true" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Sticky Footer w/ CSS Flexbox">
  <span>See the Pen <a href="https://codepen.io/callmenick/pen/xeRWOg/">
  Sticky Footer w/ CSS Flexbox</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## The Grid Way

With CSS grid, things become even easier! Grid is such a powerful spec and is perfect for controlling these overarching layout setups like this. All we need to do in this case is target the `.wrapper` element and define our grid layout there. We'll want three rows, and like before, we'll want the `main` row to occupy a minimum of the remaining viewport height after the `header` and `footer` take up as much space as they need. Here's the (dead simple) CSS:

```css
.wrapper {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
```

And that's it! Here's the CSS demo for the Grid version:

<p class="codepen" data-height="600" data-theme-id="light" data-default-tab="result" data-user="callmenick" data-slug-hash="rbWJpE" data-preview="true" style="height: 493px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Sticky Footer w/ CSS Grid">
  <span>See the Pen <a href="https://codepen.io/callmenick/pen/rbWJpE/">
  Sticky Footer w/ CSS Grid</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

## Browser Support

Support for both of these APIs is really great, with [Flexbox](https://caniuse.com/#feat=flexbox) edging out [Grid](https://caniuse.com/#feat=css-grid) by just a bit due to it being around longer. If you're worried about supporting old browsers, then maybe Flexbox is for you. With this particular layout though, I'd choose CSS Grid anyway. The fallback would be extremely graceful on browsers that don't support it, as they'd just render the three blocks stacked one on top the other with no sticky footer.

## Wrap Up

That's just about it! We've taken a look at two powerful CSS APIs and really simplified a once non-trivial layout implementation with just a few lines of CSS. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/collection/XjwEaq/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Collection on CodePen
  </a>
</div>

<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
