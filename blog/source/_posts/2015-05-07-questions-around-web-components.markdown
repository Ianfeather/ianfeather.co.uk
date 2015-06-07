---
layout: post
title: "Questions around Web Components"
date: 2015-05-07 11:30
comments: true
categories:
---

Intro...

<ol>
  <li><a href="#custom-elements">Does custom element naming bring any benefit?</a></li>
  <li><a href="#progressive-enhancement">Can we progressively enhance Web Components?</a></li>
  <li><a href="#server-side">Can we render Web Components on the client <em>and</em> server?</a></li>
  <li><a href="#dependencies">Do Web Components force us to assume dependencies?</a></li>
  <li><a href="#http2">Is there a hard dependency on http/2?</a></li>
  <li><a href="#build-system">Do Web Components need a build system?</a></li>
  <li><a href="#third party">Are third party components ever going to be that usable?</a></li>
  <li><a href="#tipping-point">What is going to be the tipping point for their adoption?</a></li>
</ol>

bit more intro...



<h2 id="custom-elements" class="blog-subtitle">Does <code>&lt;my-tabs&gt;</code> bring any benefit?</h2>

What do you gain from custom element names?
It's marginally neater of course, but is there real benefit from `<my-tabs>` over `<div class='my-tabs'>`?
Does it reduce complexity or simply hide it in the shadows?
There's no semantic value therefore difficult for screenreaders to infer any meaning.



<h2 id="progressive-enhancement" class="blog-subtitle">Can we progressively enhance Web Components?</h2>

Short answer - yes. `is-` makes it possible to extend current elements.

Longer answer - yes but it will matter how you structure your non-shadow dom.

(pre|no)-js - the data in the dom has to make sense by itself. `<my-greeting>Ian</my-greeting>` offers no meaning.

There will be situations where this is less important. eg. `<google-map lat='123' long='256' />` but then that again is meaningless without js.

What do they look like before JS though? There will be no component css (which should live within the shadow dom) so they will have to rely on global css (which we want to avoid).

And if html imports doesn't get standardised (which it looks like it won't as mozilla don't want it) we will need either a blocking js call or to handle the fout that comes with the deferred css.



<h2 id="server-side" class="blog-subtitle">Can we render Web Components on the client <em>and</em> server?</h2>

Obviously we can send `<my-tabs>` over the wire, it's just a string. But we can't really call that a Web Component.

What about the inner content? One of the advances in tools like React and Ember has been rendering the full content on the server. Web Components were conceived prior to this.

They'd have to be on the file system or well cached.

Easy enough to render the html import and inline it in the document to be sent over the wire but with huge caveats. Shadow dom suddenly becomes real dom until js kicks in. Inline style blocks within the html import become global.

`<shadowroot>`, `shadow` and `shadow-root` might help with this.

Otherwise you are going to need to work around this. Iframes is one such solution, as are build tools like webpack which enable us to scope css and highly specific class names. Even then, you're likely to see different results as the specificity is going to be different.

Alternatively you could strip the style altogether and rely on default fallback styling but you then have to handle the FOUC or cater for your components ahead of time (requiring knowledge of which components you will use on the page and defeating one of the main purposes)

And that's just CSS. We will also likely have many JS tags scattered around the page. Usually these are async? {**CHECK**} So we will have to attach async or defer these script tags in that case.


<h2 id="dependencies" class="blog-subtitle">Do Web Components force us to assume dependencies?</h2>

With JS we don't need to assume dependencies, we can either check for the presence of globals or simply order our script tags / import modules and ensure that our code will be executed once they are satisfied. Ideally we're only going so far as to hit the browser cache each time.

With CSS things are slightly murkier because external requests for CSS files aren't currently possible in Web Components. This means we can't split out our css into modules and rely on the browser cache.

Is this the end of global css? That would be nice.

Reset, normalise?

Grid systems?


<h2 id="http2" class="blog-subtitle">Is there an implicit dependency on http/2?</h2>

http/2 removes the need for concat. Web Components embrace the philosophy of independent modules. They go hand in hand.

This provides a really nice no-build workflow.

But would the adoption of a no-build workflow significantly slow a web which is predominately pre http/2? Given the slow ascent of http/2 (in no small part to the need for https) could Web Components potentially be damaging to the web in the short term?

Or..



<h2 id="build-system" class="blog-subtitle">Do Web Components need a build system?</h2>

Is it a goal of web components to be complete enough to not require a build system? It feels like it is and it also feels like that's both a good goal and an enjoyable way of working.

Is it a big deal if it does require to be part of a build system? Not really, we're all more or less using them now and they're not going anywhere.

Currently Vulcanise exists to help with this.

Webpack could handle concat of assets, isolation of styles, http/1 fallbacks (sort of).




<h2 id="third-party" class="blog-subtitle">Are third party components ever going to be that usable?</h2>

A lot of talk about Web Components being the new jQuery plugins ecosystem, and concern over them becoming so. The hope is that the cream rises to the top and that we can promote the "best" component for each task i.e. `<greatest-tabs-component>` but a quick look at the react or angular ecosystems shows they still have their fair share of implementations.

Given the dependency matrix we are likely to see something more like:

tabs-angular-v1
tabs-angular-v2
tabs-ember
tabs-jquery
tabs-vanilla
tabs-vanilla-compat
tabs-polymer

Then you can multiply each of those by the number of implementations, then consider other dependencies like lodash, underscore or the brimming underdash and their variant modular builds.

More likely than including jQuery or lodash, many will claim to be "zero-dependency components" which means they will either write everything out long form or, more probably, each include their own small build of lodash or own utility functions. Of course, if they include full versions of each, regardless of whether you already have them available on the page they will be downloaded in full.

And we also have to consider polyfills and es shims, and finding the right 3rd party component for you could be trickier than it is now. Web Components definitely seem like they are better suited to reusability within projects rather than across them.

How do you extend a third party component, do you have to fork it?



<h2 id="tipping-point" class="blog-subtitle">What is going to be the tipping point for their adoption?</h2>

Current support is mostly Blink, with partial support in Firefox.

Spec is ambitious therefore standardisation is a lengthier process (conjecture).

In the meantime, innovation in the component world elsewhere is staggering and racing away from the expected v1 of Web Components.

The question is, when v1 is ready to go, are people going to be uisng and testing it enough, and in advanced use cases, in order to better the standard implementation and make it at least as beneficial as other non-standard tools.

Angular v2 could make a big difference for adoption.

This isn't meant to be over dramatic. It's more of a 'when' rather than 'if' question, but if in a year we're still talking about Github's `<time>` element it will be a real shame and indicator of stagnation.
