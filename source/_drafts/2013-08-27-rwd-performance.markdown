---
layout: post
title: "RWD Performance"
date: 2013-08-27 08:52
written: ""
comments: true
categories:
---

Responsive Web Design gets an undeservedly bad reputation in the performance field. Mdot sites are always believed to be more focused and lightweight and, whilst that is often the case, part of the reason for this perception is that most desktop sites are overly bloated to begin with.

<div class="clearfix">
  <img src="/images/homepage.jpg" class="wv--float-right image--right"/>

    <p>So when we got the design for the new Lonely Planet homepage my initial reaction was that we were going to struggle to make it as performant as we are used to. It was full of rich imagery and featured different components within viewport ranges.</p>

    <p>Indeed, when we launched the homepage it wasn't as performant as we had wanted. It was usable in a short amount of time, but was too heavy and took far too long to finish downloading.</p>

    <p>Over the week after it was launched I spent some time tweaking it and coming up with ways to make it perform better. This resulted in the visually complete timestamp dropping from 15.7s to 3.6s, with a start render time of under 1s.</p>

</div>

<div class="clearfix">

  <table>
    <tr>
      <td class="heading"></td>
      <td>Start Render</td>
      <td>Visually Complete</td>
      <td>Fully Loaded</td>
      <td>Bytes In</td>
    </tr>
    <tr>
      <td class="heading">Before</td>
      <td>1.151s</td>
      <td>15.700s</td>
      <td>18.512s</td>
      <td>3,160 KB</td>
    </tr>
    <tr>
      <td class="heading">After</td>
      <td>0.812s</td>
      <td>3.600s</td>
      <td>5.564s</td>
      <td>674 KB</td>
    </tr>
  </table>

  <div class="wv--float-left wv--split-left">
    <div class="box-off">
      <video>
        <source src="/videos/before.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
      <a href="http://www.webpagetest.org/result/130813_36_8076aeaa707718946c9215db9ced7215/1/details/">View waterfall</a>
    </div>
  </div>
  <div class="wv--float-right wv--split-left">
    <div class="box-off">
      <video>
        <source src="/videos/after.mp4" type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"' />
      </video>
      <a href="http://www.webpagetest.org/result/130824_X0_9TY/4/details/">View waterfall</a>
    </div>
  </div>

</div>

# Here's how we did it

The ability to achieve these timings is rooted in progressive enhancement. We needed to normalise the view to the lowest common denominator and then build it back up with feature detection. The main regret with this approach was that we were not able to enhance the experience based on bandwidth or connection type, but rather had to generalise based on viewport and device capabilities.


1. Start with a base experience

Piggybacking heavily off the BBC News approach to cutting the mustard, any browser which has no javascript support or which fails to 'cut the mustard' will receive a reduced but still fully functional experience. That means it has:
- Navigation
- Search functionality (the main page purpose)
- No javascript (obviously)
- Just one image (the logo)

The one exception to this technique for us is we ensure IE8 still receives an enhanced experience. For a web team what supports an IE7 experience, handing it the base version of the site was extremely satisfying.

It's a shame we have to make this decision based solely on browser support and it would be great to serve this base version to users on slow connections. Unfortunately this is not yet possible.

The base experience measured out at 4 requests and 53kb but because we were hiding parts of the page this was only possible due to the next step.

2. Stop non visible assets downloading

One approach to serving different layouts is to ajax in non-core content if, say, we have a larger viewport that can support it. We took the approach of loading all the html and conditionally hiding it instead. Caching the entire html document on the edge allowed us to take this approach without any fear of slowing down the base experience.

The big issue with this approach is that any images referenced inside hidden containers will still be downloaded. In order to get round this, we created a helper which wrapped all our image tags inside html comments.

... Example image snippet ...

Background images on hidden elements were simply assigned behind an enhanced flag.

.container {background: blue}
.enhanced .container {background-image: url(example.jpg)}

3. Create the enhanced experience




4. Don't serve jQuery to mobile

Our desktop site's JavaScript components all have jQuery as a dependency because we support IE7+. By using the Cut the Mustard technique we were able to  qualify the abilities of the mobile browsers and create an alternative to jQuery which would mimic its api and could be inserted as a dependency into our existing components.

We used Remy Sharp's [min.js](www.github.com/rem/min.js) as a starting foundation and added other methods where necessary.

We then changed the main module for requirejs dependent on viewport size. This also gives us some flexibility to remove jQuery as a dependency going forward (if we felt it worthwhile, and when we can drop support).

... Insert requirejs_async script here ...
