---
layout: post
title: "A Maintainable Style Guide"
date: 2014-05-07 09:52
comments: true
categories:
---

Maintaining a UI Style Guide over a long period of time is very difficult. Even with best intentions the maintenance of any project can be hard when matched against the expectation of creating new features. Style Guides, most often prioritised below the maintenance of your applications themselves, are likely the first candidates to fall behind and the last to be brought out of tech debt.

This is bad because once your Style Guide falls out of sync with your application(s) it has entirely lost its purpose. It is no longer a trustworthy representation of the state of your UI and will quickly fall out of favour with the design and development team.

This is bad because Style Guides are more than a nicety for developers to show off their style. Done properly, they can be a collaboration tool bridging design and development teams as well as a tool to break down the user interface into its component parts rather than than thinking about it as a whole or as a series of pages. They also serve as a resource for new designers and developers to locate existing patterns and ready-made code blocks for further use, but this only serves a purpose if they reflect the current state of your UI.

All of these benefits should be sought regardless of the size or scope of your project though they shouldn't come at a cost to delivering features. If they do, they will inevitably be neglected. Prioritising work on a Style Guide, rather than user-facing features, is more of a cultural and organisational challenge but I'd like to share how we achieved this at Lonely Planet by making it an integral part of our development methodology.

Before that, it's worth explaining how we tried and why we failed with the traditional types of Style Guide.

<h2 id="the-problem-with-current-style-guides" class="blog-subtitle">The problem with current Style Guides</h2>

At Lonely Planet, we have tried and failed with two different approaches.

### A Static HTML Style Guide

Style Guides built with static HTML are standalone representations of your UI components with no direct link to your codebase. Once you change or refactor your HTML or CSS you will need to go and update the Style Guide.

The main difficulty with keeping this up to date with your application is duplication of templates. It's likely that any long running project is dynamic with integrated templates. Coupling this with a static Style Guide requires diligence on the part of all developers to manually keep it up to date.

I built a static html Style Guide a couple of years ago to try to decipher the UI we had inherited but ultimately it didn't make our work any easier and quickly fell behind and out of importance.

It's worth mentioning that as a design tool, or as a deliverable to a client who is going to carry on the development, static Style Guides are a fantastic starting point.


### A Living Style Guide

Living Style Guides should be the answer to these problems. They autogenerate Style Guides when changes are made to the codebase so in theory they shouldn't be able to fall behind. There are a whole host to choose from and many can be set up with fairly minimal effort.

Back in 2012 we implemented KSS: a fairly popular tool for generating living Style Guides developed by Kyle Neath and used at Github. Unfortunately, it lasted 2-3 months before it was clear it had diverged from the components within our application. We were left with KSS documentation code scattered throughout our CSS, a bunch of (now) pointless ERB templates and a mostly useless Style Guide already gathering dust.

So, given it's &ldquo;living&rdquo;, why did it fall behind?

The majority of living Style Guide generators work by analysing the CSS, parsing comments within them to create the documentation and to know which components to render. It makes sense that they would take this approach because CSS is easily analysed and consistent across projects. For a generic library to work across multiple applications it requires a constant to work from but it's this key design decision which ultimately makes them hard to maintain.

There are a couple of significant ways in which we believe living Style Guides are unmaintainable:

### 1. Duplication of templates

The majority of living Style Guide approaches follow a pattern something like this:

<pre class="language-css"><code>  /* Styleguide [Buttons]
    &lt;button class="btn-primary"&gt;Button&lt;/button&gt;
    &lt;button class="btn-secondary"&gt;Button&lt;/button&gt;
  */

  .btn-primary {
    color: blue;
  }

  .btn-secondary {
    color: red;
  }
</code></pre>

Here we have a couple of buttons referenced in the css and when we run a script across it it will output the elements to the Style Guide alongside the markup.

The problem here is, that template isn't the template we use in our applications! At best it is a direct copy, more likely it is a slimmed down copy - would you include accessibility helpers or microformat attributes here?

As soon as you introduce template duplication like this you have twice as much to maintain and the probability of one of them falling out of date tends towards 1 as time goes on.

Now this is easy to overlook when you're talking about single element components like buttons where the effort is fairly minimal to maintain, but in reality a lot of components are more complex: requiring multiple elements, classes and often Javascript?

### 2. Static HTML Output

There is also the problem of the output. Typically you would get some output like this, featuring the component alongside the markup required to render it.

<figure>
  <img src="/images/styleguide-output.png" alt="Markup commented within the css" />
  <figcaption>(taken from the very nice <a href="https://ux.mailchimp.com/patterns/">Mailchimp Style Guide</a>)</figcaption>
</figure>

The idea here is that a developer can simply copy and paste this markup into their application and very quickly and easily build up their page.

Now, even if we presume that the rendered markup is absolutely up to date, once they copy that code and use it an application it is your responsibility to maintain that as well. When they copied the markup for a working component it had an implicit link to a snapshot of the css at that point. If you then update the template or refactor the css, you need to update all versions of the template scattered around your site.

