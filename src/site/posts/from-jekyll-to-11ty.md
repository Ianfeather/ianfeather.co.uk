---
title: "Moving this blog from Jekyll to 11ty"
subtitle: "A couple of gotchas but mostly very straightforward"
date: 2020-03-15
comments: true
categories: blog
---

Rebuilding my personal site is always going to be very low on my list of priorities: at the time of doing it this site was running on a version of Jekyll 3 major versions behind latest. I also had no problem with Jekyll, it just worked! Which in my world is ideal.

However, getting a new computer meant installing all the relevant ruby dependencies and I hit a wall that I couldn't get past. Rather than go down the rabbit hole of OS/Ruby/Gem compatibility, I decided to finally make the move away from Jekll and Ruby.

I wanted to choose something that was easy to convert to and used JavaScript. [11ty](https://www.11ty.dev/) seems to be the popular choice right now so I ended up with that. All in all it probably took around 6 hours of work, spread out over multiple days - not too bad - though I cut some corners along the way to make my life easier.

## Getting started

[I asked on twitter](https://twitter.com/ianfeather/status/1234224142754336768) originally to get some advice on where to begin and was pointed to a few resources including [this article](https://24ways.org/2018/turn-jekyll-up-to-eleventy/) from [Paul Robert LLoyd](https://twitter.com/paulrobertlloyd).

In the end I decided to rebuild from a boilerplate, specifically [Phil Hawksworth](https://twitter.com/philhawksworth)'s [EleventyOne](https://github.com/philhawksworth/eleventyone). It gave me:
- A directory structure
- A prepared eleventy config file
- A postcss pipeline
- A JS pipeline

The [11ty docs](https://www.11ty.dev/docs/) are great and I leaned on them a lot during the process. If you're doing a similar process to me I would recommend reading and understanding the sections on [Collections](https://www.11ty.dev/docs/collections/) and [The Data Cascade](https://www.11ty.dev/docs/data-cascade/). I had to refer to these often but once I got my head around them it really made the work smoother.

## Gotchas along the way

### What about Sass?
Phil's boilerplate doesn't include Sass. Whilst there are quite a lot of other [Starter Projects](https://www.11ty.dev/docs/starter/) that do have them I decided that I didn't need this dependency any more and converted mine back to CSS.

My styles were written in indented syntax (that's how old this site is) so I converted that back to SCSS using [SassMeister](https://www.sassmeister.com/) and then converted the Sass variables to [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*). The mixins and extends were just removed and replaced with good old-fashioned duplication.

### All my content was suddenly wrapped in a &lt;pre&gt; tag
This was a strange one, that has come up in a couple of [issues](https://github.com/11ty/eleventy/issues/533) before. The problem was that certain includes were being rendered as preserved markup rather than being interpreted as DOM elements:

This turned out to be a markdown issue. When you indent a certain amount in markdown it preserves the whitespace and wraps it in a pre element. In my template I was using the following data but you can see the outcome below:

<pre class="language-markup"><code>layout: layouts/base.njk
pageClass: posts
templateEngineOverride: njk, md
</code></pre>

<img src="/images/pre-output.jpg" />

To fix this, I removed the `md` directive from the `templateEngineOverride`. It then rendered fine.

### Listing recent posts in the sidebar of a post page
11ty has good support for [pagination](https://www.11ty.dev/docs/pagination/) but there were two things I couldn't initially figure out:
- How to have more than one pagination object per page?
- How to paginate posts _on_ a post page?

I needed these because I list various categories of post in the sidebar on each page. Whenever I tried to add the pagination data on a post page I would get the following error:

<pre class="language-bash"><code>Problem writing Eleventy templates: (more in DEBUG output)
> Dependency Cycle Found: ___TAG___all -> ./src/site/posts/a-post.md -> ___TAG___post -> ./src/site/posts/a-post.md

`Error` was thrown:
    Error: Dependency Cycle Found: ___TAG___all -> ./src/site/posts/a-post.md -> ___TAG___post -> ./src/site/posts/a-post.md
</code></pre>

It made sense that this would cause some cyclical dependency issues but i wasn't sure how to fix it. Eventually, after referring to the docs, I realised I could control all of this in the eleventy configuration file. I used the following to make the sidebar:

<pre class="language-javascript"><code>config.addCollection("sidebarRecent", (collection) => {
  return collection.getFilteredByTag("post").slice(-5);
});

config.addCollection("sidebarFewer", (collection) => {
  return collection.getFilteredByTag("fewer_words").slice(-5);
});

config.addCollection("sidebarNonTech", (collection) => {
  return collection.getFilteredByTag("non_tech").slice(-5);
});
</code></pre>

I could then iterate over these different collections in the sidebar and add headings.

### That was it

The rest was just me fiddling around with templates and trying to remember how to do front end development again. All the code for this site is [available on Github](https://github.com/ianfeather/ianfeather.co.uk) if you're interested. It's by no means good code but it does the job and I no longer need to install Ruby on this computer!
