---
layout: post
title: "Radical Candor in Code Review"
date: 2018-03-17 10:30
comments: true
categories: blog
---

Recently I read [Radical Candor by Kim Scott](https://www.amazon.co.uk/Radical-Candor-What-Want-Saying/dp/1509845380/ref=sr_1_1). It discusses how we can communicate more directly and effectively and it’s something BuzzFeed have integrated into our culture. I find myself looking for more opportunities to give direct feedback to my colleagues, both positive and negative, where previously I would have shied away. Kim defines radical candor as:

<blockquote>Radical Candor™ is the ability to Challenge Directly and show you Care Personally at the same time.</blockquote>

Both of these sides are crucial. If you just challenge directly but don’t care about the person then you come across as an asshole. If you care but aren’t prepared to offer any guidance then you’re not helping that person. To emphasise this point she designed the following diagram:

<img src="/images/radical-candor.png" />

She explains the other three quadrants:

<blockquote>Obnoxious Aggression™ is what happens when you challenge but don’t care. It’s praise that doesn’t feel sincere or criticism that isn’t delivered kindly.

Ruinous Empathy™ is what happens when you care but don’t challenge. It’s praise that isn’t specific enough to help the person understand what was good or criticism that is sugarcoated and unclear.

Manipulative Insincerity™ is what happens when you neither care nor challenge. It’s praise that is non-specific and insincere or criticism that is neither clear nor kind.</blockquote>

<i>Taken from [radicalcandor.com](radicalcandor.com).</i>

Radical Candor is the sweet spot we should all be aiming for in our interactions!

<h2>What does this have to do with code review?</h2>

The book is written for people in leadership positions, those who often find themselves having to have difficult conversations and who carry some responsibility for the people in their team. The lessons are universal though and are fundamentally about helping those around you be as successful as they can be.

As developers we rarely exist in a silo and communication is one of the most important skills we can learn. I’ve seen a lack of empathy for someone else’s opinion cause serious rifts within a team and this happens more than ever during code review, usually as comments on Pull Requests.

So let’s look at how we can apply this to code review.

<h3>Obnoxious Aggression</h3>

These are the type of PR comments that stick in our minds, go viral on twitter, and are typically deemed as being from ‘assholes’. A real one that sticks in my mind:

<blockquote>Lodash templates blow.</blockquote>

It’s crass, it’s unconstructive. It was followed by the commenter rewriting the PR (without asking) to use a different templating language. It was also followed by the author of the original PR looking for a new job.

<h3>Manipulative Insincerity</h3>

This can transpire in lengthy PRs where someone only adds a single LGTM comment. Unless it’s been discussed offline it’s likely that the reviewer simply doesn’t care enough to invest their time in thoroughly reviewing the code. Their approval is both hollow and disrespectful. If you actually do come across a long PR with no faults whatsoever you should take the opportunity to offer some more constructive, positive feedback.

In its worst form this can also be represented by a lack of a comment. The reviewer sees something they know is risky but they keep quiet, perhaps thinking that the author will “find out the hard way” or “learn their lesson in due course”.

<h3>Ruinous Empathy</h3>

This is the one I’ve struggled with most in the past. It happens when you try to sugarcoat some negative feedback for fear of hurting the feelings of the author. You might be hitting this territory if you’re using too many words like “could”, “maybe”, “if you like”, “up to you”, particularly if your feelings about it are stronger.

This can also be an issue when re-reviewing code: if the author has improved their code in response to a number of your comments but it still doesn’t reach the standard it should be at. It’s more likely you will look for ways to praise their improvements rather than make further direct feedback.

<h3>What does the radical candor version look like?</h3>

Radical candor isn’t a culture which is introduced overnight. We (at least the British we) are not typically good at receiving feedback, either good or bad, so the trust is something which needs to be built up over time. However here are a few ways you can get started:

<h4>Give positive feedback</h4>

Take time to acknowledge the good parts and comment if you learned something. This is something we often overlook because we become trained to simply spot defects.

<h4>Take time to guide the person, not just the code</h4>
This is about explaining the “why”. What was it you experienced/read/told that gave you the different perspective? Share it if you can.

<h4>Use facts/experience rather than opinions</h4>
“I don’t like this pattern” vs “This pattern actually caused us issues in a previous project as soon as it began to grow”.

<h4>Use non-threatening language</h4>
Some people might be ok receiving feedback that borders on obnoxious aggression but they are likely to be in the minority. It can also be intimidating for others who see them.

<h4>Understand your own personality and act accordingly</h4>
My natural tendency is to be over polite and hold back if I don’t know the author that well. Because of that, if I doubt myself I typically err on the side of saying something. You might want to consider erring on the side of holding back If your personality is the opposite.

<h3>Now go read the book...</h3>
It’s far better written than this and you’ll start applying the techniques to all aspects of your life. I get no commission despite having it to most people I’ve met! It’s recently been released on paperback.