This posed a huge problem for us because as an author of a component I had no idea of where it was being used. I may not even have heard of the application that it was being used in. That leaves the next developer in a difficult position: risk releasing a breaking change or avoid changing the component at all.

This is a huge cause for Technical Debt build up at Lonely Planet. As the entire infrastructure is too large to completely hold inside your head, authors were being forced to build defensively. As there was no mechanism for encouraging risk-free reuse of components, they simply weren't being used and instead we end up with duplicated components and bloated code.

But I don't believe this is an issue scoped only to Lonely Planet or even limited to just large websites. If we can promote risk-free refactoring on small sites, why wouldn't we? Would you rather change one template or search through your code base changing them all?


<h2 id="how-should-style-guides-work" class="blog-subtitle">How should Style Guides work?</h2>

Style Guides should focus on templates rather than CSS. Crucially, if you're rendering templates to a Style Guide and you want it to be maintainable then they can't just be identical to your application templates, they need to be the exact same templates.

Why don't they work like this now? Well it's very difficult. Templates within an application can be in many different technologies, embedded deep into an application and hard to get to. This makes it very hard for a single Open Source tool to parse your templates as it would have to work across a multitude of technologies and disparate application architectures. It would also require your application to be built at a component level so that it would know exactly what to render.

This doesn't mean it's impossible though, in fact the process of restructuring your application into a component based architecture can be the mechanism to simplify and normalise your user interface. This is the process we have taken at Lonely Planet, creating a component layer which both our applications and Style Guide can work from.


<h2 id="building-a-component-api" class="blog-subtitle">Building a Component API</h2>

<div class="video-embed">
  <iframe width="560" height="315" src="//www.youtube.com/embed/XNoX1FRZ8kE" frameborder="0"> </iframe>
