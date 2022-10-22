# Page Load Process
Each page that is created with the jekyll arabica boilerplate uses a simple loading process. When a page loads, the first section that appears is a loader screen. The html code for this loader UI is located at ```_includes/app-loader/index.html```, which is placed as a partial in the ```_layouts/deafult.html``` file. Below is the code for the loader:
```html
<div class="appLoader positionRelative" id="appLoader">
  <img src="/assets/icons/app-loader.gif" class="img-responsive" alt="Loading..." title="Loading..."/>
</div>
```
The main content portion of a page while all the necessary assets are being dynamically loaded through javascript is hidden. The portion of this code is kept in the ```_layouts/default.html```, as shown below:
```html
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
When a particular page loads, based on the url request sent, first the loader appears. In the meanwhile, the respective javascript file connected to a particular page, dynamically loads the required CSS file. After the CSS file loads, client side javascript checks if the browser has support for Webp image format, following which updates are done and the loader is hidden displaying the requested page.
```javascript
/* sample javascript code from assets/js/home/index.js file */
(function() {
  var pagecss = "/assets/css/home/style.css";
  thisapp.loadDeferredCSS(pagecss, function() {
    thisapp.checkWebpSupport(function(webpSupportStatus) {
      hasWebpSupport = webpSupportStatus;
      pageControl();
      setTimeout(function() {
        $("#appLoader").addClass("hide");
        $mainRoot.find("#appRoot").removeClass("hide");
      }, 2500);
    });
  });
})();
```
This may not necessarily be the best way to load a page. You are free to make changes to this process if you know a better way. Reaons for dynamically loading the CSS file for a page is to help improve performance on page load. Also, you could choose to lower the ```setTimeout``` milliseconds value <em>(2500 milliseconds is just sample value given here and is not mandatory for you to use this in every page)</em>.
