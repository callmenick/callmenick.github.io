---
title: The CSS Not Selector
description: The CSS :not selector enables us to target conditions that are NOT met. In this set of snippets, we look at some useful cases of using the :not selector.
img: /img/dev/the-css-not-selector/the-css-not-selector-featured.png
date: 2015-03-20T19:13:57-07:00
draft: false
---

I discovered the CSS `:not` selector recently, and it’s pretty cool. In a nutshell, you can chain it or apply it to certain selectors and style everything that does NOT meet the condition (e.g. everything BUT `span` tags). Let’s get a bit more formal.

## Definition Of The `:not` Selector

According to the MDN:

> The negation CSS pseudo-class, `:not(X)`, is a functional notation taking a simple selector X as an argument. It matches an element that is not represented by the argument. X must not contain another negation selector, or any pseudo-elements.
>
> The specificity of the `:not` pseudo-class is the specificity of its argument. The `:not` pseudo-class does not add to the selector specificity, unlike other pseudo-classes.

Pretty handy, right? Let’s look at some examples.

## Example 1 – Not A Selector

This case of `:not` will negate all selectors specified. Our HTML might look like this:

```html
<section>
  <p>Pellentesque habitant morbi tristique senectus et netus et.</p>
  <span>Malesuada fames ac turpis egestas. Vestibulum tortor quam.</span>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit!</p>
</section>
```

and our CSS like this:

```css
section :not(p) {
  color: rgb(40,170,220);
}
```
and our output like this:

![Not a selector](/files/2015-03/css_not_1.png)

## Example 2 – Not A Class

This case of `:not` will negate all classes specified. In other words, we’ll target everything except the class in question. Our HTML may look like this:

```html
<section class="highlight">
  <p>Pellentesque habitant morbi...</p>
</section>
<section>
  <p>Lorem ipsum dolor....</p>
</section>
```

and our CSS like this:

```css
body {
  background-color: rgb(40,170,220);
  color: #fff;
}
section {
  padding: 20px;
  text-align: center;
}
section:not(.highlight) {
  background-color: rgb(80,80,80);
  font-size: 14px;
}
```

and the output like this:

![Not a class](/files/2015-03/css_not_2.png)

## Example 3 – Usage With Pseudo Selectors

The spec mentions we can’t combine the `:not` selector with pseudo elements. We can, however, combine it with pseudo selectors, for example `:nth-child`. Here’s an example of what some HTML might look like:

```html
<body>
  <p>Pellentesque habitant morbi...</p>
  <p>Pellentesque habitant morbi...</p>
  <p>Pellentesque habitant morbi...</p>
</body>
```

and our CSS like this:

```css
body {
  background-color: rgb(40,40,40);
  color: #fff;
}
p:not(:nth-child(1)) {
  color: rgb(255,50,100);
}
```

and our output like this:

![With pseudo selectors](/files/2015-03/css_not_3.png)

## Wrong Uses

As mentioned before, we can’t combine the CSS `:not` selector with pseudo elements, for example `::before`, `::after`, and `::first-line`. It fails to work in this instance. For a list of pseudo elements, check out the [MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements).

## Support

Support for the `:not` selector is actually fairly good overall. All Chrome & Firefox supports it, Safari 3.2 and up support it, and IE9 and up also. I would still recommend keeping the usage case of this selector to purely aesthetic so that old IE falls back nicely…progressive enhancement if you must.

## Wrap Up

And that’s a wrap! Have you used this selector before? What are your thoughts about it? Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
