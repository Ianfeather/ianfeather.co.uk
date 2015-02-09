---
layout: post
title: "Transitioning between tools"
date: 2015-01-22 03:30
comments: true
categories:
---

Transitioning between tools is almost an inevitability in any long running project: new tools will become available, new knowledge acquired which highlight new opportunities, and products will morph, pivot and shoot off in tangents taking all earlier decision justifications with them. Transitioning is a necessity then but often very expensive. So, how do you know when the time has come to make a change worthwhile? And how often should you re-evaluate these earlier decisions?

The cost of transitioning comes in a variety of forms: developer time spent introducing the new tool and removing the old, teams getting to understand the new tool and workflows, as well as the cognitive overhead of working with two tools at the same time if, as happens often in large systems, tools need to be transitioned gradually. Knowing when and why to transition typically requires nous and experience, a history of past mistakes and a good eye for balancing future benefits and complexities.

There’s no simple answer to the above questions, however these decisions _have_ to be taken. Your tech stack can’t risk  becoming stagnant simply because you are afraid to make changes. Of course you can pre-empt this certainty by building your applications in a loosely coupled manner, giving yourself the best chance of replacing parts easily when necessary, but the time will still arise.

It's true there is no replacement for experience though I believe there are good traits you can have as a developer to help you reason about these decisions. These are some of those I have picked up over the last couple of years whilst tech leading Lonely Planet.


<h2 id="be-t-shaped" class="blog-subtitle">1. Be T-Shaped</h2>

To be able to make a confident decision you need to be aware of your available options. You also need to be aware of the established pros and cons of the options as well as how each option would fit in to your current stack.

A T-Shaped Engineer is one that has a deep understanding of a certain subject (or subjects) and a broad understanding about many others. Being T-Shaped gives you the flexibility of knowing what to pay attention to but also knowing how deep you need to go on a particular topic.

For example, as a JavaScript developer you should have a deep understanding of the core language features and a broad understanding of the merits of each JavaScript framework. You should be able to suggest that a certain project might lend itself better to Flight over Angular, or Ember over Backbone, depending on the application in question but be prepared to dig deeper on each before coming to a final choice.


<h2 id="constantly-reevaluate" class="blog-subtitle">2. Constantly re-evaluate previous decisions</h2>

Every part of your stack should be up for debate at all times. Decisions often outlive developers and definitely outlive developers favourable opinions.

Hold meetings where you discuss each part and allow engineers to voice their opinion on them. It’s a great way of having interesting tech discussions where people can bring new tools to the table that they may be using in side projects and also often surprises in exposing parts that no one can remember the reasoning behind. Tools sometimes lose their value but hang around regardless and if they don’t serve to help the workflow their presence should be questioned.

<h2 id="document-decisions" class="blog-subtitle">3. Document decisions</h2>

Just as decisions often outlive developers’ tenure, they definitely outlive our memories. We’ve had discussions over tools where no one can remember the reason they were first introduced. Document these decisions, including the other tools that were considered alongside them and the reasons for choosing the winner.

This is also extremely useful for new developers who come in questioning the existing toolset. It’s important to be able to show that decisions weren’t just made on a whim, as well as to show the reasoning behind each.

<h2 id="be-patient" class="blog-subtitle">4. Be patient</h2>

When you think it’s time to move to a different solution: wait. Then wait some more. Then go on on holiday.

This is obviously more important for large, deeply impactful decisions but is the most important trait in my opinion. It’s a lesson I’ve learnt from a few different people with great results in my career so far.

Waiting allows all the problems to surface and gives you a better basis on which to choose the next solution. Splitting an application into parts might seem like the obvious solution from day one, but letting the application mature will likely show more clearly where the separation should happen.

<h2 id="be-consistent" class="blog-subtitle">5. Be consistent</h2>

I’ve recommended this article so many times but [the best tool for the job, isn’t always](https://medium.com/@bentlegen/the-best-tool-for-the-job-isnt-always-6ed364f3f775) by [Ben Vinegar](https://twitter.com/bentlegen) hits the nail on the head so well.

A lack of consistency is a sign of complexity.

<h2 id="ignore-shiny-tools" class="blog-subtitle">6. Ignore shiny new tools that don't solve your problems</h2>

I recently tweeted about this, something like “The ability to ignore new tools is underrated in our industry”. It got a surprisingly good response but some people took it out of context and thought I was implying that you shouldn’t explore new tools. I actually meant the opposite.

I firmly believe that you should experiment and explore with new tool and techniques but you should be happy to just say, “That’s a great tool, but it doesn’t solve a problem for us”.

The classic example is build tools. When gulp came out it was all the rage and we were already pretty well set up with Grunt, had no problems with it at all and no one really noticed the workflow. I’ve used gulp in a number of side projects, and personally prefer it to Grunt, but still believe there isn’t a compelling enough use case to introduce it to replace an existing, working system.

<h2 id="youmightneedjquery" class="blog-subtitle">7. youmightneedjquery.com</h2>

Sometimes bytes are an investment in your productivity. Users want fast pages but they also want new, functional features. Yes, it’s incredibly important to deliver the leanest experience you can and you should strive to do so with each decision but you should also ensure that you’re not chasing optimisations at the expense of your team’s performance.

(I’m not just talking about jQuery there obviously. You might need it though. Just saying.)

<h2 id="don-t-do-it-all-yourself" class="blog-subtitle">8. Don't do it all yourself</h2>

A while ago we were considering writing an image processing service to handle resizing on the fly. It would have been a fun little project and we could certainly have done it but we ended up asking ourselves if that was something we really wanted to build, optimise and maintain alongside the rest of our core product? In the end we went with a young startup [resrc.it](www.resrc.it) and never looked back, saving ourselves a lot of money and hassle in the process.

Don’t be afraid to leverage third party services if applicable. The chances are they do their “one thing” a lot better than you can alongside everything else you do.

<h2 id="does-it-benefit-the-user" class="blog-subtitle">10. Does it benefit the user</h2>

Finally, every discussion and decision should be based around the benefits to the end user. Some of these benefits will be more obvious and direct, such as swapping out a library which performs better. In this case it should be easy to focus on the user and calculate how worthwhile the transition is.

Decisions which don’t directly impact the user can still be measured because ultimately every decision we make reaches them in some form. Swapping tools to speed up asset deployment by five seconds every build might make the developers feel better but is investment which the user won’t appreciate. Switching testing environments and speeding up each build by ten minutes may allow developers to push features and fixes out faster and is more likely to provide benefit. In this way, decisions which improve developer happiness will indirectly improve the user experience.

It’s all about the user.






-----


Still, when it comes to be time for change, you’re going to have that awkward decision of how you transition to the next. I’m still unsure of which is the best way as the following two have both proven to work badly on different occasions. Perhaps there is an elusive third approach I’m not aware of?

<h3 class="blog-subtitle--small">a. You transition gradually.</h3>

In this scenario, old and new solutions will coexist for a period of time. The benefit of this is you get the opportunity to evaluate the new solution and the ability to adjust if necessary. The downside is that in a typical product ecosystem it can take a long time and sometimes never quite finish due to other constraints. This leaves an air of legacy and confusion behind it.

<h3 class="blog-subtitle--small">b. You switch over in one go.</h3>

Development stops, you swap old for new, you start again. This is risky because you won’t have the opportunity to gradually test the new solution and it can also be unfeasible if the amount of work required is sizeable. It does have the huge benefit of creating a ‘clean break’ though, both mentally and in the codebase.

