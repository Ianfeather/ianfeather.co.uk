---
layout: post
title: "Implementing your own Rizzo?"
date: 2015-01-12 23:30
comments: true
categories:
---

I&apos;ve heard recently that a few different companies are looking to implement a version of Rizzo to build on the work we have done at Lonely Planet. It&apos;s extremely flattering to hear about our ideas helping other organisations. It also makes me a little nervous because if someone were to copy Rizzo as it exists now they would inherit some of the decisions which ultimately we would change in hindsight.

I should mention that the fundamental principles behind Rizzo as a component library and Maintainable Style Guide still stand true and those haven&apos;t changed since its inception. That said, there are definitely certain decisions which I would love to have the opportunity to revisit and which I would advise anyone starting down this path to consider.


<h2 class="blog-subtitle">1. Fix up your filesystem structure</h2>

Grouping files together by component makes it considerably easier for developers to find files and makes it clear where the component starts and ends.

<div class="inner-content-grid">
  <div class="col--half">

<pre class="language-bash"><code>// The old way

app/
  data/
    header.yml
  javascript/
    header.js
  stylesheets/
    header.css
  views/
    header.html
</code></pre>


  </div>
  <div class="col--half">

<pre class="language-bash"><code>// A better way

app/
  components/
    header/
      header.css
      header.html
      header.js
      header.yml


</code></pre>

  </div>
</div>

It doesn&apos;t make any sense to continue organising files by their file type. We inherited Rails&apos; directory structure and we currently still work on the prior example but we want to work towards the latter.

In the example above, `header.yml` would be some stubbed data used to render the component in the styleguide.

Using this form of filesystem convention also greatly simplifies point 2.

<h2 class="blog-subtitle">2. Let the component manage its own assets</h2>

As soon as you get on board with the idea of components you realise it makes no sense for a &lsquo;page&rsquo; to define the dependencies of the components it will render. A page should have no knowledge, nor care, which components are used to construct itself. Even so, this is still typically how we manage assets: using an application level manifest file which imports the dependencies for each component. Think of any classic `application.sass` which imports all the partials for that page for example.

The main area in which the old technique falls down is when you begin lazyloading in components. Keeping stock of which components will be loaded into the page template creates a very brittle system and it makes much more sense to let the component fetch its own dependencies, teardown and initialise itself.

Of course you still need to consider how to bundle dependencies by page, or &lsquo;entry point&rsquo; but fortunately there are a collection of tools which are designed to help you with this process - webpack, assetgraph, jspm, browserify to name a few.

<h2 class="blog-subtitle">3. Use a language agnostic templating syntax</h2>

A misconception of Rizzo is that it is limited to the stack we wrote it on (Ruby). This is somewhat true as the components are primarily written in Haml, which is tightly coupled to Ruby. We do also expose certain components via http endpoints and send them over the wire, making them accessible from any language.

What is definitely true, however, is that had we chosen Mustache or another language-agnostic templating language we would have created a more flexible system to work with and reduced the number of hoops we inevitably have to jump through when using Rizzo on different stacks. This also has the advantage of making them available to the client without the need for writing any adaptors.


<h2 class="blog-subtitle">4. Consider how changes are deployed across applications</h2>

We deploy Rizzo as a gem within each of our applications. This means that when we make an update to a component in Rizzo, we need update the Rizzo dependency in each app. This technique is a safe way of managing our components but as we&apos;ve scaled up the number of applications that use Rizzo it is becoming more tedious a process.

Rizzo also acts as a service and serves some components (header, footer) over http to our legacy apps. In this method, the changes are updated automatically when we change them in Rizzo which removes any process at all but does introduce a risk that we could break these applications (which of course we have, on occasion). This doesn&apos;t fit in to our model of continuous delivery at Lonely Planet and is not something we would rush to do on a broader scale, however GOV.uk have recent written about their implementation which does follow this pattern. It&apos;s an exciting project (and also flattering that such a project has taken something from our work) and I look forward to seeing how that evolves. Presumably they have some integration tests in place to de-risk the process.

I hope we at some point look into the process of updating Rizzo automatically across our apps at Lonely Planet. I would prefer us to keep the same system of being declarative about specific dependencies and ensuring that we run the full suite of tests for each application.

My ideal process would be to have a post-deploy hook on Rizzo that triggers builds of all applications that use it and, if successful, deploys them. This would create a lot of noise in our CI environment though, and would need to be thought through a lot more before we actively pursued it. Likely this solution will wait until the current process gets too painful to support.


<h2 class="blog-subtitle">Are you using a component API like Rizzo?</h2>

If so I would love to hear about it and am also interested in any other challenges similar to the above which you might have come across.

As with all such solutions, the above is what I would change for Lonely Planet and how I would build out a new system where I re-implementing it elsewhere. It&apos;s mileage may vary and what works here may not work for your particular setup.
