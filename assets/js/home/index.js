(function ($mainRoot, w, d) {
  /* top level vars */
  var hasWebpSupport = false;

  function pageControl() {
    console.log("Hello World - Home Page Loaded.");
  }

  /* starts here */
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
})($("#homePage"), window, document);
