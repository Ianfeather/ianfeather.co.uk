---
layout: post
title: "Better Technical Architecture Proposals"
subtitle: Get your ideas across and be more impactful by avoiding these mistakes
date: 2019-03-15 10:30
comments: true
categories: blog
---

Known by many names (Architecture Proposals, RFCs, Design Documents, Architecture Review docs, Architecture Design Records...), these all have the same objective: to present your thoughts to a wider audience, to solicit feedback, and to persuade decision makers.

I’ve come to realise that their success depends heavily on how they are delivered, regardless of how good the proposal is. The reality is that being “right” often isn’t actually enough: even the most compelling and logical argument can be ruined by poor communication. To see your work lose its impact because of non-technical reasons is incredibly frustrating! In this article I’ll share some of the lessons I’ve learned along the way on how to ensure that it’s the content that does all the talking.

Firstly, let’s clarify what we mean by an Architecture Proposal. These documents are typically only written for significant architecture decisions or adoption of new technologies. Topics which could merit an architecture proposal might include “migrating to TypeScript” or “replacing our REST endpoints with GraphQL”.

It’s not guaranteed that an organisation will value these proposals, but they're beneficial in a lot of ways. As well as being useful as a way to organise your own thoughts, they increase transparency throughout an organisation and a library of these documents enables new engineers to learn the context and thought process around how systems are architected.

Crafting a good proposal, getting consensus and seeing it realised can be both satisfying and impactful. On the other hand, being upset at the status quo whilst looking back at your failed proposals to address the problem is frustrating and makes you feel resigned to a lack of desire for change. I’ve had my share of both. Here are the mistakes I’ve made and the lessons I’ve learned along the way:

### Make sure the context is included _within_ the proposal

You’ll know if you’ve failed to do this when you share it with someone for the first time. Your message to them should be as simple as _**“Hey, I’d love your thoughts on this \[link to doc\].”**_

A few times I’ve caught myself constructing a message like _**“Hey, X asked me to put together some thoughts on Y. It’s still WIP right now. The main reason we’re doing this now is because of the deadline later in the year. Let me know what you think.”**_

Needing to include this context in the message is a clear signal that your document is missing context and needs revisiting. The reason why this is so important is because the proposal is almost certainly going to be passed onto others who don’t have this additional context and this could entirely change the way they perceive it. Put that context in the first paragraph!

### You can’t contain how far your proposal will reach

If a proposal is interesting, and especially if it’s controversial, then people will share it further than you ever expect. Don’t expect to be able to tweak and refine it before it reaches _that person_. And don’t expect access rights to fix this! People will read it over each others’ shoulders.

Instead, accept that you can’t contain it and make sure that the premise and goals of your proposal are accessible to everyone. If there’s a certain person or department that you think might be resistant to the changes you’re proposing then make sure you explicitly call out their concerns in the document and proactively share it with them.


### Share it with people you trust before going public

Maybe you can’t contain a document’s reach once it’s “public public” but you should certainly be able to within your closest group of colleagues. This step is important for catching any obvious issues and making sure that the proposal is technically sound. I like to think of it like code review: an opportunity to find bugs before it gets to production.

This group should be made up of people whose critical abilities you trust, and who you can expect to get honest and direct feedback from. Try to ensure it’s not made up entirely of Yes People. If you’re only getting positive feedback then push them to be harder on you!


### Explicitly call out non-goals of the proposal

Goals and non-goals set the boundaries around the areas that you’re agreeing to accept criticism on. They can be a great way of acknowledging and pre-empting adjacent topics you might be expecting, they also make it easier for you to deal with comments such as “What about \[insert unrelated hard problem here\]??”

Non-goals are not a way of you opting out of responsibility though. Let’s say you’re writing a proposal to migrate all of your front end applications to React, a valid non-goal might be _“This proposal does not aim to set coding standards for how we will write application code using React”_. These standards can be figured out later if you decide to take forward the proposal so they’re not worth including as part of the core argument. An invalid non-goal might be _“This proposal does not consider the impact on SEO”_. In this case, presuming your site is public, being “SEO-friendly” is likely to be a constraint in your decision.

### Use a shared vocabulary
Given that you can’t control how far the proposal will reach you should anticipate that it will be read by people who are outside your technical domain: product managers, designers, your CEO even; as well as people who don’t have the same native language as you. Where possible use language that can be understood by anyone. Be succinct and to the point, and skip any big words that don’t add value to the sentence. Avoid talking too much in the abstract; people are reading to get the specifics of your proposal.

You should aim to gear the language of sections towards their intended audience. Avoid using technical language in the introductory sections unless it’s otherwise impossible to convey your point. When you are in the purely technical sections you can use technical language unapologetically. If you think there’s any risk that certain concepts are familiar to only a small minority then link out to further reading on the subject.

### I think that’s it!
I’ve definitely made more mistakes than the ones above but I may unfortunately have scrubbed them from my memory. Regardless, if you follow these you’ll be a step ahead of where I was. Remember that your number one goal is to connect your ideas with other people, so always keep your audience in mind and write the docs for them, not for yourself.
