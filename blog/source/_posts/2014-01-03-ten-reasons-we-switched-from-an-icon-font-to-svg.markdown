---
layout: post
title: "Ten reasons we switched from an icon fornt to svg"
date: 2014-01-03 23:52
comments: true
categories: 
---

We use a *lot* of icons on [lonelyplanet.com](www.lonelyplanet.com/france/paris) and recently went through the task of transferring them from an icon font to svg files. I wanted to share why we did this along with some of the drawbacks to svg and how we got around them.


# 1. Separation of concerns

We like to split resources into critical and non-critical piles, with the non-critical assets being loaded asynchronously. Having our icons bundled into the same file as our font was great for minimising http requests but also restricted our ability to customise their loading order.

Only a portion of our icons are considered critical to our application. The remaining icons, as well as the font, are considered non-critical. Breaking them out allowed us to be more granular in how they were delivered to the user.

### Counter argument

You don't have to bundle the font and the font icons together, you could serve two separate fonts.


# 2. Some devices don't honour the PUA

I'd heard rumours about devices overriding your glyphs in the private unicode area and using them to serve emojii but I hadn't seen it happen until recently. I can't remember which device it was on, but seeing a tick icon being served as a multicolour printer certainly gave us impetus to make this change. It served as a reminder that we didn't have the control we wanted.


# 3. To get rid of the black squares and crosses on opera mini

I'm sure you've all seen this image of opera mini reporting font face support but not delivering it.

[http://blog.kaelig.fr/post/33373448491/testing-font-face-support-on-mobile-and-tablet](http://blog.kaelig.fr/post/33373448491/testing-font-face-support-on-mobile-and-tablet)

### Counter argument

We don't have many opera mini users, do a better test for font-face. Well yeah, but we're a travel company serving people in all conditions on all bandwidths so we want to do better than that.


# 4. Chrome support for font-icons has been terrible recently

Chrome Canary and Beta have been rife with [font bugs](https://code.google.com/p/chromium/issues/detail?id=236298&q=font&colspec=ID%20Pri%20M%20Iteration%20ReleaseBlock%20Cr%20Status%20Owner%20Summary%20OS%20Modified) recently. When a font unloads and you're left with Georgia it's annoying but the page is still very usable. When you're using font icons suddenly the page is littered with black squares and looks horrendous.

All this was happening as we were switching over to svg and just as we were starting to get our first bug reports about it. It was a relief to cut over and avoid it.

### Counter argument

Those bugs haven't made it to stable and SVGs could face a similar bug in the future.


# 5. Crisper icons in Firefox

We've found Firefox to render our font at a slightly stronger weight than other browsers. This is fine for text but for icons it can make the entire page look a bit unloved. By using SVG we are able to normalise the look and feel of our icons cross browser.


# 6. You don't always have to use generated content.

If you want to use font-icons in css you need to declare them using the content property in generated content. Sometimes you might find yourself having to complicate your code to make this possible i.e. because you are already using the :before and :after elements. If you choose to use it inline you end up with html entities scattered through your code which are hard to maintain within a large application.

With SVG you are not limited to this and can use them as background images on any element or as inline elements themselves.


# 7. Less fiddly to position

This may be a result of how we managed our icon glyphs, but we always found them awkward to position exactly how we wanted them (and consistently cross browser). We resorted to line height hacks and relative/absolute positioning to get them just right and it was difficult to come up with an abstraction that worked consistently.

With SVG we've found the placement much more willing, using background-size and simply resizing the element to ensure consistency.


# 8. Multi-colour icons - helped us remove another sprite

Font icons are well known to have a single colour limitation. We have always had to support multi-colour map icons so moving to SVG, where this is supported, allowed us to delete an extra image sprite.

### Counter argument

This can be accomplished using icon layering. It is significantly more challenging to do so successfully though: if positioning one glyph correctly cross-browser is tricky, it won't get easier with two.


# 9. SVGs allow us to use animation within our icons.

We haven't yet, so I have nothing to add here :) It is likely a feature we will use now that we have made the jump though.


# 10. It's always felt like a hack.

Through a combination of all of the above, using fontface for icons has always felt like a hack to me. It is a brilliant hack, no doubt, but it's still a different asset type masquerading and being manipulated into something greater.


# Cons:

Fontface does have some benefits over SVG which we considered in depth before making the jump.

## Browser support

Font icons work all the way back to IE8 ([http://caniuse.com/#search=font-face%20web](http://caniuse.com/#search=font-face%20web)) whereas SVG ([http://caniuse.com/#search=svg%20in%20css](http://caniuse.com/#search=svg%20in%20css)) does not. We also require support for background-size ([although this is fairly comparable to svg support](http://caniuse.com/#search=background-size)).

### Our solution

[Grunticon](https://github.com/filamentgroup/grunticon) will handle legacy support right out of the box. We ended up tweaking it in our implementation, serving just a subset of the icons (the critical ones) to unsupported browsers, and testing for background-size rather than svg support.


## Colour variations

The *huge* benefit to using an icon font is its flexibility. You have no limitation to the amount of color variations and can easily switch it depending on the current state (:hover, :focus, .is-active etc.). This is a huge luxury and very useful, it was also the reason we resisted making the leap to svg for so long. 

### Our solution

There are a few no-js solutions and all of them have their own limitations (for now). We finally came up with a technique which we were pretty happy with and which hasn't limited us so far.

Grunticon hints at declaring the icons individually thus avoiding having to use sprites and eliminating problems like the other icons bleeding in. We followed suit with this approach but although we had one css selector per icon, that icon was a sprite with six different colours versions stacked on top of one another. As it was the same icon duplicated multiple times within the same file, it compressed down to the size of just one icon (plus around 50 bytes for gzip pointers). This meant that we could have n colour variations for each icon at almost no cost. [Example code](http://jsfiddle.net/Wmcbz/).

With this solution we had the flexibility back that we thought we would miss. It also brought the added benefit of reinforcing consistency that had gradually been lost from our font icons implementation. It also meant we could easily apply state-based changes to the icons by updating their background position.

It's worth mentioning that in the future we may be able to remove the sprite altogether and use [SVG Fragment Identifiers](http://www.w3.org/TR/SVG/linking.html#LinksIntoSVG) to change the colour.



# Was it worth it?

SVGs have been live on [Lonely Planet](http://www.lonelyplanet.com/england/london) for about 2 months and development has been painless since then. It's still early days so we may be getting ahead of ourselves but I'm pretty happy we made the jump.