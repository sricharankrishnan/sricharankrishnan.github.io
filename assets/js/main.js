(function(w, d, $mainRoot) {
  /* this function will help to check the scroll position of the window scroll bar and then
     will invoke the callback function attached as an argument */
  function checkWindowScrollPosition(thisParentElement, thisCallback) {
    try {
      if (!thisParentElement || !thisCallback) {
        throw new Error(
          "requires 2 mandatory arugments for functioning. Please check what has been passed"
        );
      } else if (typeof thisCallback !== "function") {
        throw new Error(
          "requires the argument 'thisCallback' to be of function type only"
        );
      } else {
        $(window).on("scroll", function() {
          var elementTopPos = thisParentElement.offset().top,
            elementBotPos = elementTopPos + thisParentElement.outerHeight(),
            viewportTopPos = $(window).scrollTop(),
            viewportBotPos = viewportTopPos + $(window).height(),
            hasDataLoaded = thisParentElement.attr("data-hasloaded");

          if (
            elementBotPos > viewportTopPos &&
            elementTopPos < viewportBotPos &&
            hasDataLoaded === "false"
          ) {
            thisCallback();
          }
        });
      }
    } catch (thisError) {
      console.error("checkWindowScrollPosition() -> " + thisError);
    }
  }

  /* handles the jumbotron section */
  function jumbotronSection() {
    var pe = $mainRoot.find("#jumbotronSection"),
        mp4VideoSrc = pe.attr("data-mp4"),
        webmVideoSrc = pe.attr("data-webm");

    if(mp4VideoSrc !== "" && webmVideoSrc !== "") {
      var configObject = {
        parentElement: pe,
        fallbackImage: "",
        playInMobile: true,
        playInTablet: true,
        playInDesktop: true,
        webmVideo: webmVideoSrc,
        mp4Video: mp4VideoSrc
      };
      buildHtmlVideo(configObject);
    }
  }

  /* youtube section */
  function YouTubeSection() {
    this.parentElement = $mainRoot.find("#youtubeSection");
    this.carouselUnit = this.parentElement.find("#o2Unit");
    this.carouselConfig = {        
      loop: true,
      dots: true,
      nav: false,
      responsive: {
        768: {
          items: 2,
          stagePadding: 20
        },
        992: {
          items: 3,
          stagePadding: 20
        },
        1200: {
          items: 4,
          stagePadding: 40
        }
      }
    };
  }
  YouTubeSection.start = function() {
    if ($(w).innerWidth() >= 768) {
      var yt = new YouTubeSection();
      yt.init();
    }
  };
  YouTubeSection.prototype.init = function() {
    var $this = this;
    $this.loadCarousel();
    $this.loadItems();
  };
  YouTubeSection.prototype.loadCarousel = function() {
    var $this = this;
    /* intialize the carousel */
    $this.carouselUnit.owlCarousel($this.carouselConfig);
  };
  YouTubeSection.prototype.loadItems = function() {
    var $this = this;
    var citems = $this.carouselUnit.find(".carouselItem");
    var len = citems.length;
    var counter = 0;

		/* set unique id value per item in the carousel */
		for (var i = 0; i < len; ++i) {
			citems.eq(i).attr("id", "citem" + i);
		}

    $this.loadImage(citems, len, counter);
  };
  YouTubeSection.prototype.loadImage = function(citems, len, counter) {
    var $this = this;
    var item = citems.eq(counter);
    var imgsrc = item.attr("data-img");
    var imgname = item.attr("data-imgname");
    var img = $('<img class="img-responsive center-block"/>');
    
    img.attr({
      "src": imgsrc,
      "alt": imgname,
      "title": imgname
    })
    .on("load", function() {
      item.removeClass("isLoading").append(img);
      $this.loadYtOverlay(item);
      $this.nextIteration(citems, len, counter);
    })
    .on("error", function() {
      $this.nextIteration(citems, len, counter);
    });
  };
  YouTubeSection.prototype.loadYtOverlay = function(thisitem) {
    var ytBuild = new YoutubeOverlayModule({
      sourceUrl: thisitem.attr("data-video"),
      triggerElement: "#" + thisitem.attr("id"),
      progressCallback: function() {;}
    });
		ytBuild.activateDeployment();
  };
  YouTubeSection.prototype.nextIteration = function(citems, len, counter) {
    var $this = this;
    if (++counter < len) {
      setTimeout(function() {
        $this.loadImage(citems, len, counter);
      }, 60);
    }
  };

  function ProjectSection() {
    this.parentElement = $mainRoot.find("#projectSection");
  }
  ProjectSection.start = function() {
    var projects = new ProjectSection();
    projects.init();
  }
  ProjectSection.prototype.init = function() {
    var $this = this;
    $this.getStarGazers();
  };
  ProjectSection.prototype.getStarGazers = function() {
    var $this = this;
    var projects = $this.parentElement.find(".project");
    var len = projects.length;
    var counter = 0;

    function performApiGet() {
      var apiurl = projects.eq(counter).attr("data-stargazers");
      $.ajax({
        url: apiurl,
        method: "get"
      })
      .done(function(data) {
        if (data.length > 0) {
          var lbltext = data.length === 1 ? "1 Star" : data.length + " Stars";
          projects.eq(counter).find(".count").text(lbltext);
          projects.eq(counter).find(".starGazer").removeClass("hide");
          nextIteration();
        }
      })
      .fail(function(err) {
        nextIteration();
      });

      function nextIteration() {
        if (++counter < len) {
          setTimeout(performApiGet, 60);
        }
      }
    }
    performApiGet();
  };

  function centralController() {
    jumbotronSection();
    YouTubeSection.start();
    ProjectSection.start();
  }

  $(d).ready(centralController);
})(window, document, $("#appRoot"));
