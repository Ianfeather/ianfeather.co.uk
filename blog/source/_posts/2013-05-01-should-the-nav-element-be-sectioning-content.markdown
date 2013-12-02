---
layout: post
title: "Should the nav element be sectioning content?"
date: 2013-05-01 08:52
comments: true
categories: 
---

Recently we've been nurturing the document outlines at Lonely Planet to create a simpler snapshot of the page for both accessibility and SEO reasons. One thing I was surprised about is how the <em>nav</em> element creates a new section in the document outline.
  
Sectioning content requires a heading or it will appear in the document outline as "untitled". 

<div class="blog-grid">
  <div class="column">
    <h3>bostonglobe.com</h3>
    <img src="/images/boston-globe-outline.png" />
  </div>
  <div class="column">
    <h3>smashingmagazine.com</h3>
    <img src="/images/smashing-magazine-outline.png" />
  </div>
</div>

How often do you code up a navigational section with a heading? More often than not the elements and their position on the page is self-documenting. And do you even want your navigation to be part of the document outline at all?

It is worth noting at this point that VoiceOver (I haven't tested other screen readers) will not read out 'Untitled nav' and will just honour the links within. Also, not all html5 elements create a new sectioning context. <em>footer</em>, for example, does not.

## Decision time

This leaves you with a few options for marking up your navigation:


- A non html5 element. Using a *div* or a *ul* will not affect the document outline.
- A non html5 element with an aria navigation role. Maybe the best of both worlds but at the expense of not following the latest specs.
- *nav* with a heading. If you want to use the more semantic *nav* you could use a heading within, which will title your navigation in the outline. If it doesn't fit your design you can always visually hide it. If you're doing this though, should you need to be jumping through these hoops?
- *nav* - Just live with having untitled navigation

Which do you think is currently the most practical? More importantly, is the spec serving the majority of use cases with *nav* being sectioning content?



### Handy resources

- [http://html5doctor.com/outlines/](http://html5doctor.com/outlines/)
- [http://coding.smashingmagazine.com/2011/08/16/html5-and-the-document-outlining-algorithm/](http://coding.smashingmagazine.com/2011/08/16/html5-and-the-document-outlining-algorithm/)
