---
layout: post
title: "Destructuring, rest properties and object shorthand"
subtitle: "How you can use these features to write more maintainable code"
date: 2016-01-11 12:30
comments: true
categories: blog
---

Destructuring and rest/spread parameters for Arrays is part of the es6 specification. Support for their use with Objects is, at the time of writing, a [stage 2 proposal for future inclusion](https://github.com/sebmarkbage/ecmascript-rest-spread). Of course, you can use it today via a transpiler like Babel.

Object Shorthand is already part of the es6 specification and with a combination of these three features you can start to use some patterns which can lead to more reliable, less error prone code.

First, let's dig in to how destructuring objects looks. We'll take a simple config object and use destructuring to extract some values.

<pre class="language-javascript"><code>let config = {
    env: 'production',
    user: { name: 'ian' }
};

let { env } = config;

console.log(env); // 'production'

console.log(config); // { env: 'production', user: { name: 'ian' } }
</code></pre>

The equivalent in es5 would be:

<pre class="language-javascript"><code>var config = {
    env: 'production',
    user: { name: 'ian' }
};

var env = config.env;
</code></pre>


Note that the original config object never mutates. The benefits of immutability are well documented and, whilst this isn't strictly immutable, starting to write in a way which maintains the original values allows you to reason about the code more easily.

We can also go one step further and destructure two levels deep:

<pre class="language-javascript"><code>let { env, user: { name } } = config;

console.log(name); // 'ian'

console.log(user); // err: user is not defined
</code></pre>

Now let's introduce rest properties:

<pre class="language-javascript"><code>let { env, ...newConfig } = config;

console.log(env); // 'production'

console.log(newConfig); // { user: { name: 'ian' } }

console.log(config); // { env: 'production', user: { name: 'ian' } }
</code></pre>

Using those three dots creates a new object which represents everything that remains in the config after you have taken out the named variables.

Note that this will still create an empty object so you can rely on object methods working without knowing what the data might be:

<pre class="language-javascript"><code>let { env, user: { name }, ...newConfig } = config;

console.log(newConfig); // {}
</code></pre>


These are solid primitives which can be built up into useful patterns. One way in which they can help immediately is by removing connascence. Connascence relates to the relationship between two components where a change in one would require a change in the other to maintain functionality. A way in which this has often transpired in my code is with argument ordering in functions, particularly functions with high arity.

Let's take a typical analytics function:

<pre class="language-javascript"><code>function trackAnalytics(label, category, dimension, username, email) {
    window.track(label, category, dimension, username, email);
}

trackAnalytics('login', 'user', 'app1', 'ian', 'test@test.com');
</code></pre>

Assuming that these functions are in different files, aside from the email address it's pretty hard to tell from the call side what each parameter relates to. It also breaks if we get the order wrong.

<pre class="language-javascript"><code>trackAnalytics('user', 'login', 'app1', 'ian', 'test@test.com'); // Tracking is broken</code></pre>

A way in which this is typically resolved is by switching to passing a single object as a parameter and naming the values within it. Now you no longer need to care about understanding their role or the order in which they're included.

<pre class="language-javascript"><code>trackAnalytics({
    label: 'login',
    category: 'user',
    dimension: 'app1',
    username: 'ian',
    email: 'test@test.com'
});
</code></pre>

Which means you can satisfy your OCD by ordering them alphabetically or in pyramid style.

<pre class="language-javascript"><code>trackAnalytics({
    label: 'login',
    username: 'ian',
    category: 'user',
    dimension: 'app1',
    email: 'test@test.com'
});
</code></pre>

That's better. So passing this object removes the connascence and improves the call side but it has suddenly got worse on the function side:

<pre class="language-javascript"><code>function trackAnalytics(data) {
    window.track(data.label, data.category, data.dimension, data.username, data.email);
}
</code></pre>

We no longer know what's inside `data` and in a function that was more complex we'd probably have to resort to documenting the function arguments in a jsdoc fashion. This can be pretty useful anyway but we can remove the need for it to some extent by using destructuring (note the braces within the arguments list).


<pre class="language-javascript"><code>function trackAnalytics({ label, category, dimension, username, email }) {
    window.track(label, category, dimension, username, email);
}

trackAnalytics({
    label: 'login',
    category: 'user',
    dimension: 'app1',
    username: 'ian',
    email: 'test@test.com'
});
</code></pre>

Now the order of the arguments no longer matters and we understand what the values represent on both sides of the function contract.

Often we may already have these values wrapped up in variables before we send them to the function. If that is the case we can take advantage of another feature: object shorthand. Object shorthand allows you to replace the key value pair by a single key. For example:

<pre class="language-javascript"><code>// Assume these would already exist
let label = 'login';
let category = 'user';
let dimension = 'app1';
let username = 'ian';
let email = 'test@test.com';

trackAnalytics({
    label,
    category,
    dimension,
    username,
    email
});
</code></pre>

Which means we can go back to a more simple looking call, without any concern about order.

<pre class="language-javascript"><code>function trackAnalytics({ label, category, dimension, username, email }) {
    window.track(label, category, dimension, username, email);
}

trackAnalytics({ category, label, dimension, username, email }); // ✔
trackAnalytics({ category, username, email, label, dimension }); // ✔</code></pre>

At this point we've already made the code much more robust and resistant to errors whilst keeping the code very simple and readable.

Another trick we have with these three features is to destructure within arguments themselves. In our example, we have the username and email in our original config object so let's take them from there.

<pre class="language-javascript"><code>let config = {
    env: 'production',
    user: { name: 'ian' }
};

function trackAnalytics(label, category, dimension, { env, user }) {
    if (env !== 'production') { return };

    window.track(label, category, dimension, user.name, user.email);
}

trackAnalytics('login', 'user', 'app1', config);
</code></pre>

We can even take it one step further and remove the user object:

<pre class="language-javascript"><code>function trackAnalytics(label, category, dimension, { env, user: { name, email } }) {
    if (env !== 'production') { return };

    window.track(label, category, dimension, name, email);
}
</code></pre>

Maybe that's going a bit far... These are just tools for you to use however you see fit though.

Hopefully this serves as an example of how you can use these new features to write safer, simpler code. There's a lot of sytactic sugar in the new JS features but coupled together they achieve things which would be significantly harder, or at least more verbose, to write in ES5.
