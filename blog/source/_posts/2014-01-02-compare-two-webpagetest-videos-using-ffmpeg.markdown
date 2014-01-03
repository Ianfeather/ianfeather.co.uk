---
layout: post
title: "Compare two WebPagetest videos using ffmpeg"
date: 2014-01-02 23:52
comments: true
categories: 
---

Using WebPagetest you can create visual comparisons of different sites&apos; loading speeds. This is a really useful tool for showing product owners how performance can make a difference to the user&apos;s perception of a website.

Whilst WebPagetest has a huge amount of features hidden away, one feature which doesn&apos;t exist (I don&apos;t believe, but will probably be proved wrong) is the ability to visually compare the same page at different historical points: before and after optimisation, for example.

It is possible to acheive this yourself though as you can access all your previous test runs as well as download the videos and modify them. You could almost certainly place them side by side using a video editor but it can also be done very quickly and simply using ffmpeg (~5s to generate the below video).



<pre class="language-bash"><code>
  # Firstly install ffmpeg (using brew or from binary)
  brew install ffmpeg

  # Customise before.mp4, after.mp4 and output.mp4
  ffmpeg -i before.mp4 -i after.mp4 -filter_complex "[0:v:0]pad=iw*2:ih[bg]; [bg][1:v:0]overlay=w" output.mp4

</code></pre>

That&apos;s all there is to it. The finished video will look like this:
<div class="video-embed">
  <iframe width="560" height="315" src="//www.youtube.com/embed/NoFEswBIcQo" frameborder="0"> </iframe>
</div>