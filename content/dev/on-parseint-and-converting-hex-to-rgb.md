---
title: On parseInt and Converting Hex to RGB
description: In this tutorial, we deep dive into the parseInt function and attack a common problem - converting hex colours to RGB.
img: /img/dev/on-parseint-and-converting-hex-to-rgb/on-parseint-and-converting-hex-to-rgb-featured.png
date: 2016-10-03T15:53:20-07:00
draft: false
---

The other day, I was faced with a task that required me to plunge into a little deeper into JavaScript's `parseInt()` function, and gain a better grasp of numeral systems and radixes (bases). The problem was simple. I needed to convert hex colours to RGB. Before we jump into anything, let's look at a few definitions for reference:

* **parseInt()** - The parseInt() function parses a string argument and returns an integer of the specified radix (the base in mathematical numeral systems) ([ref MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt)).
* **radix** - In mathematical numeral systems, the radix or base is the number of unique digits, including zero, used to represent numbers in a positional numeral system ([ref Wikipedia](https://en.wikipedia.org/wiki/Radix)).
* **hex** - or hexadecimal, is a numbering system that uses 16 as the radix, employing the numerals 0 through 9 and representing digits greater than 9 with the letters A through F ([ref dictionary.com](http://www.dictionary.com/browse/hexadecimal)).

I use the `parseInt()` function very often, but never really stopped to examine its inner workings. Mostly, I've used it to do strict comparisons between strings and integers, something in the form of:

```javascript
return parseInt($el.getAttribute('data-id')) === i;
```

Knowing my projects, the assumptions have always been clear that those data attributes would return a string like `'25'` or `'117'`. However, numbering and parsing integers goes a lot deeper than that. Let's look at the problem I mentioned above.

## Converting Hexadecimal Strings to Integers

The problem, as it turns out, is actually quite simple once you understand numeral systems and conversions. And if you have experience with both RGB and hex colours in CSS, then you'd have noticed some patterns by now as well:

1. `000000` in hex is `0, 0, 0` in RGB
2. `ffffff` in hex is `255, 255, 255` in RGB
3. Each pair of characters in the hex string represents one number in the RGB string
4. In hex, the darkest value is a 0, and lightness increases from 0-9 then a-f
5. In RGB, the darkest value is a 0, and lightness increases from 0-255

These comparisons have always made it easy for me to "see" colours in both hex and RGB. But what's the actual relationship here? It's obvious that:

1. a `00` hex pair is a `0` on the RGB scale
2. a `ff` hex pair is a `255` on the RGB scale

That's all well and good, but what about everything in between? Well, based on our definition of hexadecimal up above, our hexadecimal numeral system looks like this:

```
0123456789abcdef
```

A quick count shows us 16 characters, but we don't actually need to count to know that. The radix for hexadecimal values is 16, which means 16 digits are responsible for its numbering system. To put that into perspective, we as humans are mostly familiar with base 10 digits, where the 10 digits are:

```
0123456789
```

We can construct any number imaginable from these 10 digits.

When we talk about parsing an integer, we're talking about reading a string of digits, and returning an integer of the specified radix. The `parseInt()` function allows us to specify a radix as the second argument, like this:

```javascript
parseInt(string, radix);
```

So a contrived example would be:

```javascript
var year = '1985';
parseInt(year, 10); // => 1985
```

In the above example, we're parsing the string `1985` with a radix of `10`, which obviously returns `1985`. Let's look at some hex strings now:

```javascript
parseInt('0', 16); // => 0
parseInt('00', 16); // => 0
parseInt('1', 16); // => 1
parseInt('2', 16); // => 2
parseInt('f', 16); // => 15
parseInt('0f', 16); // => 15
parseInt('10', 16); // => 16
parseInt('78', 16) // => 120
parseInt('a6', 16) // => 166
parseInt('ff', 16) // => 255
```

As expected, the returned integer increases as we move from 0 to f. Here are some other observations as well:

* Leading 0s are ignored when parsing (`0f` is the same as `f`)
* When we reach `0f`, the next in line is `10` - this is equivalent from going from `9` to `10` in base 10 numbers

Since hex number codes are represented by three two-letter strings* representing red, green, and blue values, we can easily convert a hex colour to RGB like this:

```javascript
var col = 'f30d91';

var r = col.substr(0, 2);
var g = col.substr(2, 2);
var b = col.substr(4);

return {
  r: parseInt(r, 16),
  g: parseInt(g, 16),
  b: parseInt(b, 16)
};
```

*\*Sidenote: hex colour codes can also be represented by a 3 letter string, where each letter is assumed to be repeated once. Example, `f03 === ff0033`. This is only related to how CSS interpreters parse colour codes, but not how the hexadecimal scale works, as `f !== ff` in hexadecimal.*

## Subtleties and Nuances of `parseInt`

Before wrapping up, let's take a quick look at some subtleties and nuances of the `parseInt()` function, as taken from the [MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/parseInt):

* If parseInt encounters a character that is not a numeral in the specified radix, it ignores it and all succeeding characters and returns the integer value parsed up to that point:

  ```javascript
  parseInt('02', 2); // => 0
  parseInt('101', 2); // => 5
  parseInt('102', 2); // => 2
  parseInt('10', 2); // => 2
  ```

* `parseInt` truncates numbers to integer values
* Leading and trailing spaces are allowed
* If radix is undefined or 0 (or absent), JavaScript assumes the following:
    * If the input string begins with "0x" or "0X", radix 16 is assumed
    * If the input string begins with "0", radix 8 or 10 is assumed, and the choice is implementation dependent
    * If the input string begins with any other value, radix 10 is assumed
* If the first character cannot be converted to a number, parseInt returns NaN:

  ```javascript
  parseInt('2', 2); // => NaN
  parseInt('hello', 8); // => NaN
  ```
* For arithmetic purposes, the NaN value is not a number in any radix

## A Final Word of Advice

As a final word of advice, I'd say that from now on, whenever you use the `parseInt` function, you should also specify the radix, even though it's optional, and here's why:

1. Based on the nuances described above, we can't always hope for consistent behaviour.
2. We can't assume that fellow developers will know what radix system we're working with when they look at our code.

## Wrap Up

And that’s a wrap! I hope this little tutorial helped you learn a bit more about numeral systems, radixes, and parsing integers. I certainly did! Thanks again for reading, and if you have and questions, comments, or feedback, feel free to <a href="http://twitter.com/home?status=@nicksalloum_ I got a question for you!" target="_blank">send me a tweet.</a>
