---
title: Fewer Words
subtitle: Shorter posts from Ian Feather
layout: layouts/base.njk
bodyClass: index
---

<p>A collection of non-technical writing.</p>

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
