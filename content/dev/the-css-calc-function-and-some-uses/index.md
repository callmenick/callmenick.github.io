---
title: The CSS Calc Function and Some Uses
description: An introduction to the very useful CSS calc function, and some snippets to show off its use.
img: the-css-calc-function-and-some-uses-featured.png
date: 2015-03-30T11:33:44-07:00
draft: false
---

## Introducing The CSS Calc() Function

As CSS continues to evolve, interesting selectors and functions are always on the horizon. One that I came across some time ago is the `calc()` function, which allows you to actually perform a unit calculation and return a result. The real beauty in it for me though is that you can mix and match unit types, offering interesting ways to compute layout dimensions, particularly when building responsive layouts. In following snippets, we'll look at some very basic implementations of the `calc()` function, then step it up a notch with a real world scenario, implementing a neat calc-based solution to it. Let's dive in!

## Basic Implementation

In its most basic form, the `calc()` function takes on some values and returns the calculated dimension. According to the W3C:

> The calc() function allows mathematical expressions with addition (+), subtraction (-), multiplication (*), and division (/) to be used as component values. The `calc()` expression represents the result of the mathematical calculation it contains, using standard operator precedence rules. It can be used wherever `<length>`, `<frequency>`, `<angle>`, `<time>`, `<number>`, or `<integer>` values are allowed.

So in essence, we could do something like this:

```css
.element {
  margin: calc(20px - 10px);
}
```

This of course is a totally useless example, because you can easily just set the margin to 10px to begin with. But it does give us a simple insight into what `calc()` can do. As I mentioned above, the function allows us to mix and match units, so something like this becomes possible too:

```css
.element {
  margin: calc(2em - 5px);
}
```

Again, this example might not be the best, but we're opening up ourselves to the power of the function. Because we're allowed to perform 4 mathematical operations, we can even get all weird and needlessly complicated with something like this:

```css
.element {
  margin: calc(10%/2em + 10px*4rem);
}
```

I'm not sure why you'd do something like this, but again, this is just an eye opener for you. Let's move on to that real-world scenario where `calc()` can help out greatly.

## Stepping It Up A Bit

Here's the scenario. We want to build a simple fixed-sidebar fluid-content layout. So imagine we have some markup like this:

```html
<div class="container">
  <div class="fixed">I am fixed</div>
  <div class="fluid">I am fluid</div>
</div>
```

You might want a fix-sized margin of 40px in between the two columns, so leveraging some negative margin and padding techniques, you'll probably do some math. I'd first set the size of the fixed column, add that to the desired fixed margin, pad the container, apply a negative left-margin on the fixed element, apply the right margin, and float the two elements. Exhausting, tough to change, but hey, it works. Here's the CSS:

```css
.container {
  padding-left: 340px;
}

.fixed,
.fluid {
  float: left;
}

.fixed {
  margin-left: -340px;
  margin-right: 40px;
  width: 300px;
}

.fluid {
  width: 100%;
}
```

What if now, we wanted to change the width of the fixed margin, or the fixed column size? We'd have to do over the calculations again, and re-apply. It can get tricky. Sass might be able to save us here, but what if we're not using Sass? Let's turn this up a little bit with the calc function and see how we can avoid the excessive calculations. Above, we made use of a 40px fixed margin, so let's do the same this time. Here's how simple this layout becomes:

```css
.container {
}

.fixed,
.fluid {
  float: left;
}

.fixed {
  width: 300px;
}

.fluid {
  margin-left: 40px;
  width: calc(100% - 340px);
}
```

Notice now that we don't even need to pad the container anymore, and there are no negative margins involved. We have one simple math calculation to make before setting up our CSS, and that's it.

Now, with flexbox coming of age amongst many other neat grid-type CSS formulas, the above might still seem a tiny bit dated. But calc plays nicely with flexbox, and based on experience, can come quite in handy there too. Nonetheless, the CSS above represents a completely valid and helpful use-case of the `calc()` function.

## Support

[Support is quite high for this](http://caniuse.com/#search=calc), and if you're mindset is in the modern sphere of things and your target audience is accessing your site/app from modern browsers, then there's no reason not to implement it in your projects today. It is a [candidate recommendation on the W3C](http://www.w3.org/TR/css3-values/), and due to it's incredible usefulness, it's here to stay.

## Wrap Up

That’s all, folks. Are you using the CSS `calc()` function? I'd love to hear about it and see an example, so feel free to reach out and let me know. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
