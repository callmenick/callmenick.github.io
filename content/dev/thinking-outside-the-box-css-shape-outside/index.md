---
title: Thinking Outside the Box with CSS shape-outside
description: In this tutorial, we're going to explore the CSS shape-outside property which allows us to break out of the box a little.
img: thinking-outside-the-box-css-shape-outside-featured.png
date: 2016-09-19T15:56:51-07:00
draft: false
---

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/VMpPRp" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/VMpPRp/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>

## Breaking Out of the Box

There's a reason it's called the [box model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model), and that's because every element in a document is represented as a rectangular box. Even with CSS properties that alter the shape of an element - such as `border-radius` - we are still, by default, confined to a box. Nowadays, with modern CSS properties, we are able to shape and shift content a bit more. One of the properties that allows that is the `shape-outside` property. From the [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/shape-outside):

> The shape-outside CSS property uses shape values to define the float area for a float and will cause inline content to wrap around the shape instead of the float's bounding box.

Let's extract the important bits from that definition:

1. It uses shape values. Shape values in CSS can be defined by [basic shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/basic-shape) or shape functions. The coordinates of a basic shape originate at the top-left corner of the reference box, i.e. the box defined by the element in question.
2. It defines a float area for a float. That means that elements with the `shape-outside` property must also be floating elements. That will then allow inline content to wrap around the shape instead of the float's bounding box.

Let's jump into some demos to see it in action.

## Exploring the Shape Outside Property

First, let's write up some HTML to give us a nice playing field. We will explore three different shapes:

1. A circle
2. A triangle
3. A diamond

Here's the HTML:

```html
<div class="Content">
  <div class="Shape Shape--left Shape--circle"></div>
  <h2>Circle, left</h2>
  <p>Lorem ipsum dolor...</p>
</div>

<div class="Content">
  <div class="Shape Shape--right Shape--triangle"></div>
  <h2>Triangle, right</h2>
  <p>Lorem ipsum dolor...</p>
</div>

<div class="Content">
  <div class="Shape Shape--left Shape--diamond"></div>
  <h2>Diamond, left</h2>
  <p>Lorem ipsum dolor...</p>
</div>
```

I'm using a base class `Shape` with two modifiers:

* `Shape--[pos]` - defines the position of the shape, whether left or right
* `Shape--[shape]` - defines the actual shape of the element

Each shape and corresponding content will be wrapped in a `Content` div.

Now, let's write up some baseline CSS that we'll use across the board:

```css
.Content {
  clear: both;
}

.Shape {
  display: block;
  width: 18rem;
  height: 18rem;
  background-color: #eee;
}
```

Let's examine the CSS a bit. In the `Content` div, I've added the `clear` property. That's because it'll eventually contain floated elements, and we need to clear those. Also, I've added some base level CSS for our shapes. Before we construct the actual shapes let's add the correct float properties for the modifiers:

```css
.Shape--left {
  float: left;
}

.Shape--right {
  float: right;
}
```

Great! We're shaping up nicely. Now, let's dig into each of our three shapes.

### Circle Shape

The circle shape is the easiest of the lot. We can define it by just using the `circle()` basic shape, which will create a 100% circle based on the bounding box. Since our bounding box is square, as defined above, we've got nothing to worry about. Here's the CSS:

```css
.Shape--circle {
  border-radius: 50%;
  shape-outside: circle();
}
```

Notice that I've also added a border radius so that the visual effect of the element itself represents a circle. Let's move on!

### Triangle Shape

Our triangle shape is a bit more complicated. This time, we're going to use the `polygon()` basic shape. For polygons, we can use relative `x y` pairs starting at the origin. We can use any number of pairs we want as well. The last pair will automatically be linked back to the origin. Our triangle will move from the top left of the box, to the top right, to the bottom middle, then back to the starting position. Here's the CSS:

```css
.Shape--triangle {
  clip-path: polygon(0% 0%, 100% 0%, 50% 100%);
  shape-outside: polygon(0% 0%, 100% 0%, 50% 100%);
}
```

Notice again that I've also added the clipping path property to give the original element a triangular appearance. Remember, the `shape-outside` property affects the flow of inline content around a floated element, and not the floated element itself!

Let's look at the last example.

### Diamond Shape

We're going to use the `polygon()` shape once more. This time, we'll start from the top-middle of the box, then move to the right-middle, then bottom-middle, then left-middle, and back to start. Here's the CSS:

```css
.Shape--diamond {
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  shape-outside: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}
```

Voila! We've just created some awesome shapes and out-of-the-box content flow with only CSS.

## Browser Support & Fallbacks

The `shape-outside` property support is 50/50 at the moment. Modern Chrome, Safari (webkit prefixed), and Opera support it, but Firefox and Edge have it marked as under consideration. The good news is that fallbacks require no work at all - elements and inline content will just exhibit normal float behaviour.

## Wrap Up

And that’s a wrap! Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>

<div class="ButtonGroup ButtonGroup--gutter-md ButtonGroup--align-center">
  <a href="https://codepen.io/callmenick/pen/VMpPRp" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    Get Source
  </a>
  <a href="https://codepen.io/callmenick/full/VMpPRp/" class="Button Button--display-inlineBlock Button--appearance-secondary Button--size-sm">
    View Demo
  </a>
</div>
