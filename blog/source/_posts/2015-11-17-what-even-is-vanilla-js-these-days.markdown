---
layout: post
title: "What even is Vanilla JS these days?"
date: 2015-11-17 11:30
comments: true
categories: blog
---

Originally it was non-jQuery, right? Or did it come before that? Anyway the term definitely got popular when people were eschewing jQuery in the quest for lighter pages at the expense of a few browser bugs.

Zero dependency libraries became a thing, which meant each library had their own tiny abstraction of DOM selection utilities and polyfills for Array methods. None of which could be extracted into shared dependencies and cached separately of course but, hey, they were 10x lighter and 20x faster than jQuery so what was there to worry about?

Then jQuery fell way off the radar due to a surge in browsers becoming evergreen, our eagerness to drop older, painful, browsers, and the proliferation of sites like youmightnotneedjquery.com. With jQuery out of the equation these days vanilla is much more likely to refer to the absence of frameworks like Ember, Angular, React or Backbone, of which only the latter requires jQuery.

In Paul Lewis’ recent article on the performance comparisons of frameworks he highlighted a vanillajs implementation of TodoMVC which was 16kb: significantly smaller than the other frameworks but certainly not tiny. Primarily it’s smaller as it is can be focused on this one specific purpose allowing for greater optimisation but making it somewhat throwaway after the life of the project. And, of course, it still has to reimplement a bunch of the same features that are present in other libs.

What makes this vanilla? Sure, it doesn’t have any dependencies but what makes up that 16kb?

It includes tiny abstractions for querySelectorAll and DOM events which you’d absolutely expect as developer conveniences. It include it’s own implementation of a micro templating library which focuses only on the todo template but still covers non-trivial html escaping.

It registers model.js, controller.js and view.js, it is todo*MVC* after all but it’s starting to look suspiciously like my-framework.js rather than vanillajs. In fact it’s really looking like a less-tested and less-jQuery snowflake version of backbone.  This isn’t hating on the particular example on the todomvc page it just gets you wondering where the line is drawn between vanillajs and.. flavoured js?

Is it vanillajs if you don’t include a framework but you do include lots of tiny libs as dependencies? Is it vanillajs if it’s written in TypeScript? Is it wise to care about any of this? Is it a worthy goal?

Whilst your own implementation of these features can be smaller and more focused, certainly more performant, is chasing this title going to create a less buggy application? Will it be safer and more secure than a framework which has the benefit of a huge user base and collective intelligence? Are you going to have to reimplement features every time requirements change and could this lack of manoeuvrability end up causing costs to you and your user greater than the extra perf differences?

Anyone who I’ve worked with surely attest that I’m not a fan of debating terminology. It gets in the way of doing actual work and, truthfully, everyone else is better than me at it anyway. Vanillajs is a term that is gathering so much momentum though, and conflating so many ambiguous combinations that it either needs to be defined or descend into utter meaninglessness. And if it’s the latter we need to go back and update thousands of blog posts and slidedecks so maybe it’s best to just nip it in the bud now.
