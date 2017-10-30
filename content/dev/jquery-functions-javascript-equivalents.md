---
title: Some jQuery Functions And Their JavaScript Equivalents
description: This collection of snippets takes a dive into some common and useful jQuery functions and their JavaScript equivalents.
img: /img/dev/jquery-functions-javascript-equivalents/jquery-functions-javascript-equivalents-featured.png
date: 2014-07-06T19:18:58-07:00
draft: false
---

In light of my recent forays into the JavaScript DOM world, I'd decided to do a little research and write a snippet collection based on jQuery functions and their JavaScript equivalents. I think jQuery is a great tool, and it has done great things for me and many others as developers. But I'm a firm believer that nowadays, JavaScript is an indispensable tool to keep in your arsenal. Manipulating the DOM with JavaScript DOM methods is fun and easy, and the majority of times, plain old vanilla JS is all we need. It seems scary at first, but let's take a look at some core functions/methods that we're accustomed to, how they work, and how to execute them with just plain old JavaScript.

## Accessing Elements

There are many ways to access elements with JavaScript and jQuery. Let's look at a few important ones here.

### By ID

In this above scenario, we're accessing by ID, so we'd expect that only one element is returned. With jQuery, we tend to access single elements by ID like this:

```javascript
var el = $("#element");
```

With regular JS, we can achieve this two ways:

```javascript
// traditional JS
var el = document.getElementById("element");

// new school JS
var el = document.querySelector("#element");
```

From here on, we can use these variables and apply our manipulations whenever we want. We've successfully assigned an element to a variable, and can now use it wherever we want.

### By Class & Tag

In jQuery, we also see that we can access all elements that have a certain class or tag. This is useful when we want to iterate over all of these elements and perform functions on them. We'd access them like this:

```javascript
// access by tag name
var els = $("p");

// access by class
var els = $(".class");
```

Here's the JavaScript equivalents:

```javascript
// by tag name
var els = document.getElementsByTagName("p");        // OR
var els = document.querySelectorAll("p");

// by class name
var els = document.getElementsByClassName("class");    // OR
var els = document.querySelectorAll(".class");
```

### Useful Tips

The methods `getElementsByTagName`, `getElementsByClassName`, `querySelector`, and `querySelectorAll` can be applied to DOM elements to return collections of elements or node lists that are children of an element in question. We can, for example, do this:

```javascript
var wrapper = document.getElementById("wrapper"),
    els = wrapper.querySelectorAll("p");
```

A jQuery equivalent would be this:

```javascript
var els = $("#wrapper p");
```

### Caveats

Here are some things to note:

