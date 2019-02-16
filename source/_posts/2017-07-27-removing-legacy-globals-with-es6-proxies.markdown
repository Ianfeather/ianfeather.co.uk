---
layout: post
title: "Removing legacy globals with ES6 Proxies"
subtitle: "You actually can get rid of your legacy window objects"
date: 2017-07-27 21:30
comments: true
categories: blog
---

I found a nice pattern today for getting rid of those global configuration variables that you're pretty sure aren't used anymore but you're a bit too scared to delete. You know the ones, they look like this:

<pre class="language-javascript"><code>/* DO NOT CHANGE! WILL BREAK SOMETHING SOMEWHERE. TRUST ME. THX. */

window.GLOBAL_CONFIG = {
  env: 'dev',
  ...
}
</code></pre>

They're the cockroaches of large sites: they outlast developers, framework apocalyses, full rewrites. You know that something outside of your code base relies on them and it's near impossible to figure out what. It's easier to just leave it where it is and move on with your life.

Well, [ES6 proxies](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Proxy) actually make it a whole lot easier to find out which properties aren't being used! Proxies allow you to put logic between someone trying to access a property and them actually receiving it. Here's some actual code:

<pre class="language-javascript"><code>(function() {

  /* First we'll rename our `GLOBAL_CONFIG` object and make it private */
  var _config = {
    env: 'dev'
  };

  /* If we don't support proxies let's just give them what they want! */
  if (!('Proxy' in window)) {
    window.GLOBAL_CONFIG = _config;
    return;
  }

  /*
   * Alright, now we make a Proxy object.
   *
   * get is a function that will be called every time we access
   * a property.
   *
   * At this point, all we're going to do is return the original value.
   */
  var myProxy = {
    get: function(target, name) {
      return _config[name];
    }
  };

  /* Finally, let's assign it back so there's no difference for the consuming code. */
  window.GLOBAL_CONFIG = new Proxy({}, myProxy);

}());
</code></pre>

And we're done! We've written some code which does absolutely nothing!

<pre class="language-javascript"><code>var x = window.GLOBAL_CONFIG.env;
console.log(x);
// log: "dev"
</code></pre>

This is usually where I'd stop but in fact it gets a bit more fun when you add some logic to the `myProxy` object. For example we could log out which properties have been called:

<pre class="language-javascript"><code>var myProxy = {
  get: function(target, name) {
    console.log(`Someone tried to access GLOBAL_CONFIG.${name}!`);
    return _config[name];
  }
};
</code></pre>

<pre class="language-javascript"><code>var x = window.GLOBAL_CONFIG.env;
// log: Someone tried to access GLOBAL_CONFIG.env!

console.log(x);
// log: "dev"
</code></pre>

Reloading the page might give you <i>some</i> idea of who is accessing the object but, given that the calling code is probably outside of your own code base, it's only going to get you so far.

Instead, let's send that data somewhere! Your favourite analytics service will probably do the trick.

<pre class="language-javascript"><code>var myProxy = {
  get: function(target, name) {
    // Assume this method makes a http request somewhere
    track('global_config', name);

    return _config[name];
  }
};
</code></pre>

Now just deploy it for a bit and let your users tell you which properties are still being accessed! You might end up with some graphs like this:

<img src="/images/properties.jpg" alt="Charts showing that a property is never accessed" />

And now we can delete the `base_url` property, safe in the knowledge that no one is using it.
