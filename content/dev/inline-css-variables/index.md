---
title: Inline CSS Variables
description: Post description
img: inline-css-variables-featured.png
date: 2019-01-09T11:44:04-06:00
draft: true
---

## What are CSS Variables?

... definition

## CSS Variables in Action

Let's imagine we had a ..

```html
<i class="icon icon--blue"></i>
<i class="icon icon--pink"></i>
<i class="icon icon--purple"></i>
<i class="icon icon--orange"></i>
```

We could in theory set the background colour individually for each of these icons, but CSS variables allows us to set

```css
.icon {
  --color: #d1d1d1;
  background-color: var(--color);
}

.icon--blue {
  --color: #53b8ea;
}

.icon--pink {
  --color: #cc3399;
}

.icon--purple {
  --color: #9900cc;
}

.icon--orange {
  --color: #ea9924;
}
```

Neat!

## Inlining CSS Variables for Fine Tuned Control

```html
<i class="icon" style="--color: #53b8ea"></i>
<i class="icon" style="--color: #cc3399"></i>
<i class="icon" style="--color: #9900cc"></i>
<i class="icon" style="--color: #ea9924"></i>
```

```css
.icon {
  --color: #d1d1d1;
  background-color: var(--color);
}
```

## Browser Support

## Wrap Up

Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
