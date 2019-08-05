(function(w, d) {
  var $websiteRoot = $("#outerBorder");

  /* checks the scroll position of the required element in the document */
  function checkScrollPos(thisParentElement, thisCallbackFunction) {
    $(window).on("scroll", function() {
      var elementTopPos = thisParentElement.offset().top,
          elementBotPos = elementTopPos + thisParentElement.outerHeight(),
          viewportTopPos = $(window).scrollTop(),
          viewportBotPos = viewportTopPos + $(window).height(),
          resourcesHaveLoaded = thisParentElement.attr("data-hasloaded");

      if(elementBotPos > viewportTopPos && elementTopPos < viewportBotPos && resourcesHaveLoaded === "false") {
        thisCallbackFunction();
      }
    });
  }

  /* handles the introduction of first fold and
     animation on scroll effects */
  function jumbotronHandler() {
    var pe = $websiteRoot.find("#jumbotronSection"),
        tbg = pe.find(".triangleBg"),
        peHeight = pe.height();

    $(w).on("scroll", function() {
      var wScrolled = $(w).scrollTop()/peHeight,
          scaleTo = 1.0 + wScrolled,
          styleObject = {}; 
      
      if(wScrolled >= 1) {
        styleObject.opacity = "0";
      }
      else if(wScrolled === 0) {
        styleObject.opacity = "0.15";
        styleObject.transform = 'translate(-50%, -50%) scale(1)';
      }
      else {
        styleObject.opacity = wScrolled;
        styleObject.transform = 'translate(-50%, -50%) scale(' + scaleTo + ')';
      }

      tbg.css(styleObject);
    });

    var hText = pe.find("h1"),
        pText = pe.find("p");

    pe.removeClass("hiddenTransform");
    hText.removeClass("hiddenTransform");
    pText.removeClass("hiddenTransform");
    tbg.removeClass("hiddenTransform");
  }

  /* this function helps to handle the text section for the
     app */
  function textSectionHandler() {
    var pe = $websiteRoot.find("#textSection");
    checkScrollPos(pe, function() {
      pe.attr("data-hasloaded", "true");
      setTimeout(function() {
        pe.removeClass("hiddenTransform");
      }, 800);
    });
  }

  /* this function helps to handle the portfolio section */
  function portfolioSection() {
    var pe = $websiteRoot.find("#portfolioSection"),
        segments = pe.find(".segment");

    checkScrollPos(pe, function() {
      pe.attr("data-hasloaded", "true");
      setTimeout(function() {
        pe.removeClass("hiddenTransform");
        setTimeout(function() {
          segmentEntry();
        }, 200);
      }, 800);
    });

    function segmentEntry() {
      var counter = 0,
          len = segments.length;

      function startAni() {
        segments.eq(counter).removeClass("hiddenTransform");
        if(++counter < len) {
          setTimeout(startAni, 150);
        }
      }
      startAni();
    }
  }

  function centralController() {
    jumbotronHandler();
    textSectionHandler();
    portfolioSection();
  }

  function hideAppLoader(thisCallback) {
    $("#appLoader").addClass("hide");
    $websiteRoot.removeClass("overflowHidden");
    thisCallback();
  }
  hideAppLoader(centralController);
})(window, document);
