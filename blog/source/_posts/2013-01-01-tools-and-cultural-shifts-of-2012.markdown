---
layout: post
title: "Tools and Cultural Shifts of 2012"
subtitle: "A link-ridden rundown of the last year"
date: 2013-01-01 12:59
comments: true
categories: devops, web development
---

<p class="blog-intro">Our acceptance of competent 3rd party code and adoption of tools seems to have been the biggest shift in Front End Development over the past 12 months. The plague, and fear, of jQuery plugins have been replaced by the adoption of libraries like [requireJS](http://requirejs.org/), [backbone](http://backbonejs.org/) and [underscore](http://underscorejs.org/). The take-up of pre-processors like [Sass](http://sass-lang.com/), [Less](http://lesscss.org/) and [Coffeescript](http://coffeescript.org/) have been staggering (and wrought by confusion and competition). The amount of new tools that have come out of the woodwork and required your *immediate attention* has been overwhelming.</p>

<blockquote class="pull-quote">For our current project we have deployed to production just over 2000 times in the past 7 months.</blockquote>

I joined Lonely Planet in January 2012 and the list of tools/libraries that I've been introduced to over the last year is chock full of names that would have baffled me before. If I were to list those which we use day-to-day at work it would include: [StatsD](https://github.com/etsy/statsd), [Graphite](http://graphite.wikidot.com/), [Graphiti](https://github.com/paperlesspost/graphiti), [LogStash](http://logstash.net/), [Elastic Search](http://www.elasticsearch.org/), [Akamai](http://www.akamai.com), [Fozzie](https://github.com/lonelyplanet/fozzie), [Node](http://nodejs.org/), [Express](http://expressjs.com/), [Guard](https://github.com/guard/guard), [Jammit](https://github.com/documentcloud/jammit), [RequireJS](http://requirejs.org/), [Uglifier](https://github.com/lautis/uglifier), [Grunt](http://gruntjs.com/), [Postgres](http://www.postgresql.org/), [Rails](http://rubyonrails.org/), [Nginx](http://wiki.nginx.org/Main), [New Relic](http://newrelic.com/), [Nagios](http://www.nagios.org/), [PagerDuty](http://www.pagerduty.com/), [Chef](http://www.opscode.com/chef/), [Knife](http://wiki.opscode.com/display/chef/Knife), [AWS suite](http://aws.amazon.com/), [BrowserStack](http://www.browserstack.com/), [BEM](http://bem.info/method/), [Sass](http://sass-lang.com/), [Haml](http://haml.info/), [Coffeescript](http://coffeescript.org/)&hellip; and many more. The list goes on, and I've forgotten plenty. Exhausting right?

But it hasn't just been the tools that have taken prescience, new channels of focus have evolved for me outside of the traditional Big Three  of Front End Development. The main areas I've been involved with as a result of my work at [Lonely Planet](http://www.lonelyplanet.com/vietnam/ho-chi-minh-city/hotels) have been Performance, Preprocessors and Rails, Continuous Deployment and BDD.

## Performance

If I'm being super critical, my knowledge around performance pre 2012 was limited to caching jQuery selectors and following the [YSlow](http://developer.yahoo.com/yslow/) guidelines. If I were to give myself a break though these guidelines are more than enough for an average Joe website. Getting to understand, implement and refine the key concepts behind Lonely Planet's concept of ['Screamingly Fast'](http://www.slideshare.net/mbjenn/performance-and-metrics-at-lonely-planet-14589911) has been a real eye opener and shaving off the milliseconds has become a new form of addiction.

Performance has been something we live and breathe at LP and we discuss, demo and practise it constantly. We've also got a long way to go to get to where we need to be. Our monitoring is good (mostly due to [Fozzie](https://github.com/lonelyplanet/fozzie)) but still has a long way to go on the front end. Our reporting and alerting needs to be vastly improved and these are important challenges for 2013. 

## Preprocessors and Rails

The fact that I hadn't written a line of Sass prior to 2012 amazes me. The same applies to both Haml and CoffeeScript only to lesser degrees. 

I've had my ups and downs with CoffeeScript. At first it was fascinating because it was something new to learn, then infuriating because I couldn't write valid CoffeeScript for JavaScript I could have written. Next up came the understanding and the enjoyment it could give, the ease and speed at which you could write and the simplicity of stripping out the verbose syntax. Then more infuriation, as I began to get sloppy with real JavaScript and forgot to reintroduce the verbose syntax. 
Now, fortunately, I am in somewhat of a take it or leave it position though if I have a choice I tend to write CoffeeScript. 

Sass is a God send and something that frustrates me if I don't have access to (thankfully a rare occurrence). Crafting a CSS architecture using Sass has been a learning curve though and it's one that I, and I suspect everyone else, is still on.

Haml just makes sense. [Slim](http://slim-lang.com/) makes even more sense.

There are other aspects of rails that I've enjoyed learning. Understanding the [asset pipeline](http://guides.rubyonrails.org/asset_pipeline.html), the presenter layer, creating gems for our CSS and JS assets and using guard to do more or less everything, to name a few, have all been new challenges. Learning to write Ruby has been particularly enjoyable.

## Continuous Deployment

Previous to 2012 I'd worked in an agile environment where we deployed to production at the end of each sprint (1 or 2 weeks). This was after a deploy to a staging environment and a stint of QA. I wasn't involved in the build process and my involvement ended after my code was tested and proven to be working.

For our current project we have deployed to production just over 2000 times in the past 7 months and I've been involved throughout. That's quite a difference, not only from a cultural perspective but also from an architectural one. We don't have any QAs on the project and we've never rolled back a deploy. We've broken things, sure, but we've put ourselves in a position to quickly fix and iterate on them. 

It's fair to say I was late to the party on this. John Allspaw's groundbreaking [10 deploys a day](http://www.slideshare.net/jallspaw/10-deploys-per-day-dev-and-ops-cooperation-at-flickr) talk was way back in 2009 and many companies have been practising this technique since then. I'm glad to be at the party though :)

The architecture is built around [Chef](http://www.opscode.com/chef/), the tool from the guys at [Opscode](http://www.opscode.com/), and we use [ec2](http://aws.amazon.com/ec2/) instances to host our code with a load balancer in place to allow us to run AB tests.

One of the tools that I've been super impressed with is [Knife](http://wiki.opscode.com/display/chef/Knife) (Opscode again). It's a command line tool for interacting and configuring with your cloud based instances. The main benefit for me has been its ability to automatically SSH into multiple remote instances and run commands. So say, for example, we have three different versions of our project running on separate instances (an AB test and a canary build for example) and I've updated each of the git repos with a minor copy change or bumped a gem; I could run one CLI command using knife which would search all instances for those related to our projects, SSH into each of them and run a sudo command to pull the latest code from the repo and then rebuild the instance. A massive time saver and a very cool piece of kit.

The other, non technical, side of Continuous Experimentation and AB testing has been a reintroduction to Statistics (something I hadn't touched since A-Level maths!) around AB testing. I've learnt things like understanding the volumes required to gain statistical confidence in the result of your AB test, the learnings we can take from the full histogram and when to ignore certain statistical findings.

## BDD

Tests are those things that back end devs write, right? Bang goes that attitude in 2012 and it's surprising we got away with it for so long on the Front.

On our current project we have ~1000 unit and integration steps. This provides a lot of comfort when you're making changes that will go live without QA and provides me with a certain amount of anxiety when I realise our coverage is slipping. This is a huge culture shift in itself but even more so that on the front end we are now using Behaviour and Test Driven Development techniques that have long escaped us. 

At first the inconvenience of course outweighed the 'best practice' but it only takes one bug to slip through for that attitude to change. BDD for me has been an attitude shift in that it allows me to effectively write the blueprint for my code before building and ensures it will be focused and decoupled.

This is another area I will definitely look to improve on during 2013.

## What haven't I learned, what have I missed out on?

I've done next to no work on anything responsive and in fact my exposure has been limited to this blog and a couple of microsites. In some ways I think this is a shame because it's a challenging and fascinating area. This is likely something that will become more important for us in 2013.

I haven't worked with any of the fancy new JS frameworks like [Backbone](http://backbonejs.org/), [Ember](http://emberjs.com/) or [Angular](http://angularjs.org/). Our project toes the line between website and webapp and we made a decision to build without a framework early on. I'm eager to get involved with these, so a side-project in the new year will likely be built using one of these new technologies.

## What's next for 2013?

Who knows? It's going to be an interesting one. I don't expect it to be quite as intense as the last one in regards to the amount of new technologies but really I have no idea. It's guaranteed to be an exciting one. 

I'm looking forward to doing ['Seven Languages in Seven Weeks'](http://pragprog.com/book/btlang/seven-languages-in-seven-weeks) with the guys at work and I've had an inkling for some time to have a play with [ClojureScript](https://github.com/clojure/clojurescript). I also have a huge list of things to learn which I have been eager to get round to for a while, things like: [FlexBox](http://www.w3.org/TR/css3-flexbox/), [Grunt](http://gruntjs.com/), [X-Tag](https://github.com/mozilla/x-tag), [Web-RTC](http://www.webrtc.org/)&hellip;

Other than that, I think it's going to be more of the same and hopefully a deeper knowledge of each aspect. We've got a long way to go to get our setup exactly how we want it but I look forward to us never quite getting there and always pushing for more.




