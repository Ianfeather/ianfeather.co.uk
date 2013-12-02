---
layout: post
title: "Object Oriented Sass"
subtitle: "A study into performance implications"
written: "for the <a href='http://devops.lonelyplanet.com/oosass'>Lonely Planet DevOps blog</a>"
date: 2012-7-30 13:51
comments: true
categories: 
---

I’ve been re-examining how we declare and manage CSS objects at LP, recently using the placeholder syntax (%) in Sass over a class directly in the markup. I had a couple of reservations around this, partly because it’s a leap away from the traditional OOCSS method of using multiple classes as building blocks but also in its usability and impact on performance.

The more I’ve been dabbling with the placeholder approach though; the more I can see that traversing the middle ground between the two is going to result in suboptimal code. So I decided to do some research and disprove my reservations.

For those who haven't yet used them, selectors with placeholders will not be included in the CSS output but they are able to be extended. For example, using everyone’s favourite media object would mean we no longer have to chain the .media class to benefit from its abstraction and we can make sure the media declaration won't be output unless used:

<pre><code class="language-scss">%media
  … the media object …

.comment-block
  @extend %media
</code></pre>

Effectively what this allows us to do is construct our css objects in our css as opposed to in the markup. There are definitely pros and cons to this approach and all could be subjective depending on your existing codebase and workflow. I've highlighted some below but I'd be keen to hear of any that I have missed.

## OOSass pros and cons:

### Pros

- More readable style declarations - there’s no need to keep your naming short
- Leaner markup
- More selective use of styles (only really applicable to sites with multiple stylesheets responsible for different areas)

### Cons (all debatable)

- Back end devs have to write Sass if they want to build up styles
- Slower to iterate on styles than directly on the dom
- Only possible using preprocessors

## Performance

If you’re working with OOCSS chances are you care about performance and metrics. So, whilst the placeholder syntax is feeling like a nice approach to me, I wanted to run some tests to see the effect on css size.

I took the css for a previous incarnation of ianfeather.co.uk as the base file. It was written a long time ago with loose OOCSS and is fairly performant but not heavily optimised.

Following this, I optimised the CSS by abstracting out some classes and thinning down a few selectors. I wasn’t expecting big improvements but I wanted to ensure that I had a performant baseline file to test against.

My main concern was that the gzipped file size would actually increase because of less repetition in the code so it was good to see that this is minimal and that the final code is still smaller. (This blocker could potentially be removed only by extending placeholders which have at least two rule declarations inside.)

<table>
  <tbody>
    <thead class="table-header">
      <th>&nbsp;</th> <th>Size</th> <th>Gzipped</th> <th>Compression</th>
    </thead>
    <tr>
      <td>Base</td>
      <td data-label="Size" class="val">26514</td>
      <td data-label="Gzipped" class="val">7055</td>
      <td data-label="Compression" class="val">73%</td>
    </tr>
    <tr>
      <td>OOCSS</td>
      <td data-label="Size" class="val">26411</td>
      <td data-label="Gzipped" class="val">6196</td>
      <td data-label="Compression" class="val">77%</td>
    </tr>
    <tr>
      <td>OOSass</td>
      <td data-label="Size" class="val">24520</td>
      <td data-label="Gzipped" class="val">5920</td>
      <td data-label="Compression" class="val">76%</td>
    </tr>
  </tbody>
</table>

## Performance in the browser

The CSS file size is key to the critical path but I also wanted to ensure that using this method wouldn’t increase the selector matching or paint time.

I created two pages, each with 1200 buttons, one using chained classes and one using extended classes. I then profiled them using Opera’s CSS Profiler. Unfortunately the results were absolutely identical so this test was inconclusive. Perhaps a larger test file with more variance would be required to create a true test.

The Profiled results for both pages:

<img src="http://getfile3.posterous.com/getfile/files.posterous.com/temp-2012-07-30/gqljjyuevtomeeyHxwFoHctuaqjfAHBqCcuqEcufskGgoioubHnEzukhoqqe/opera-profile.jpg.scaled699.jpg" alt="Opera profile view" />

## Conclusions

Whilst our test showed there was no huge performance benefit for this approach, it also failed to show a downside for it. This, for me, is a validation of the approach and allows us to look at the more intangible benefits we outlined earlier.

I also think there are performance gains to be made when scaling up. We’ll use our Sass gem, Beaker, across a fairly wide range of projects and using this will mean each project has access to all objects and base classes as well as the ability to pick and choose which are required and which will be output to their project.css file.

Whether or not this approach is right for you is likely dependant on your existing css architecture. For us, we have the opportunity to shape our future CSS and I think this is a healthy way of doing it.