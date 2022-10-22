# Layout File
Jekyll Arabica uses the predefined ```_layouts``` directory for one ```default.html``` layouts file. This is the central file that controls all other page loads in this boiler plate. Each section in the layouts template file is responsible for rendering a certain portion of the page when fully loaded. Details are as follows:

### App Meta
A partial connected to a html document that has all the meta tags sutiable for page SEO requirements. This is located within the head tag of the layouts file.
```html
<!-- [meta info] -->
{% include app-meta/index.html %}
<!-- [meta info] -->
```

### Critical Inline CSS
A partial connected to a Sass stylesheet that helps to pipe out styles that would be useful for loaders and any other initial css that you need before a page fully loads. Check out the [CRITICAL CSS WITH JEKYLL AND SASS](https://www.andreaverlicchi.eu/critical-css-jekyll-sass-github-pages/) blog post to get an idea of how this works.
```html
<!-- [critical inline css] -->
<style type="text/css">
{% capture criticalRender %}
  {% include initial-render.scss %}
{% endcapture %}
{{ criticalRender | scssify }}
</style>
<!-- [critical inline css] -->
```

### App Loader
A partial html document that contains code for the page loader UI. This is the interface that is usually shown immediate when the page first loads before all of the required stylesheet details are loaded dynamically through javascript.
```html
<!-- [app loader] -->
{% include app-loader/index.html %}
<!-- [app loader] -->
```

### App Content
This is the portion of the layouts file that is connected to a specific page that has its layouts yaml key connected to a layouts file. The ```app-nav``` contains html code for a sample nav section. The ```{{ content }}``` section helps pipe out the content from a specific page. And the ```app-footer``` contains some sample html code for the footer section of the page.
```
<div class="appRoot hide" id="appRoot">
  <!-- [app nav partial] -->
  <nav>{% include app-nav/index.html %}</nav>
  <!-- [app nav partial] -->

  <!-- [main content] -->
  <main>{{ content }}</main>
  <!-- [main content] -->

  <!-- [app footer partial]-->
  <footer>{% include app-footer/index.html %}</footer>
  <!-- [app footer partial]-->
</div>
```

### App Fonts
A html partial file that contains javascript that helps load specific google fonts. I would recommend that you checkout [this github repository](https://github.com/typekit/webfontloader) for more information on the functionality.
```html
<!-- [app fonts config] -->
{% include app-webfonts/index.html %}
<!-- [app fonts config] -->
```

### Javascript Timestamp
This is a timestamp that we can use to ensure that the latest updates being done for javascript files is loaded on a particular hosting platform. Usage of this particular timestamp is seen in the next section.
```html
<!-- [js file timestamp] -->
<script type="text/javascript">
  var serveFileVer = "?serveFileVer=23022022_1747";
</script>
{% assign serveFileVer = "23022022_1747" %}
<!-- [js file timestamp] -->
```

### Javascript Files
This section contains all the javascript files that the page will rely on when being loaded. You can for certain pages, use liquid templating language to specify when a particular script tag should be rendered or not. The last file that says ```{{ page.jsfile }}``` is determined by the YAML key value in the respective front matter of a particular page layout.
```html
<!-- [javascript files] -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js?serveFileVer={{ serveFileVer }}" type="text/javascript"></script>
<script src="/assets/js/vendor-components/bootstrap/bootstrap.min.js?serveFileVer={{ serveFileVer }}" type="text/javascript"></script>
<script src="/assets/js/common.js?serveFileVer={{ serveFileVer }}" type="text/javascript"></script>
<script src="/assets/js/{{ page.jsfile }}.js?serveFileVer={{ serveFileVer }}" type="text/javascript"></script>
<!-- [javascript files] -->
```

### Conclusion
The details given in this section is to help serve developers when building websites with jekyll. You can choose to re-arrange and alter any portion of this predefined set of ideas as per your personal preference or project requirements. This boilerplate is meant to serve as a guideline and <b><em>is not meant to be misinterpreted as dogmatic</em></b>.
