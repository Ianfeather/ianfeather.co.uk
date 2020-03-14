---
title: Archive
subtitle: All posts from Ian Feather
layout: layouts/base.njk
bodyClass: index
---

<div class="index-section">
  <ul>
  {%- for page in collections.archive | reverse -%}
    <li>
      <h3 class="index-title">
        <a href="{{ page.url }}">{{ page.data.title }}</a>
      </h3>
      <h4 class="index-subtitle">{{ page.data.subtitle | safe }}</h4>
    </li>
  {%- endfor -%}
  </ul>
</div>
