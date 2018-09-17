---
title: CSS Spinners and Loaders
description: In this tutorial, we take a look at the creation of four different CSS spinners and loaders with CSS3 animations. This will give us some insight into the possibilities out there, and open up your imagination.
img: css-spinners-and-loaders-featured.png
date: 2014-04-25T21:45:47-07:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/XzbExK" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/XzbExK/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

## Why CSS Spinners & Loaders?

Because:

1. They are crisp, and can scale to any size
2. They require one less dependency
3. They can be easily modified (maintainability, anyone!?)
4. They are fun to make

Using some basic CSS to construct shapes, and some more advanced CSS3 [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) and [keyframes](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes) for some movement, we can created beautiful, scalable, and easily modifiable CSS spinners and loaders.

I'm going to demonstrate 4 different spinners, and how to construct them. Here's what they will look like:

<p data-height="371" data-theme-id="light" data-slug-hash="XzbExK" data-default-tab="result" data-user="callmenick" data-embed-version="2" data-pen-title="CSS Spinners and Loaders" class="codepen">See the Pen <a href="https://codepen.io/callmenick/pen/XzbExK/">CSS Spinners and Loaders</a> by Nick Salloum (<a href="https://codepen.io/callmenick">@callmenick</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

You can get right to the source by clicking on the links above, or navigating the embedded pen. Some math is involved in creating these spinners, but we're developers after all, math is easy! Let's dive in.

## Common HTML & Sass

All our loaders are single-element loaders, meaning we only have one element in our markup for each spinner. For each spinner, we’ll be using a combination of base level styling and pseudo-class `::before` and `::after`. We'll also use Sass to get some variables in the mix, making them easier to maintain and scale. Here’s what our common HTML looks like:

```html
<span class="Spinner Spinner--disc"></span>
<span class="Spinner Spinner--radar"></span>
<span class="Spinner Spinner--path"></span>
<span class="Spinner Spinner--pulse"></span>
```

And now our common Sass:

```scss
$spinnerSize: 4;
$spinnerColPrimary: #2196F3;
$spinnerColSecondary: #CFD8DC;

.Spinner {
  position: relative;
  display: block;
  font-size: 10px;
  width: $spinnerSize * 1em;
  height: $spinnerSize * 1em;

  &::before,
  &::after {
    position: absolute;
    display: block;
    content: "";
  }
}
```

Now, let’s get into each of our loaders and their individual styles.

## Spinner/Loader #1 - The Spinning Disc

In this spinner, we have a large circular disc. Inside that disc, there’s a smaller, differently coloured circular disc. This small disc spins around the centre axis of the large disc, and is offset a little bit from the edge. We will apply a rotational animation to the entire disc, giving the illusion that only the small one is spinning. Here’s what the Sass looks like:

```scss
$spinnerDiscDotSize: 0.2;
$spinnerDiscDotTop: 0.1;
$spinnerDiscDotLeft: 0.5 - ($spinnerDiscDotSize/2);

.Spinner--disc {
  background-color: $spinnerColPrimary;
  border-radius: 50%;
  transform-origin: 50% 50%;
  animation: disc 1200ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite;

  &::before {
    top: $spinnerSize * $spinnerDiscDotTop * 1em;
    left: $spinnerSize * $spinnerDiscDotLeft * 1em;
    width: $spinnerSize * $spinnerDiscDotSize * 1em;
    height: $spinnerSize * $spinnerDiscDotSize * 1em;
    background-color: #fff;
    border-radius: 50%;
  }
}

@keyframes disc {
  0% {
    transform: translate3d(0, 0, 0) rotate(0);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(360deg);
  }
}
```

## Spinner/Loader #2 - The Radar

This spinner looks like a satellite/spaceship/cyclops of some sort. Cool. We have a stationary small disc, and around it a bigger disc that is somehow cut in half. This is a lot easier than you think, and is achieved with a combination of the border-radius and border properties. A transparent border on the left and right of this disc gives it the effect.. This exterior half disc piece does the spinning, this time with an easing function. Here’s the Sass:

```scss
$spinnerRadarOuterSize: 0.15;
$spinnerRadarInnerSize: 0.4;
$spinnerRadarInnerTop: 0.5 - ($spinnerRadarInnerSize / 2);
$spinnerRadarInnerLeft: $spinnerRadarInnerTop;

.Spinner--radar {
  animation: radar 1200ms cubic-bezier(0.645, 0.045, 0.355, 1) infinite;

  &::before {
    width: 100%;
    height: 100%;
    border-style: solid;
    border-width: $spinnerSize * $spinnerRadarOuterSize * 1em;
    border-color: $spinnerColSecondary transparent;
    border-radius: 50%;
  }

  &::after {
    top: $spinnerSize * $spinnerRadarInnerTop * 1em;
    left: $spinnerSize * $spinnerRadarInnerTop * 1em;
    width: $spinnerSize * $spinnerRadarInnerSize * 1em;
    height: $spinnerSize * $spinnerRadarInnerSize * 1em;
    background-color: $spinnerColPrimary;
    border-radius: 50%;
  }
}

@keyframes radar {
  0% {
    transform: translate3d(0, 0, 0) rotate(0);
  }
  100% {
    transform: translate3d(0, 0, 0) rotate(360deg);
  }
}
```

## Spinner/Loader #3 - The Disc Path

This spinner consists of two discs of the same size, on opposite ends of an imaginary container. The discs converge at the centre of the container, then move vertically in opposite directions. They then move back to the centre of the imaginary container, and back to their start positions. This is all achieved with  the CSS3 `transform: translate()` property. Some math is needed to calculate the positions in which they should move. Basic math, though. Here’s the Sass:

```scss
$spinnerPathDotSize: 0.4;

.Spinner--path {
  &::before,
  &::after {
    width: $spinnerSize * $spinnerPathDotSize * 1em;
    height: $spinnerSize * $spinnerPathDotSize * 1em;
    border-radius: 50%;
    animation-duration: 900ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  &::before {
    background-color: $spinnerColPrimary;
    transform: translate3d(
      0,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
    animation-name: pathRightUpAndBack;
  }

  &::after {
    background-color: $spinnerColSecondary;
    transform: translate3d(
      $spinnerSize * (1 - $spinnerPathDotSize) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
    animation-name: pathLeftDownAndBack;
  }
}

@keyframes pathRightUpAndBack {
  0% {
    transform: translate3d(
      0,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  25% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  50% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0,
      0
    );
  }
  75% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  100% {
    transform: translate3d(
      0,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
}

@keyframes pathLeftDownAndBack {
  0% {
    transform: translate3d(
      $spinnerSize * (1 - $spinnerPathDotSize) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  25% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  50% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      $spinnerSize * (1 - $spinnerPathDotSize) * 1em,
      0
    );
  }
  75% {
    transform: translate3d(
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
  100% {
    transform: translate3d(
      $spinnerSize * (1 - $spinnerPathDotSize) * 1em,
      $spinnerSize * (0.5 - $spinnerPathDotSize/2) * 1em,
      0
    );
  }
}
```

## Spinner/Loader #4 - The Pulse

This spinner/loader starts of in a similar way to the previous one, consisting of two discs of the same size, on opposite ends of an imaginary square shape. This time though, they pulse. When one is small, the other is big, and vice versa. This time, we’ll use the `transform: scale();` CSS3 property. Here’s what the Sass looks like:

```scss
$spinnerPulseDotSize: 0.5;

.Spinner--pulse {
  &::before,
  &::after {
    top: $spinnerSize * (0.5 - $spinnerPulseDotSize/2) * 1em;
    width: $spinnerSize * $spinnerPulseDotSize * 1em;
    height: $spinnerSize * $spinnerPulseDotSize * 1em;
    border-radius: 50%;
    animation-duration: 600ms;
    animation-timing-function: cubic-bezier(0.645, 0.045, 0.355, 1);
    animation-iteration-count: infinite;
  }

  &::before {
    left: 0;
    background-color: $spinnerColPrimary;
    transform: scale(1);
    animation-name: pulseOut;
  }

  &::after {
    right: 0;
    background-color: $spinnerColSecondary;
    transform: scale(0.5);
    animation-name: pulseIn;
  }
}

@keyframes pulseOut {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes pulseIn {
  0% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.5);
  }
}
```

## Wrap Up

Some of these may seem like a lot of CSS for one tiny little loader, but the truth is, every detail counts these days. When you compress the amount of CSS required for a loader, it’s going to be smaller than the size of a GIF. Include it in your already existent stylesheet and you’re on the ball. It’s scalable, expandable, colourable, modifiable, and just plain ol’ cool looking. I hope this tutorial gave you some insight into the world of CSS animations, transforms, and creating infinite keyframe loops. Try creating your own, feel free to download the source code by clicking the links below, and leave some feedback below. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/XzbExK" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/XzbExK/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>
