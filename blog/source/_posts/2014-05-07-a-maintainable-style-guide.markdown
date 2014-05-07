---
layout: post
title: "A Maintainable Style Guide"
date: 2014-05-07 09:52
comments: true
categories:
---

Maintaining a Style Guide over a long period of time is hard work. Even with our best intentions the maintenance of any project is difficult when matched against the expectation of feature release. Style Guides, most often prioritised below the maintenance of your applications themselves, are likely the first candidates to fall behind and the last to be brought out of tech debt.

This is bad because once your Style Guide falls out of sync with your application(s) it has entirely lost its purpose. It is no longer a trustworthy representation of the state of your UI and will quickly fall out of favour with the design and development team.

This is bad because Style Guides are more than a nicety for developers to show off their style. Done properly, they can be a crucial bridge between design and development teams as well as a tool to break down the user interface into its component parts rather than than thinking about it as a whole or as a series of pages. They also serve as a resource for new designers and developers to locate existing patterns and ready-made code blocks for further use.

All of these benefits should be sought regardless of the size or scope of your project though they shouldn't come at a cost to delivering features. Prioritising work on a Style Guide, alongside user-facing features, is more of a cultural and organisational challenge but I'd like to share how we achieved this at Lonely Planet by making it an integral part of our development methodology.

Before that, it's worth explaining how we tried and why we failed with the traditional types of Style Guide.


## Our Failures

We have tried and failed with two different approaches.

### Static HTML

Style Guides built with static HTML are standalone representations of your UI components with no direct link to your codebase. Once you change or refactor your HTML or CSS you will need to go and update the Style Guide.

The main difficulty with keeping this up to date with your application is duplication of templates. It's likely that any long running project is dynamic with integrated templates. Coupling this with a static Style Guide requires diligence on the part of all developers to manually keep it up to date.

I built a static html Style Guide a couple of years ago to try to decipher the UI we had inherited but ultimately it didn't make our work any easier and quickly fell behind and out of importance.

It's worth mentioning that as a design tool, or as a deliverable to a client who is going to carry on the development, static Style Guides are a fantastic starting point.


## 2. Living Style Guides

This should be the holy grail, right? You're probably also wondering how ours fell out of date given the 'living' clue in the title?

The reason is simply duplication of templates. The majority of living Style Guide approaches follow a pattern something like this:

#img of markup in css

Here we have a couple of buttons referenced in the css and when we run a script across it it will output the elements to the Style Guide alongside the markup.

The problem here is, that template isn't the template we use in our applications! It might very well be the same, particularly in the short term, but it already needs some keeping up to date if one changes. As soon as you introduce template duplication the probability of one of them falling out of date tends to 1 as time goes on.

Now this is easy to overlook when you're talking about single element components like buttons where the effort is minimal to maintain, but what about more complex components requiring multiple elements, attributes, classes..? The likelihood of them later falling out of date rapidly increases.

If you're rendering templates to a Style Guide they should be exact same templates you would render to your application.

There is also the problem of the output. Typically you would get something approximating this (taken from the codeforamerica.com Style Guide):

#img of checkbox list

Nice to look at but this poses another problem because it exposes the markup to the developer to copy and paste. Now, even if we presume that the rendered template code is absolutely up to date, once they copy that code and use it an application you have a responsibility to maintain it. If you update the template, you will have to update all versions of the template scattered around your site.

You might be thinking that that isn't such a big deal, we have Find&Replace, Sed, etc. It's not a big deal. Truthfully, I don't know whether this is only a problem for large applications. In our case, as an author of a component I won't always know where it's being used, I may not even have heard of the application that it's being used in. That makes it particularly difficult for developers to ensure they don't release breaking changes.

This is a huge cause for Technical Debt build up at Lonely Planet. As the entire infrastructure is too large to completely hold inside your head, you have to build defensively. If there is no mechanism for encouraging risk-free reuse of components then they simply won't be used and instead we end up with duplicated components and bloated code.

Anyway, even on small sites wouldn't it be nice to only have to update the template in one place and not have to use Find & Replace?

## A Component API

