---
title: "Radical Candor in Code Review"
subtitle: Applying leadership lessons to give more useful feedback
date: 2018-03-17
comments: true
categories: blog
---

Recently I read [Radical Candor by Kim Scott](https://www.amazon.co.uk/Radical-Candor-What-Want-Saying/dp/1509845380/ref=sr_1_1). It discusses how we can communicate more directly and effectively and it’s something BuzzFeed have integrated into our culture. I find myself looking for more opportunities to give direct feedback to my colleagues, both positive and negative, where previously I would have shied away. Kim defines radical candor as:

<blockquote>Radical Candor™ is the ability to Challenge Directly and show you Care Personally at the same time.</blockquote>

Both of these sides are crucial. If you just challenge directly but don’t care about the person then you come across as an asshole. If you care but aren’t prepared to offer any guidance then you’re not helping that person. To emphasise this point she designed the following diagram:

<img src="/images/radical-candor.png" />

She explains the other three quadrants (taken from [radicalcandor.com](radicalcandor.com)):

<blockquote>Obnoxious Aggression™ is what happens when you challenge but don’t care. It’s praise that doesn’t feel sincere or criticism that isn’t delivered kindly.<br /><br />

Ruinous Empathy™ is what happens when you care but don’t challenge. It’s praise that isn’t specific enough to help the person understand what was good or criticism that is sugarcoated and unclear.<br /><br />

Manipulative Insincerity™ is what happens when you neither care nor challenge. It’s praise that is non-specific and insincere or criticism that is neither clear nor kind.</blockquote>

## What does this have to do with code review?

The book is written for people in leadership positions but the lessons are universal. Fundamentally it's about helping those around you be as successful as they can be.

As developers we rarely exist in a silo so communication is one of the most important tools we have. I’ve seen a lack of empathy for someone else’s opinion cause serious rifts within a team and this happens more than ever during code review, usually as comments on Pull Requests. So let’s look at how we can apply Radical Candor to code review.

### Obnoxious Aggression

These are the type of PR comments that stick in our minds, go viral on twitter, and are typically deemed as being from ‘assholes’. A real one that sticks in my mind was a single comment on a large pull request:

<blockquote>Lodash templates blow.</blockquote>

It’s crass, it’s unconstructive. It was followed by the commenter rewriting the PR (without asking) to use a different templating language. It was also followed by the author of the original PR looking for a new job.

### Manipulative Insincerity

This can transpire in lengthy PRs where someone only adds a single LGTM comment. Unless it’s been discussed offline it’s likely that the reviewer doesn’t care enough to invest their time in thoroughly reviewing the code. In this case their approval is both hollow and disrespectful. If you actually do come across a long PR with no faults whatsoever you should take the opportunity to offer some more constructive, positive feedback.

In its worst form this can also be represented by a lack of a comment. The reviewer sees something they know is risky but they keep quiet, perhaps thinking that the author will learn their lesson when it causes them problems later on.

### Ruinous Empathy

You may be hitting this area if you try to sugarcoat some negative feedback for fear of hurting the feelings of the author. Pay attention to your use of “could”, “maybe”, “if you like”, “up to you”, particularly if your real feelings about it are stronger.

This can also be an issue when re-reviewing code: if the author has improved their code in response to a number of your comments but it still doesn’t reach the standard it should be at. It’s possible you will look for ways to praise their improvements rather than make further direct feedback.

## What does the radical candor version look like?

#### Give positive feedback

Take time to acknowledge the good parts and comment if you learned something. This is something we often overlook because we become trained to just spot defects.

#### Take time to guide the person, not just the code
This is about explaining the “why”. What was it you experienced/read/told that gave you the different perspective? Share those resources.

#### Use facts/experience rather than opinions
“I don’t like this pattern” vs “This pattern actually caused us issues in a previous project because of X”.

#### Use non-threatening language
Some people might be ok receiving feedback that borders on obnoxious aggression but they are likely to be in the minority. It can also be intimidating for others who see those comments.

#### Understand your own personality and act accordingly
My natural tendency is to be over polite and hold back if I don’t know the author that well. Because of that, if I doubt myself I typically err on the side of saying something. You might want to consider erring on the side of holding back If your personality is the opposite.

