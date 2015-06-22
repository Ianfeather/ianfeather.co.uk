---
layout: post
title: "Practical Questions around Web Components"
date: 2015-06-19 11:30
comments: true
categories:
---

Components allow us to build simpler applications by composing independent parts into a greater system. Good component design means you should only need to focus on one component at a time, holding less information in your active mind in order to complete a task. This gives you more mental capacity to focus on the task at hand and ultimately make better decisions.

The future standard of componentisation is Web Components and I’ve been trying to get my head around them for a while: how they marry up with current challenges and innovations in component design and where they fit going forward. Even though I have far from a clear picture on where Web Components are going (Wilson Page wrote [a great article](https://hacks.mozilla.org/2015/06/the-state-of-web-components/) on where they are right now) I think there’s a benefit to getting these questions down to find out how others see these problems, whether they’re problems at all, or if this is even just the tip of the iceberg.

I’m not going to go into the basics of what makes up the Web Component spec, there are plenty of [such](https://css-tricks.com/modular-future-web-components/) [guides](http://cbateman.com/blog/a-no-nonsense-guide-to-web-components-part-1-the-specs) already written. Instead what I’d like to cover is some very practical questions:

<ol>
  <li><a href="#custom-elements">Do Custom Element names bring any benefit?</a></li>
  <li><a href="#progressive-enhancement">Can we progressively enhance Web Components?</a></li>
  <li><a href="#server-side">Can we render Web Components on the client and server?</a></li>
  <li><a href="#dependencies">Do Web Components force us to assume dependencies?</a></li>
  <li><a href="#http2">Is there an implicit dependency on http/2?</a></li>
  <li><a href="#third party">Are third party components ever going to be that usable?</a></li>
  <li><a href="#tipping-point">What is going to be the tipping point for their adoption?</a></li>
</ol>


<h2 id="custom-elements" class="blog-subtitle">Do Custom Element names bring any benefit?</h2>

Current HTML elements only have semantic meaning because they exist within a dictionary. We know what `h1` and `cite` mean because they have been deliberated and standardised. Browsers, search engines and screen readers also understand their meaning and use them to determine the intended use of a selection of elements. Custom elements belong to no such dictionary. Not yet at least. `<my-tabs>` has as much relevance as `<foo-bar>` unless renderers decide to infer meaning.

[Alex Russell spoke on the ShopTalk show](http://shoptalkshow.com/episodes/157-alex-russell/) about how, in the long term, the use of Custom Elements across the web will allow us to know exactly which components developers need and use this to prioritise the development of native components. There is merit to that approach for sure, though perhaps the bootstrap components list could take us 90% of the way there immediately.

Some people have noted how much cleaner the DOM can look with Custom Elements and it’s hard to disagree. I mean, `<my-tabs>` is definitely nicer to look at than `<div class='my-tabs'>` but it’s hardly a game-changer and it doesn’t really provide anything compelling to be excited about. A simple looking DOM is no guarantee of a simpler system, it may only be pushing the complexity into the shadows.


<h2 id="progressive-enhancement" class="blog-subtitle">Can we progressively enhance Web Components?</h2>

It's pretty clear that Web Components have a strong reliance on JavaScript. With JS turned off the user is left with only the information we placed in the DOM to begin with. Layout-wise, any unknown elements will resolve to the equivalent of a `span`.

Extension of current elements is on the cards and would allow you to construct your elements with all the benefits of current native ones. In [this post](https://adactio.com/journal/7967) by Jeremy Keith he discusses how we can use the `is-` syntax to extend standard elements. It looks like this approach may [not be agreed upon](https://wiki.whatwg.org/wiki/CustomElements) and so might not find it's way into v1, though there are still ways of extending native elements when declaring your components.

We are still able to have markup within our "light DOM" and this is ultimately where I think you will have the opportunity to make the component meaningful prior to the Web Component being initialised. There are small wins you can make just by prioritising content over attributes, both of which are entry points to the Web Component. e.g.

<pre class="language-markup"><code>&lt;user-greeting user="ian" /&gt;</code></pre>

<pre class="language-markup"><code>&lt;user-greeting&gt;Ian&lt;/user-greeting&gt;</code></pre>

How you declare your data still matters though. If the shadow DOM for the component looks something like:

<pre class="language-markup"><code>&lt;template id="user-greeting"&gt;
  &lt;style&gt;
    div { padding: 30px; color: red; }
  &lt;/style&gt;
  &lt;div&gt;
    Hello &lt;content&gt;&lt;/content&gt;, welcome back!
  &lt;/div&gt;
&lt;/template&gt;
</code></pre>

Non-enhanced user experiences will only see the word &ldquo;Ian&rdquo; instead of &ldquo;Hello Ian, welcome back!&rdquo;. This by itself makes no sense because it lacks all context. Determining whether or not we can build resilient and progressively-enhanced applications with Web Components may fall entirely on the thought process and design around how we describe each interface.

_What about styling and the Flash of Unstyled Content?_

Let's assume the user has JavaScript but is on a slow connection. By adding styles to the component we have introduced a FOUC before it is loaded, how do we plan for this? How will the component actually render before it's initialised?

One approach would be to serve a very small subset of styles upfront to ensure that all the raw DOM looks "ok" before being enhanced. This wouldn't prevent a FOUC and reflow but it would make it slightly nicer.

Another approach would be to bundle all the CSS from within the components and serve it in the head. Crucially, this relies on the page having to know exactly which components it will show at any one time: something we would love to avoid in an ideal world where we can arbitrarily load components into any page.

This is an issue that isn't just limited to unsupported browsers. Currently, if you're trying out html imports, you'll find that you can simply place them higher up in the DOM and avoid any FOUC. This has the downside of being a blocking request and a bottleneck for the page. If html imports [don't become part of the standard](https://hacks.mozilla.org/2014/12/mozilla-and-web-components/) or if we just want to load them asynchronously for performance, we will need to anticipate and prepare for the FOUC.

<h2 id="server-side" class="blog-subtitle">Can we render Web Components on the client <em>and</em> server?</h2>

Just as we want to make our component imports non-blocking to speed up page-load we may also want to render the initial page on the server. This approach was originally taken by [airbnb](http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/), popularised by techniques with React and more recently adopted by Ember in [Fastboot](http://emberjs.com/blog/2014/12/22/inside-fastboot-the-road-to-server-side-rendering.html). Can we do the same with Web Components? Is this even a goal for the Web Components project?

Obviously we can send `<user-greeting>` over the wire, it's just a string. But we can't really call that a Web Component as such, at least not a fully formed one. What about the inner content? If possible we want to render all of the component so that instead of the client receiving:

<pre class="language-markup"><code>&lt;user-greeting&gt;Ian&lt;/user-greeting&gt;</code></pre>

they would instead receive:
<pre class="language-markup"><code>&lt;div id="user-greeting"&gt;
  &lt;style&gt;
    div { padding: 30px; color: red; }
  &lt;/style&gt;
  &lt;div&gt;Hello Ian, welcome back!&lt;/div&gt;
&lt;/div&gt;
</code></pre>

This approach comes with a pack of Aspirin because we have just turned Shadow DOM into real DOM. Our component's CSS has just become global CSS, ready and willing to conflict with every other element we have on the page. If we included any scripts within the component these will also have become blocking unless we load them asynchronously.

There are a selection of hacky ways to get around the styles problem:
- Use BEM or another class management strategy
- Add a generated class on the parent and scope all styles within that
- Transform all the styles to be inline styles on the elements

None of these are particularly nice: BEM and generated classes are stepping stones to true scoping that we'd like to leave behind and moving all the styles into inline ones doesn't cater for pseudo classes.

Perhaps here we need something standardised and declarative like [shadowroot](https://twitter.com/wilsonpage/status/586485120342822913) which would allow us to define which styles shouldn't bleed? Regardless of the solution, this feels like a feature which is needed in order to not slow the web further.


<h2 id="dependencies" class="blog-subtitle">Do Web Components force us to assume dependencies?</h2>

HTML imports don't currently support `<link>` elements so more commonly we've seen examples of `<style>` used within the Shadow Dom. Does this force us to assume other dependencies have already been satisfied? With CSS, dependencies have always been somewhat implicit and in the world of components, where we should have true interopability, is this going to highlight an issue we've always sidestepped?

What are we talking about when we talk about CSS dependencies? Essentially anything that you would often rely upon as automatically being present: Resets or normalize, Grid systems, Typographic styles, Utility classes etc.

Should this be [The End of Global CSS](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284)? We need a solution on how to compose CSS rules as well as being explicit about dependencies. This area of CSS development is ripe for investigation and experimentation.

We can again turn to JS to look for a solution to both fetching and authoring. Authoring [CSS in JS](https://speakerdeck.com/vjeux/react-css-in-js) is becoming much commonplace recently, with some really exciting experiments happening, but is unlikely to become the methodology for the masses.

[Css-modules](https://github.com/css-modules/css-modules) provide an interesting middle-ground with a huge amount of potential. [Glen Maddern](https://twitter.com/glenmaddern) has written more about them in [Interoperable CSS](http://glenmaddern.com/articles/interoperable-css).


<h2 id="http2" class="blog-subtitle">Is there an implicit dependency on http/2?</h2>

How http/2 will change the way we structure and build our applications, particularly in relation to asset loading, is still being determined but one highly touted feature is the reduced need for bundling assets together. In theory, it [will be more performant to request multiple small assets](https://http2.github.io/faq/) rather than one large bundle because we will make the cache more granular and not lose that much on the network.

Web Components embrace the philosophy of independent modules and together with http/2 you can immediately imagine a nice no-bundle workflow. Without a further build step there would be an increase in the number of requests though, so would the adoption of Web Components significantly slow a web which is predominately pre http/2?

Currently [Vulcanise](https://www.polymer-project.org/0.5/articles/concatenating-web-components.html) exists to help with this by bundling your imports and their dependencies and I'm sure support for bundling Web Component assets will arrive in your preferred build tool in the future too. Personally I look forward to a workflow that allows me the flexibility to arbitrarily load components into the page and for them to just work, without considering the assets for the system as a whole. For now, and potentially forever, that's certainly not realistic.


<h2 id="third-party" class="blog-subtitle">Are third party components ever going to be that usable?</h2>

There have been a lot of articles and talks that have compared the future Web Components ecosystem to the current jQuery plugins ecosystem. jQuery plugins thrived because they were plug and play, unfortunately there were a thousand+ plug and play implementations of jQuery.tabs and this is more or less the major complaint it receives.

One of the hopes for Web Components is that the cream rises to the top and that we can promote the "best" components. This is clearly not a simple task and expecting it to happen purely by drawing a line in the sand over the jQuery era will not be enough. A quick look at the react or angular ecosystems shows they still have their fair share of implementations.

These plugins had one big benefit though: jQuery was their one and only dependency. They also had no transitive dependencies where A > B > C, because, well, B was jQuery which did everything itself. Transitive dependencies is where things get tricky as they need to be resolved across components. These dependencies could be anything from Angular to RxJS or lodash to polyfills. It's likely we will also see our fair share of "zero-dependency components" attempting to sidestep the problem by inlining their own modular builds of utility libraries and adding extra weight you can't possibly extract or de-duplicate.

Of course, the closed concept of Web Components mean you absolutely could have different libraries inside and outside and it would still work, but just because you can doesn't necessarily mean you should: we should always want to avoid needlessly transferring bytes across the wire.

Finding the right 3rd party component whose dependencies matches yours is going to be extremely hard and because of that the ecosystem is going to be forced to fragment in order to support it. Right now it definitely feels like Web Components have more strength as an architecture strategy for reuse within a single project than as a catalogue of plug and play third party components.


<h2 id="tipping-point" class="blog-subtitle">What is going to be the tipping point for their adoption?</h2>

The collective specs for Web Components are large and unsurprisingly in spec world they have taken a long time to reach agreement across all the vendors. Meanwhile, innovation in the component world elsewhere has been staggering and has pushed the boundaries of what is both possible and expected from a component ecosystem: to the point that, for many, a v1 release of Web Components will receive a collective shrug rather than open arms. For these people, their tools have already evolved to meet the needs that Web Components are offering.

That's not to say that Web Components can't still take part of that market. Native features provide performance and consistency benefits and frameworks are anticipating that the technologies can co-exist. There is also a huge portion of the developer market who aren't invested in these new component frameworks and who can see real benefits in adopting something simple and straightforward. When are those people going to get involved? When are we going to see some real life examples?

Polyfills are available and the area is ready for experimentation and innovation. The problem is that few people are.

In order for the specs to succeed they are going to need feedback and the sooner that can be received the better. Is v1 going to be the tipping point? Will it provide enough for developers to start thinking of Web Components as a feasible solution rather than something coming down the line?

This isn't meant to be over dramatic, hopefully it's more of a 'when' rather than 'if' question. The harsh reality though is if in a year the only examples we still have are Github's `<time>` element and Google event pages it will be even harder for Web Components to gain adoption, or even relevance, as the innovation around components elsewhere shows no sign of slowing down.



<h2 class="blog-subtitle">Conclusion</h2>

You could argue this article is a little unfair to Web Components as it sounds like I expect them to be the answer to all these problems. I don't. Many of them are entirely outside their scope.

I found myself drifting into the world of CSS and dependencies quite often as they seemed the most pressing to me. There are also many more questions I have that I didn't write about and I'm sure more questions that those reading this will have. It's important these are exposed.

The requirement for Web Components to be independent and portable is ultimately what brings these discussions to the forefront. Their benefits are real: true scoping for CSS, the ability to share code in a framework agnostic manner, their composability, are all features that developers have needed for a long time.

Clearly the Web Components spec does not exist within a vacuum. It does present us with a focal point though, an opportunity for reflection on how the rest of the web ecosystem is ready to support it, and a list of outstanding problems which require resolutions to allow us to build standards-compilant, truly composable systems.
