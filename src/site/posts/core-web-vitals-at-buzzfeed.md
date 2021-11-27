---
title: "Improving Core Web Vitals at BuzzFeed"
subtitle: A long-term approach to containing layout shifts
date: 2021-11-27
comments: true
categories: blog
---

My team at BuzzFeed (Web Infrastucture) has spent the last few months working on reducing the impact of layout shifts on each of our websites. This was not a straightforward task, given our reliance on third party embeddable content and ads, but it has been very fruitful: we've gone from a score of 20 to 79, signficantly improved the quantity of SEO referrals, and put in place a system that will allow us to stay on top of this going forward.

I co-authored the following articles with Edgar Sanchez, describing how we accomplished the above. These are available in full over on BuzzFeed's tech blog.

## Part 1: Raising The Floor

To begin with, we talk about the challenges in setting up a stable testing environment. The variability of our pages, coupled with the unpredictability of ad rendering makes this less straightforward than many other sites. We split the page into layers and configured Calibre to test each of them individually. We also recreated the CrUX dashboard internally with real time updates.

[Read the full post](https://tech.buzzfeed.com/improving-cumulative-layout-shift-at-buzzfeed-part-1-8b7ead2381dd)

## Part 2: Getting Help From Real Users

At the end of Part 1 we’d fixed all the obvious issues and exhausted our ideas for which parts of the site to next investigate. In this article we detail how we switched from auditing the site ourselves to having our users do it for us: leveraging our analytics pipeline to report elements with the worst layout shifts.

[Read the full post](https://tech.buzzfeed.com/improving-cumulative-layout-shift-at-buzzfeed-part-2-2a846adeb097)

## Part 3: Dealing with the unpredictable

And finally in part 3 we tackled third party embeds - one of the bigger challenges for content-heavy sites. We talk about how we crowdsourced embed data from our users and used this to pre-size embeds before they even loaded their own JS. This was what finally pushed us into the "good page" threshold and which now allows editors to add embeds without any concern for layout shifts.

[Read the full post](https://tech.buzzfeed.com/improving-cumulative-layout-shift-at-buzzfeed-part-3-3a36240861e4)
