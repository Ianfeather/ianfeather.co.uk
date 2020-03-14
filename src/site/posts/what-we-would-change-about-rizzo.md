---
title: "What we would change about Rizzo"
date: 2015-01-20
comments: true
categories: blog
---

I&apos;ve heard recently that a few [different](http://www.buzzfeed.com/erakor/i-am-all-about-that-sass#.kbW7EKW39) [companies](https://gdstechnology.blog.gov.uk/2014/12/11/govuk-living-style-guide/) have created a version of Rizzo to build on the work we have done at Lonely Planet. It&apos;s extremely flattering to hear about our ideas helping other organisations. It also makes me a little nervous because if someone were to copy Rizzo as it exists now they would inherit some of the decisions which ultimately we would change in hindsight (and plan on doing in the future). This article outlines some of those decisions and how we would approach them differently.

I should mention that the fundamental principles behind Rizzo as a component library and [Maintainable Style Guide](/a-maintainable-style-guide) still stand true and those haven&apos;t changed since its inception. That said, there are definitely certain decisions which I would love to have the opportunity to revisit and which I would advise anyone starting down this path to consider.


<h2 id="fix-up-your-filesystem-structure" class="blog-subtitle">1. Fix up your filesystem structure</h2>

Grouping files together by component makes it considerably easier for developers to find files and makes the boundaries of the component clearer.

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

We inherited Rails&apos; directory structure which organises assets by file type and this is also a long running convention used in many frameworks including the [html5 boilerplate](https://github.com/h5bp/html5-boilerplate/tree/master/src). Despite this, it doesn&apos;t make any sense to continue organising files by their file type and this is a best practice which should definitely be challenged.

In the example above, `header.yml` would include stubbed data used to render the component in the Style Guide.

Using this form of filesystem convention also greatly simplifies point 2.

<h2 id="let-the-component-manage-its-own-assets" class="blog-subtitle">2. Let the component manage its own assets</h2>

As soon as you get on board with the idea of components you realise it makes no sense for a &lsquo;page&rsquo; to define the dependencies of the components it will render. A page should have no knowledge, nor care, which components are used to construct itself. Even so, this is still typically how we manage assets: using an application level manifest file which imports the dependencies for each component. Think of any classic `application.sass` which imports all the partials for that page for example.

The main area in which the old technique falls down is when you begin lazy-loading in components. Keeping stock of which components will be loaded into the page template creates a very brittle system and it makes much more sense to let the component fetch its own dependencies, teardown and initialise itself.

Of course this isn't without its own challenges. You still need to architect a system whereby lazy-loaded components can be instantiated and you must also consider how to bundle dependencies by page, or &lsquo;entry point&rsquo;. Fortunately there are a collection of tools which are designed to help you with the latter process - [Webpack](https://github.com/webpack/webpack), [assetgraph](https://github.com/assetgraph/assetgraph), [jspm](http://jspm.io/), [browserify](http://browserify.org/) to name a few.

<h2 id="use-a-language-agnostic-templating-syntax" class="blog-subtitle">3. Use a language agnostic templating syntax</h2>

A misconception of Rizzo is that it is limited to the stack we wrote it on (Ruby). This is somewhat true as the components are primarily written in Haml, which is tightly coupled to Ruby. We do also expose certain components via http endpoints and send them over the wire, making them accessible from any stack.

What is definitely true, however, is that had we chosen Mustache or another language-agnostic templating language we would have created a more flexible system to work with and reduced the number of hoops we inevitably have to jump through when using Rizzo on different stacks. This also has the advantage of making them available to the client without the need for writing any adaptors.


<h2 id="deploy-updates-automatically-across-applications" class="blog-subtitle">4. Deploy updates automatically across applications</h2>

We deploy Rizzo as a gem within each of our applications. A consequence of this is that we need to explicitly bump the Rizzo dependency in each app after we make an update to a component (in practice this happens organically unless it's a significant change). This is a safe way of managing our components but as we&apos;ve scaled up the number of applications it is becoming more tedious.

Rizzo serves some components (header, footer) over http to our legacy apps. In this method, the changes are updated automatically as soon as we deploy Rizzo. This removes any update process entirely but does introduce a risk that we could break these applications (which of course we have, on occasion). This doesn&apos;t fit in to our model of continuous delivery at Lonely Planet and is not something we would rush to do on a broader scale, however GOV.UK have [recently written about their implementation](https://gdstechnology.blog.gov.uk/2014/12/11/govuk-living-style-guide/) which does follow this pattern. It&apos;s an exciting project (and awesome that such a project has taken something from our work) and I look forward to seeing how that evolves. Given the smart engineers over there I'm sure they have something in place to de-risk the process.

I hope we at some point look into updating Rizzo automatically across our apps at Lonely Planet. I would still prefer us to keep the same system of being declarative about specific dependencies and ensuring that we run the full suite of tests for each application. Either way, you have a set of trade-offs to balance.

My ideal process would be to have a post-deploy hook on Rizzo that triggers builds of all applications that use it and, if successful, deploys them. This would create a lot of noise in our CI environment though, and would need to be thought through a lot more before we actively pursued it. Likely this solution will wait until the current process gets too painful to support.


<h2 id="are-you-using-a-component-api-like-rizzo" class="blog-subtitle">Are you using a component API like Rizzo?</h2>

If so I'd be keen to hear about it! Have you made any changes similar to the above which others could learn from?
