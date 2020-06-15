---
title: Ian Feather
subtitle: Web Development writing from Ian Feather
layout: layouts/base.njk
bodyClass: index
pagination:
  data: collections.post
  reverse: true
  size: 6
  alias: recents
---


## Recent technical writing

<div class="index-section">
  <ul>
  {%- for page in recents -%}
    <li>
      <h3 class="index-title">
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </h3>
      <h4 class="index-subtitle">{{ page.data.subtitle | safe }}</h4>
    </li>
  {%- endfor -%}
  </ul>
  <a class="index-see-more" href="/posts">View the full archive ></a>
</div>


## Popular posts
<div class="index-section">
  <ul>
  {%- for page in collections.popular -%}
    <li>
      <h3 class="index-title">
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </h3>
      <h4 class="index-subtitle">{{ page.data.subtitle | safe }}</h4>
    </li>
  {%- endfor -%}
  </ul>
</div>

## Short posts

<div class="index-section">
  <ul>
  {%- for page in collections.fewer_words | reverse -%}
    <li>
      <h3 class="index-title">
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </h3>
      <h4 class="index-subtitle">{{ page.data.subtitle | safe }}</h4>
    </li>
  {%- endfor -%}
  </ul>
</div>

## Non technical writing

<div class="index-section">
  <ul>
  {%- for page in collections.non_tech | reverse -%}
    <li>
      <h3 class="index-title">
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </h3>
      <h4 class="index-subtitle">{{ page.data.subtitle | safe }}</h4>
    </li>
  {%- endfor -%}
  </ul>
</div>