1. Using `querySelector` on an element that exists more than once (e.g.: `querySelector("p")` will return the first matching element.
2. Technically, `querySelectorAll` returns a non-live node list of elements. This is in contrast to the HTMLCollection returned by `getElementsByTagName` and `getElementsByClassName`. Be mindful of that!

## Getting & Setting the HTML of an Element

It's fairly common practice in simple interfaces that after a user commits to a call to action, the HTML of an element is replaced. This can be to display a success or error message after a form submission, for example. Sometimes, we might want to fetch the HTML contents of an element and throw it into another element in our DOM. With jQuery, this is made possible by the simple `.html()` function. Here it is in action:

```javascript
// getting the HTML
var content = $("#content").html();

// setting the HTML
$("#box").html(content);
```

With JavaScript, we're presented with the function `innerHTML` that serves the same purpose. Here's a replication of the above, but with pure JavaScript:

```javascript
// getting the HTML
var content = document.getElementById("content").innerHTML;

// setting the HTML
document.getElementById("box").innerHTML = content;
```

Be mindful when using `innerHTML` though. According to the MDN:

> If a `<div>`, `<span>`, or `<noembed>` node has a child text node that includes the characters (&), (<), or (>), innerHTML returns these characters as `&amp`, `&lt` and `&gt` respectively. Use `Node.textContent` to get a correct copy of these text nodes' contents.

## Attaching Event Handler Functions to Elements

A very important part of JavaScript programming is attaching evened handler functions, or "listening" for events on elements in the DOM. These events range from click and hover, to blur. jQuery offers us a lot of direct attachment of event handlers, for example `$("#el").click();`, but we're going to look at a jQuery function that resembles pure JavaScript, and is very useful - the `.on()` function. Here it is in action, listening for a click on an element:

```javascript
// listening for a click on #el
$("#el").on("click", function(){
    console.log("element clicked");
});
```

The above should output "element clicked" to the console. With JavaScript, the implementation is friendly and straightforward. In fact, the name itself is very self explanatory. Here's the implementation:

```javascript
// listening for a click on #el
document.querySelector("#el").addEventListener("click", function(){
    console.log("element clicked");
});
```

### Multiple Event Handlers with jQuery

Here's something cool to note though. With jQuery, we can add multiple event handlers on the same element by comma-separating them before the function is called. Here's an example:

```javascript
// listening for a click and hover on #el
$("#el").on("click", "hover", function(){
    console.log("click or hover");
});
```

## Appending and Prepending Content

Often, we want to append or prepend some additional information or message to an element after user interaction. jQuery provides us two neat functions to take care of this -  `.append()` and `.prepend()`. The names give away their functionality, so let's look at some implementation:

```javascript
// append "success" message to a log
$("#log").append("<p>Success!</p>");

// prepend "error" message to a log
$("#log").prepend("<p>Error...go back and fix.</p>");
```

For appending content, JavaScript offers us a self explanatory function too - `Node.appendChild`. In this case though, we are dealing with nodes, so we can't directly insert content. Instead, we must insert a node that contains content. Let's take a look at this function in action:

```javascript
// create an element, give it some HTML, append it to #log
var p = document.createElement("p");
p.innerHTML = "Success!";
document.getElementById("log").appendChild(p);
```

Prepending isn't as straightforward, as there is no `Node.prependChild` function in JavaScript. However, using a combination of `insertBefore` and `firstChild`, we can insert our node before the first child of the element in question, i.e. prepending our node to `#log`. Let's take a look at this in action:

```javascript
// create an element and get our #log div
var p = document.createElement("p"),
    log = document.getElementById("log");

// add some HTML to p
p.innerHTML = "Error...go back and fix.";

// prepend p to #log
log.insertBefore(p, log.firstChild);
```

## Altering the CSS of an Element

Users tend to feel more welcome and safe when they feel this sense of familiarity. It's not uncommon then to see different colours or styles of things changing based on user interaction. Form failed to submit? Change the background colour to red. Successful submission? Change it to green. Want to hide the form after successful submission? Set the property to `display: none`. These are attributes of DOM elements that can all be controlled via CSS. jQuery conveniently gives us the `.css()` function to tap into an elements CSS. Let's take a look how:

```javascript
// this will output the element's background colour
var col = $("#el").css("background-color");
console.log(col);

// this will change the element's background colour to green
$("#el").css("background-color", "green");

// alternate syntax for passing array into .css
$("#el").css({
    "background-color": "green",
    "colour": "white"
});
```

On the vanilla JS side of things, we're presented with the function `HTMLElement.style`. This allows us to set the style of an element. Here it is in action:

```javascript
// change the colour of #el to green
document.getElementById("el").style.color = "green";
```

To actually get the style attribute of an element is a bit different though. According to the MDN:

> The style property is not useful for learning about the element's style in general, since it represents only the CSS declarations set in the element's inline style attribute, not those that come from style rules elsewhere, such as style rules in the `<head>` section, or external style sheets. To get the values of all CSS properties for an element you should use `window.getComputedStyle()` instead.

In jQuery, a similar function goes down when getting the style. Here's a look at `window.getComputedStyle()` in action:

```javascript
// this will return the computed colour of "el"
var el = document.getElementById("el");
var elStyle = window.getComputedStyle(el, null);
console.log(elStyle.color);
```

## Iterating Over a Collection of Elements

The last comparison we'll go through is of significant importance as it entails looping. Looping is a very important part of any programming language, and JavaScript is no different. Often times, we need to iterate over a collection of elements and perform some functionality to each of those elements. This is what loops are for.

Let's target all elements in our DOM with a class of `.el`, loop over them, and change the colour to blue. With jQuery, the `.each()` function gives us a nice starting point. Combining what we've learnt above, here's the implementation:

```javascript
$(".el").each(function(i, el){
    /**
     * i represents the integer value of where we are in the loop
     * el represents the element in question in the current loop
     * $(this) also represents the element in question in the current loop
     */

    // change the element colour to blue.
    $(this).css({
        "colour": "blue"
    });
});
```

With JavaScript, we can use a simple `for` loop to take care of this. The thought process behind it is the same - get a collection of HTML elements, loop over them, and edit them. Here's how:

```javascript
// get all elements with class .el
var els = document.querySelectorAll(".el");

// loop over them while i less than number of elements
for (var i = 0, len = els.length; i < len; i++) {
  els[i].style.backgroundColor = "blue";
}
```

### Bonus

Here's some swanky alternative JavaScript syntax that resembles the `.each()` function a bit more. It's a `forEach` function, and we first create an empty array and then add each of the nodes to it. After that, we iterate using a `forEach` statement. Here it is in action:

```javascript
[].slice.call(document.querySelectorAll(".el")).forEach(function(el,i){
    /**
     * i represents the integer value of where we are in the loop
     * el represents the element in question in the current loop
     */

     // change the element colour to blue.
     el.style.backgroundColor = "blue";
});
```

## Wrap Up

And that's a wrap! We've looked at some common and important jQuery/JavaScript comparisons, and seen that JavaScript isn't that scary after all. I'm not taking anything away from jQuery, I think it's amazing. But if you're using jQuery because you're scared to dive in to vanilla JS, then you shouldn't be. In 2014, JavaScript is a very important language and can take you far. I hope this collection of snippets helped clear the air for you a bit and got your feet a little wet with JS programming. Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
