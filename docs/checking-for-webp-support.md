# Checking for Webp Image Support
A small piece of javascript code in ```./assets/js/common.js``` file helps to check if a particular browser supports Webp Images or not. Although the adoption rates have increased, there are still a percentage of browsers that do not support Webp. For projects that wish to serve both regular (like ```.png```, ```.jpg```) and webp files, the javascript snippets adds a particular class to the body of the loading page.

Below is the code snippet which was borrowed from [this stackoverflow page](https://stackoverflow.com/questions/5573096/detecting-webp-support). Other demo codes are available to show you how to this works with the rest of the boilerplate.

```javascript
  var webP = new Image();
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
  webP.onload = webP.onerror = function () {
    var hasWebpSupport = webP.height === 2;
    if (hasWebpSupport) {
      $("body").addClass("hasWebpSupport");
    } else {
      $("body").addClass("noWebpSupport");
    }

    if (typeof callback === "function") {
      callback(hasWebpSupport);
    }
  };
```
