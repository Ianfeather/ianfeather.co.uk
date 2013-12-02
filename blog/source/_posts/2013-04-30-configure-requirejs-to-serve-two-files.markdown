---
layout: post
title: "Configure requirejs to serve two files"
written: "on the Victoria line"
date: 2013-04-30 09:35
comments: true
categories: 
---


## The reason

Why would you want to serve two javascript files rather than concatenating them? If you want to leverage better caching of assets which are rarely updated.

At [Lonely Planet](http://www.lonelyplanet.com/england/london/hotels) our files are broken up into:

- core.js - Common libs and abstractions(eg. jquery), header and footer code, analytics</li>
- application.js - The code responsible for everything between the header and footer</li>


Core.js is likely to never change so we want any repeat users to enjoy the benefit of strong browser caching. We serve this script appended with an MD5 hash so that we can invalidate the cache when it does finally get updated.


## The background

We use the requirejs-rails port which includes the r.js optimiser. It does an awesome job of consolidating all your modules into one file which you load asynchronously using the requirejs script tag and a data-main attribute. The main focus seems to be web apps rather than traditional web sites and as a consequence there were very few resources available around the topic of serving more than one file.

We wanted to use core.js to initialise the rest of the application once it had satisfied its own dependencies. The reason behind this was that core.js would then load jQuery before it was subsequently requested by application.js.

After much playing around with the requirejs config it was clear this was the wrong approach. We were getting multiple files requested dynamically and it was becoming a headache. I knew there would be a simple solution and really it was just a matter of looking at it from the application side: core.js was really a dependency of application.js

## The half-solution

### require.js config:
<pre><code class="language-bash">modules:
  - name: 'application'
    exclude: ['core']
</code></pre>

### application.js.coffee:
<pre><code class="language-coffeescript">require ['core', 'lib/application'], (Core, Application) ->
  Application = new Application()
</code></pre>

Why this didn't work? Application.js had dependencies which themselves depended on jQuery. Require loaded core and lib/application at the same time leading to three scripts being loaded by requirejs:
- core.js
- application.js
- jquery.js

Not bad, but we have an extra request to load jQuery when really we wanted it to be included in core.js

## The actual solution

### require.js config:
<pre><code class="language-bash">modules:
  - name: 'appplication'
    exclude: ['core']

findNestedDependencies: true
</code></pre>

### application.js.coffee:
<pre>
<code class="language-coffeescript">require ['core'], () ->
  require ['jquery', 'lib/application'], ($, Application)->
    $ ->
      application = new Application()
</code>
</pre>

### Output:
- core.js
- application.js

Running r.js will optimise core.js separately from application.js. Once it executes, the process will happen like this:


- Try to find core.js
- We don&apos;t have it bundled so load the optimised core.js dynamically
- Once core.js is loaded we move into the require function
- Try to find jQuery. Requirejs knows it is already loaded.
- Try to find lib/application.js. This is bundled into application.js from the r.js optimisation step.
- Move into the nested require function
- Initialise application()


That&apos;s all there is to it. We can now specify any rarely used modules as a dependency of core.js, leverage the browser cache, and make faster websites.