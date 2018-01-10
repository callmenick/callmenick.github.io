---
title: Dead Simple CSS Isolation Animation Technique
description: In this tutorial, we take a look at a simple, cool CSS animation hover technique.
img: /img/dev/isolation-animation-technique/isolation-animation-technique-featured.jpg
date: 2018-01-09T14:04:43-08:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/jGaEeZ/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/jGaEeZ/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

## What is Isolation Animation?

Isolation animation is a simple technique that de-emphasizes items that aren’t “active”, via methods like blurring, fading, shrinking, etc. As such, the item in focus has an increased emphasis, and the information presented is more prominent.

The example we’re going to explore is pretty basic, but can be adapted to various use cases. We’ll look at a features table, in which there are 3 tiers of features. When one feature tier is hovered, it expands a little, and the other two features blur and fade out in the background. We’re only going to use CSS to achieve this!

Here’s what we’ll be creating:

<p data-height="391" data-theme-id="light" data-slug-hash="jGaEeZ" data-default-tab="result" data-user="callmenick" data-embed-version="2" data-pen-title="Isolation animation technique" class="codepen">See the Pen <a href="https://codepen.io/callmenick/pen/jGaEeZ/">Isolation animation technique</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Defining the Layout

The layout and markup are pretty straightforward. We’ll have a container element `.Options`, and each group of features will be encompassed by an `.Option` element.

```html
<div class="Options">
  <div class="Option">
    <div class="Option-header">
      <h2 class="Option-heading">Free</h2>
    </div>
    <div class="Option-content">
      <ul class="Option-items">
        <li class="Option-item">1 member</li>
        <li class="Option-item">...</li>
      </ul>
    </div>
  </div>
  <div class="Option">
    ...
  </div>
  <div class="Option">
    ...
  </div>
</div>
```

The structure is more important than the actual content here, so I kept is short. You can use your imagination to see where I’m going with this though!

Let’s jump into the CSS.

## Styling and Animating with CSS

Let’s first define the styles for the wrapper `.Options` element:

```scss
.Options {
  display: flex;
  margin: 0 auto;
  min-width: 80rem;
}
```

The styling is pretty straightforward. We’re just setting a `flex` display on the wrapper element, which will make each of the child `.Option` elements flex items. Now let’s take a look at the child elements. I’m using Sass (SCSS syntax) for easy variable maintenance.

```scss
$td: 250ms; // transition duration
$tf: cubic-bezier(0.68, -0.55, 0.265, 1.55); // transition function

.Option {
  flex: 1;
  background-color: #fff;
  cursor: pointer;
  transform-origin: 50% 50%;
  transition:
    transform $td $tf,
    opacity $td $tf,
    box-shadow $td $tf,
    filter $td $tf;
}
```

Each option occupies equal amounts of space as a result of the `flex: 1` declaration. Their transform origins are also perfectly centered, and 4 properties are transition enabled. The CSS for the actual UI of the options and their child elements is trivial, so I’ll leave it out here.

Now, let’s implement the hover animation effect. When we hover on an option, we’re going to want it to expand and pop out, and all others to blur and fade out. To do that, we’re going to first target all the child elements and apply the “out” transition:

```scss
.Options:hover .Option {
  opacity: 0.4;
  filter: blur(1px);
}
```

This implies that when we hover hover the options container, all option elements should blur and fade out. But that’s not entirely what we want! We still need to target the hovered element:

```scss
.Options .Option:hover {
  position: relative;
  z-index: 2;
  opacity: 1;
  box-shadow: 0 4px 16px #ddd;
  transform: scale(1.1);
  filter: none;
}
```

Because of the cascading nature of CSS, adding this set of rules below the first set means that the hovered element will not fade out or get blurred! Additionally, it will scale up and pop out a bit with a box shadow. Awesome! Here is is again:

<p data-height="391" data-theme-id="light" data-slug-hash="jGaEeZ" data-default-tab="result" data-user="callmenick" data-embed-version="2" data-pen-title="Isolation animation technique" class="codepen">See the Pen <a href="https://codepen.io/callmenick/pen/jGaEeZ/">Isolation animation technique</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>) on <a href="https://codepen.io">CodePen</a>.</p>

## Wrap Up

That’s all folks! In this tutorial, we looked into how some simple CSS could be leveraged to create a great UI pattern. The same thought process can be applied to all sorts of things! Think photo galleries, list views, etc. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/jGaEeZ/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/jGaEeZ/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
