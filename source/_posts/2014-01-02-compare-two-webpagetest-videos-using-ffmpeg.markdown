---
layout: post
title: "Compare two videos side by side using ffmpeg"
date: 2014-01-02 23:52
comments: true
categories: blog
---

If you need to create a comparison of two other videos you can do so easily with ffmpeg.

Recently I needed to compare two WebPagetest videos but couldn't find the original test results. Fortunately I had the videos stored locally so I just needed a way to recreate their video comparison feature offline.

You could almost certainly place them side by side using a video editor but it can also be done very quickly and simply using ffmpeg (~5s to generate the below video).

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