</div>
[Slides from "Reducing Complexity with a Component API"](http://www.slideshare.net/ianfeather/reducing-comlexity-with-a-component-api)

I talk quite a lot about this process in my Front End Ops talk on the subject so I won't go into too much detail, but this process of decoupling the UI pieces from the application and componentising them had a lot of positive effects on the way that we created the User Interface.

The goals and benefits of a Style Guide were exactly what we wanted but, not knowing how to achieve that, we started by extracting as much of our UI into components and moving them outside of the applications. Once we had extracted them from the applications and into the component layer we created a very simple api in which to fetch them. Having the api for us was crucial because we wanted to maintain the mapping between the latest version of the the component and the application, and not have developers copy and paste component code.

Having a single version of the component, accessible via an api, worked perfectly with unit testing too so we could ensure that the contract between the API parameters and the returned template was solid. We could modify and extend the component based on the data we passed it and assert on the returned result. This also allowed us to add accessibility helpers and microformat attributes as standard and ensure that they weren't forgotten when used in new applications.

### A typical API call:

<pre class="language-markup"><code>
  // Input
  = ui_component("forms/search", {label: "Search"})

  // Output
  &lt;form action="//www.lonelyplanet.com/search" class="search--primary"&gt;
    &lt;label class="accessibility" for="search-q"&gt;Search&lt;/label&gt;
    &lt;input class="search__input" id="search-q" name="q" tabindex="1" type="search" value="" /&gt;
    &lt;button class="search__button" id="search-q-submit" name="search-q-submit" type="submit"&gt;Search&lt;/button&gt;
  &lt;/form&gt;
</code>
</pre>

The developer can modify and extend the component by manipulating the input data. For example, if we wanted to add autocomplete functionality to this search form usually we would add a couple of classes and maybe initialise a JS component somewhere. Within the scope of the Component API we can simply pass in a new boolean and it will add what is necessary:

<pre class="language-markup"><code>
  // Input
  = ui_component("forms/search", {
    label: "Search",
    <b class="highlight">autocomplete: true</b>
  })

  // Output
  &lt;form action="//www.lonelyplanet.com/search" class="search--primary <b class="highlight">js-autocomplete</b>"&gt;
    &lt;label class="accessibility" for="search-q"&gt;Search&lt;/label&gt;
    &lt;input class="<b class="highlight">js-autocomplete-input</b> search__input" id="search-q" name="q" tabindex="1" type="search" value="" /&gt;
    &lt;button class="search__button" id="search-q-submit" name="search-q-submit" type="submit"&gt;Search&lt;/button&gt;
    <b class="highlight">&lt;div class="js-autocomplete-container"&gt;&lt;/div&gt;</b>
  &lt;/form&gt;
</code>
</pre>

<h2 id="style-guide-driven-development" class="blog-subtitle">Style Guide Driven Development</h2>

Once the applications are all using the API to fetch components, all that we really have inside the app is data representations of the components. It's therefore pretty simple to scaffold a quick app that requests every component, multiple times, with differing data. This is our Style Guide. It's essentially a YAML file and a lot of requests to the Component API.

It's always up to date with the rest of lonelyplanet.com because it uses the exact same templates and the same css. As we're not just doing static analysis of the CSS we are also able to showcase components that require JS too. It becomes a risk free environment where developers can build and tweak components and then allow them to propagate out to the rest of the applications.

In fact, it has become the arena for development. Once you have this concept of a component layer it is irrelevant to you where you render it for testing. What we have seen is a move towards Style Guide Driven Development where developers are using it as the primary area of work. This is not something we expected but is certainly a validation of the approach and a polar opposite to our previous attempts where the Style Guide was seen as something that was a blocker to developing features quickly.

An example component in our Style Guide would showcase the component and the API call/data.

<img src="/images/rizzo-output.png" alt="An example of our Style Guide output" />


<h2 id="how-it-all-works" class="blog-subtitle">How it all works</h2>

One thing I really didn't cover in my talk was the implementation side of Rizzo and I've had a lot of questions around it since.

We have two different types of apps that integrate with Rizzo at LP: Rails Apps (new) and Other Apps (legacy).

### Rails Apps

Rizzo is a Ruby Gem which acts as an engine and exposes its partials and assets to the host app. The implementation here is extremely simple and is really just sugar coating around a partial call. The only part that makes this different to just calling a partial is that it lives outside of, and is shareable across, all applications. These helpers act as the API for the styleguide and the applications

<pre class="language-ruby"><code>
  def ui_component(type, properties)
    render "components/#{type}", properties
  end

  def styleguide_component(type, properties)
    ui_component "components/#{type}", properties
    render "styleguide/description", type, properties
  end
</code></pre>

There is a little bit more to it but that covers most of how it works. Very, very simple. It's much more a methodology change than it is a technical challenge.

### Other Apps

Other apps don't have the luxury of including Rizzo as a Gem (though we may look into using it with other package managers). For now, we host Rizzo as a service and expose http endpoints to return the templates. For example, hitting [http://rizzo.lonelyplanet.com/global-body-header](http://rizzo.lonelyplanet.com/global-body-header) will return the html for part of our header.

We are currently working on exposing all components as a service under <pre>http://rizzo.lonelyplanet.com/components/*</pre> and these routes will likely take Query Params in order to extend the returned component.

### The Styleguide

The styleguide view simply loads up some data for a particular type of component and then iterate through the collection, rendering the component and the arguments each time. Note it's calling styleguide_component which ultimately calls ui_component the same as any other app would.

<pre class="language-ruby"><code>
-# Load the data
- cards = YAML.load(File.read(File.expand_path('data/styleguide/cards_stubs.yml', __FILE__)))

&lt;h1&gt;Cards&lt;/h1&gt;

-# Iterate through the data collection and render the components
- cards.each do |card|
  = styleguide_component("cards/#{card[:title]}", properties: card)

</code></pre>

With this approach we only have to modify the underlying data to add more components or modify existing ones.

### Assets

A common question has been how do we handle CSS and JS related to these components. Unfortunately I don't have a clever answer for this at the moment, it's a mostly manual process.

We split both our CSS and JS out into common and application files. Inside the common.css|js we load the base code as well as our most often used components (stored in /components/core). This is then cached across the entire suite of applications.

To use any non-core components within an application, you need to import the component's related CSS partial using Sass as well as possibly needing to add the component JS module to the application.js dependencies.

I think there is definitely room to improve this process using tools like [Component](https://github.com/component/component) or [AssetGraph](https://github.com/assetgraph/assetgraph). This is definitely something we'll be looking into soon. For the moment, it is reasonably trivial to handle manually.


<h2 id="rizzo" class="blog-subtitle">Rizzo</h2>

The Style Guide is available at [rizzo.lonelyplanet.com](http://rizzo.lonelyplanet.com) and the source code is now public at [github.com/lonelyplanet/rizzo](github.com/lonelyplanet/rizzo). The implementation is very bespoke to Lonely Planet but should give some indication of how it works if you are interested. Here are a few example pieces that make up Rizzo:

[A component template](https://github.com/lonelyplanet/rizzo/blob/master/app/views/components/cards/_blog_card.html.haml)

[A component Stylesheet](https://github.com/lonelyplanet/rizzo/blob/master/app/assets/stylesheets/core/core_components/cards/_card_appearance.sass)

[Component Helper](https://github.com/lonelyplanet/rizzo/blob/master/app/helpers/styleguide_helper.rb#L329)

[Style Guide Data](https://github.com/lonelyplanet/rizzo/tree/master/app/data/styleguide)

[Style Guide View](https://github.com/lonelyplanet/rizzo/blob/master/app/views/styleguide/ui-components/cards.html.haml)


<h2 id="conclusion" class="blog-subtitle">Conclusion</h2>

The difference between Rizzo and our previous two Style Guides is that this time we didn't focus on the Style Guide as the deliverable, we focused on reducing complexity and increasing reusability. The Style Guide was then simple to add on at the end but, had it not been, we would still have been in a better place regardless.

To achieve this you're never going to be able to just run a grunt task. Unfortunately it's not something you can add on at the end, although nor should it be. It requires you to contemplate your site architecture and structure as the main focus and the benefits of that extend beyond a Style Guide.

At Lonely Planet we have a long way to go to create a solid, consistent platform, but this has certainly been proven as a step in the right direction. If you are starting a new project, or you have the means to invest some time in maintainability, I would thoroughly recommend a component based architecture.

