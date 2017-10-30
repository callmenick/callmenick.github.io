---
title: Level Up Your CSS Animations with Cubic Bezier
description: In this tutorial, we're going to plunge into the wonderful world of cubic bezier functions, gaining more fine tuned control over our CSS animations.
img: /img/dev/level-up-animations-cubic-bezier/level-up-animations-cubic-bezier-featured.png
date: 2016-04-21T17:14:20-07:00
draft: false
---

Transitions and animations are making waves across web development, and rightfully so. They are awesome, easily useable (and abusable), and have the ability to take your front end components and interfaces from good to great. The anatomy of declaring transitions and animations are similar, and only two things are required:

1. In the case of transitions, you select the property you want to transition. For animations, you select the keyframe block.
2. You then declare the duration length for the animation or transition.

Some typical CSS might look like this:

```css
.box {
  opacity: 0;
  transition: opacity 0.3s;
}

.cat {
  animation: fadeIn 0.3s;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
```

Transitions and animations also have another shared property that controls how the intermediate values between states are calculated, and that's called the [transition timing function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function). It's optional, and defaults to `ease`. The following timing functions are available to us by default:

* `ease` - speeds up a little through the middle, and then slows down towards the end
* `ease-in` - starts of slowly, and accelerates through to the end
* `ease-out` - starts of quickly, and decelerates through to the end
`ease-in-out` - starts slowly, accelerates through to the middle, then decelerates through to the end
* `linear` - constant animation speed throughout
* `step-start` - steps to the final state in the first frame of the animation
* `step-end` - steps to the final state in the last frame of the animation
* `steps(n, start|end)` - steps through n frames for the duration of the animation, "eating" a frame either at the start or the end

When dealing with simple animations and transitions, it's unlikely that you've touched the `step` functions - those are more geared towards keyframe cartoon-style animations, which is a very specific use case. However, you've probably used a lot of the other built in timing functions to reasonable effect when building nicer buttons, menus, modals, and other stateful components. Have you ever thought that despite the induced animation effect, it doesn't look and feel quite right?

## Cubic Bezier to the Rescue!

Let's digress a little bit. Anyone with any animation experience will know that software like Flash and After Effects come packed with a ton of easing functions - `easeInQuint`, `easeOutSine`, `easeInOutCubic`, just to name 3 of many. These timing functions aren't available to us through CSS keywords like `ease` and `linear`. However, it's important to note that **all** of these functions, including the ones that have valid keywords in CSS, are just cubic bezier functions. But what exactly is cubic bezier? Let's take a look at the image below:

![Cubic Bezier Chart](/img/dev/level-up-animations-cubic-bezier/bezier.png)

It's a graph that lives on a 1x1 axis, and it represents the cartesian cubic bezier coordinate system. Side note: plot points on this graph can go above and below 1 on the y-axis (property axis), but not on the x-axis (time axis). The grey line represents the axes, the orange line represents the timing function curve, and the blue lines and dots represent the control points and lines of the bezier curve. These control points are responsible for shaping the curve itself, and are one of the fundamental underlying concept in vector graphics softwares such as Adobe Illustrator.

A specific type of bezier curve - the cubic bezier curve - is available to us in the field of animation, and it can be mathematically defined by four control points in the plane of the graph shown above. In world of CSS animations though, we're only concerned with control points `p1` and `p2`, and that's because `p0` is always going to be `0, 0`, and `p3` is always going to be `1, 1`. So how then do we define out cubic bezier function in CSS? It looks like the following:

```css
cubic-bezier(x1, y1, x2, y2)
```

where:

* `x1` is the x coordinate of control point `p1`
* `y1` is the y coordinate of control point `p1`
* `x2` is the x coordinate of control point `p2`
* `y2` is the y coordinate of control point `p2`

I created the graph above just as a demonstration, but you can imagine that the cubic bezier declaration for it might look something like this:

```css
cubuc-bezier(0.5, 0.31, 0.84, 0.05)
```

If you're good with numbers, or you have a grasp of bezier curves or animation functions in typical animation software, you may immediately see the immense power this gives us. Think about it this way, animations are supposed to tell a story and give context and mood to the state we're animating to. If every animation was linear or a normal ease, they would all look the same, and invoke the same mood. If a very important dialog were to appear after a user action, and you really wanted to draw some attention to that, you'd probably want a custom timing function. Cubic bezier curves give us this fine tuned control.

## I'm No Good with Numbers - Help

If you're no good with numbers or are having a hard time visualizing what the end result will look like, then fear not. There are many resources out there to help you. First and foremost, a quick Google search will yield heaps of results on traditional easing functions ported to their CSS cubic bezier equivalents. However, two excellent resources that I use are:

1. [easings.net](http://easings.net/) - A collection of traditional easings (timing functions) and their corresponding CSS cubic bezier implementations
2. [cubic-bezier.com](http://cubic-bezier.com/) - A playground and visual interface for making your own cubic bezier functions, and seeing the results in real time.

Both are excellent, and you'll likely use them together.

## A Little Example

Let's demo up a little example to compare two timing functions. Below, there are two blue boxes of the exact same size. When you hit the animate button, they will translate 20rem from left to right for a duration of 600ms. Everything about them is the same, except the easing functions. The first one takes on the function **ease in**, which is accessible via the CSS keyword `ease-in`. The second takes on the function **ease in out back**, and you can grab the cubic bezier function from [easings.net](http://easings.net/). Below is the result:

<p data-height="380" data-theme-id="5513" data-slug-hash="NNBNaL" data-default-tab="result" data-user="callmenick" data-embed-version="2" class="codepen">See the Pen <a href="http://codepen.io/callmenick/pen/NNBNaL/">Timing Function Comparison</a> by Nick Salloum (<a href="http://codepen.io/callmenick">@callmenick</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

I don't know about you, but in my opinion, the second animation has a lot more character! Putting in just a little bit more effort yielded amazing results.

## Wrap Up

Understanding cubic bezier curves is one part of the equation of mastery of CSS animations. Putting them to use is another part. Always remember though that animation is not just a slap-and-go tool, and you shouldn't abuse it. Animation is a long practiced art, and we should treat it with respect and research accordingly. Timing functions all invoke different meanings to the subject, and it's up to you to make sure you're sending the right message. Cubic beziers can dramatically help this, so get acquainted. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
