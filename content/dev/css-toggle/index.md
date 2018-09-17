---
title: CSS Toggle with Sass
description: In this tutorial, we're going to build a CSS toggle, which adds a neat user experience to checkbox functionality. We'll use Sass for easy maintainability!
img: css-toggle-featured.png
date: 2015-03-20T11:41:29-07:00
draft: true
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="#" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="#" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

## The Reasoning

Often times, we find ourselves needing users to check/uncheck a checkbox to signify a yes/no answer to some question or statement. We set up a label, a checkbox input type, and fetch the boolean value after form submission to see if the user has left the box checked or unchecked. We’re all aware what default checkbox styling looks like, and there’s no pure CSS way to style a checkbox. It’s an element who’s style is managed separately by each browser engine. Wouldn’t it be nice to have a smoother interface, like we see in mobile apps sometimes?

But wait! A little CSS trickery can solve that for us, and by combining the `:checked`, `::before`, and `::after` pseudo classes to our checkbox input, we can achieve some beautiful toggle-type switches with smooth transitioning effects. No black magic...just pure CSS beauty. Let’s get started.

## Laying The Foundations

The HTML is nothing we haven’t seen before. It’s a standard checkbox input with a corresponding label. Each of these label/input combinations are wrapped inside a `div`. I gave mine a class of `Toggle`. Labels will be targeted using the adjacent sibling combinator, `+`. Let's take a look at the HTML:

```html
<div class="Toggle">
  <input type="checkbox" id="t1" class="Toggle-input">
  <label for="t1" class="Toggle-label">Toggle</label>
</div>
```

Nothing major there. For the CSS, we want the actual checkbox to be hidden way off screen and out of sight. The label is where we’ll actually do all the styling. It’s convenient, because clicking on the label will actually “check” or “uncheck” the checkbox. Here’s the CSS:

```scss
$toggle-knob-d: 4.5rem;
$toggle-knob-r: $toggle-knob-d/2;
$toggle-box-p: 0.5rem;
$toggle-box-b: 0.5rem;
$toggle-box-o: $toggle-box-p + $toggle-box-b;
$toggle-box-w: $toggle-knob-d*2 + $toggle-box-o*2;
$toggle-box-h: $toggle-knob-d + $toggle-box-o*2;
$toggle-box-r: $toggle-box-h/2;

.Toggles {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
}

.Toggle {
  margin-bottom: 2.75rem;

  &:last-child {
    margin-bottom: 0;
  }
}

.Toggle-input {
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
}

.Toggle-input + .Toggle-label {
  position: relative;
  display: block;
  width: $toggle-box-w;
  height: $toggle-box-h;
  background-color: #fff;
  font-size: 0px;
  text-indent: -9999px;
  border-radius: $toggle-box-r;
  box-shadow: inset 0 0 0 $toggle-box-b $color-neutral-4;
  cursor: pointer;
  outline: none;
  user-select: none;
  transition: box-shadow 0.3s;
}

.Toggle-input + .Toggle-label::before {
  position: absolute;
  top: $toggle-box-o;
  left: $toggle-box-o;
  display: block;
  width: $toggle-knob-d;
  height: $toggle-knob-d;
  background-color: $color-neutral-4;
  border-radius: $toggle-knob-r;
  content: "";
  transition: background 0.3s, transform 0.3s;
}

.Toggle-input:checked + .Toggle-label {
  box-shadow: inset 0 0 0 $toggle-box-b $color-theme-main;
}

.Toggle-input:checked + .Toggle-label::before {
  background-color: $color-theme-main;
  transform: translateX($toggle-knob-d);
}
```

## Wrap Up

Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="#" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="#" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>
