---
layout: post
title: "Compare two WebPagetest videos using ffmpeg"
date: 2014-02-01 23:52
comments: true
categories: 
---

Using WebPagetest you can create visual comparisons of the loading speed of multiple sites. This is a really useful tool for showing product owners how much difference performance can make to the user&apos;s perception of a website.

Whilst WebPagetest has a huge amount of features hidden away, one feature which doesn't exist (I don't believe, but will probably be proved wrong) is the ability to visually compare your site at different historical points: before and after optimisation, for example.

This is possible though as you can access all your previous test runs as well as download the videos and modify them. You could almost certainly place them side by side using a video editor but it can also be done very simply using ffmpeg, like so:



<pre class="language-bash"><code>
  # Firstly install ffmpeg (using brew or from binary)
  brew install ffmpeg

  # Customise before.mp4, after.mp4 and output.mp4
  ffmpeg -i before.mp4 -i after.mp4 -filter_complex "[0:v:0]pad=iw*2:ih[bg]; [bg][1:v:0]overlay=w" output.mp4

</code></pre>

That&apos;s all there is to it. Output.mp4 will look something like this:
<div class="video-embed">
  <iframe width="560" height="315" src="//www.youtube.com/embed/NoFEswBIcQo" frameborder="0"> </iframe>
</div>