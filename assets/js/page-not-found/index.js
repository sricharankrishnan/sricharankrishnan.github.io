(function ($mainRoot, w, d) {
  /* top level vars */
  var hasWebpSupport = false;

  function pageControl() {
    console.log("Hello World - Page Not Found Template Loaded.");
  }

  /* starts here */
  (function() {
    var pagecss = "/assets/css/page-not-found/style.css";
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
})($("#pageNotFound"), window, document);
