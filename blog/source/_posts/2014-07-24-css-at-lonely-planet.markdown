---
layout: post
title: "CSS at Lonely Planet"
date: 2014-07-24 10:30
comments: true
categories:
---

Inspired by <a href="https://twitter.com/mdo">Mark Otto</a>&apos;s post <a href="http://markdotto.com/2014/07/23/githubs-css/">Github's CSS</a> I thought I would quickly jot down how Lonely Planet's CSS is structured. I thought it was interesting to read some of the parallels and it's good to share how we work.

<h2 id="quick-facts" class="blog-subtitle">Quick Facts</h2>

<ul>
  <li>We write in Sass (Indented syntax).</li>
  <li>We have more than 150 source files.</li>
  <li>The compiled CSS is split into two stylesheets to allow for stronger caching across apps.</li>
  <li>The average weight of CSS per page is around 35kb (gzipped).</li>
  <li>Rems and pixels are the unit of choice, with scattered ems.</li>
</ul>

<h2 id="preprocessor" class="blog-subtitle">Preprocessor</h2>

When I joined Lonely Planet we were already using the indented Sass syntax and have stuck with it since. Having used it for so long, writing SCSS seems like a chore.

Whilst we use Rails, we compile our Sass without Sprockets and just use Sass's @import functionality to build up stylesheets.

Our use of Sass's features is pretty low, mostly limited to variables and a few mixins. We originally started out with an architecture favouring extending placeholders over classes in the dom though this gradually caused our codebase to become too complex and we reverted our course to a more OOCSS approach.

We use <a href="https://github.com/ai/autoprefixer">autoprefixer</a> to handle vendor prefixes and I encourage everyone to do the same. We don&apos;t use Compass or any other plugins.

<h2 id="architecture" class="blog-subtitle">Architecture</h2>

<ul>
  <li>We use a version of <a href="http://bem.info/method/">BEM</a> to distinguish between components and prevent style collisions.</li>
  <li>We take a rough approach towards OOCSS. We started out with good intentions there but haven't stuck to it religiously.</li>
  <li>We don't use IDs in CSS. We very rarely style anything but classes.</li>
  <li>We use <a href="https://github.com/necolas/normalize.css/">normalize.css</a>.</li>
  <li>We avoid styling elements and scope all our typographic styles to classes. Typographic elements don't get margins by default as it leads to too much overriding (in our design).</li>
</ul>

<h2 id="frameworks" class="blog-subtitle">Frameworks</h2>

We don&apos;t use any CSS frameworks. If we were to begin again I would be tempted to use something like <a href="https://github.com/csswizardry/inuit.css/">Inuit.css</a> although ultimately I like the fact that we have no dependencies and are in complete control of our CSS.

<h2 id="linting" class="blog-subtitle">Linting</h2>

We don&apos;t lint our CSS. It's something that we should look into.

<h2 id="bundles" class="blog-subtitle">Bundles</h2>

Our CSS is distributed in two files:

<ul>
  <li>core.css</li>
  <li>application.css</li>
</ul>

Core is cached across the entirety of <a href="http://www.lonelyplanet.com">lonelyplanet.com</a> whereas application.css is cached only within the specific application. Lonely Planet is served by more than 10 distinct applications so having this separation is crucial for us to render faster pages.

Core includes the base styles like fonts, grids and header/footer styles, and also includes some of our most commonly included component styles which we choose to cache across all the apps. These components and styles live in <a href="https://github.com/lonelyplanet/rizzo">Rizzo</a> which is accessible by all apps.

Application.css will include styles distinct to the specific application, as well as some Rizzo components which aren&apos;t used often enough to be included in core.css.

<h2 id="performance" class="blog-subtitle">Performance</h2>

The above bundling is key to our CSS performance as is keeping the files small themselves. We have a <a href="http://rizzo.lonelyplanet.com/performance/css-analysis">performance monitoring section</a> in Rizzo which trends file size changes. Currently it only trends for seven days as this is a new addition to Rizzo and we are still collecting data.

<img src="/images/css-analysis.png" alt="CSS Performance Trending" />

We collect this data every few hours using a few <a href="https://github.com/lonelyplanet/perf/tree/master/css-analysis">simple scripts</a> which also allows us to run analysis on the stylesheets. We do this with <a href="https://github.com/t32k/stylestats">Stylestats</a> and again <a href="http://rizzo.lonelyplanet.com/performance/css-analysis/waldorf">render the breakdown</a> in Rizzo.

<img src="/images/css-analysis-2.png" alt="CSS Analysis" />

<h2 id="documentation" class="blog-subtitle">Documentation</h2>

I&apos;ve written previously about our <a href="http://ianfeather.co.uk/a-maintainable-style-guide/">Maintainable Style Guide</a>, <a href="http://rizzo.lonelyplanet.com/styleguide/ui-components/cards">Rizzo</a> and it works very successfully.

We also self document our Sass by wrapping it in <code>\[doc\]..\[/doc\]</code> tags, and then statically analysing it. For example, this <a href="https://github.com/lonelyplanet/rizzo/blob/master/app/assets/stylesheets/core/utilities/_utility_classes.sass">utility_classes.sass</a> file creates this <a href="http://rizzo.lonelyplanet.com/styleguide/css-utilities/utility-classes">documentation in Rizzo</a>.

<img src="/images/css-documentation.png" alt="CSS Documentation" />

<h2 id="refactoring" class="blog-subtitle">Refactoring</h2>

Similarly to github, we like to get rid of as much code as we can and we're not precious about keeping things around in case it might be needed. Refactoring is a part of our daily work though and we very rarely have specific refactoring tasks.

<h2 id="other-css" class="blog-subtitle">Other CSS Files</h2>

<a href="http://ianfeather.co.uk/ten-reasons-we-switched-from-an-icon-font-to-svg/">Our SVG icons</a> and fonts are both loaded within CSS files, but these are deferred and not grouped with the rest of the styles.
