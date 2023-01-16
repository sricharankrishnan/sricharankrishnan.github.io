(function ($mainRoot, w, d) {
  /* top level vars */
  var hasWebpSupport = false;
  var contactForm = null;

  var ContactForm = (function() {
    function Constructor() {
      this.parentElement = $mainRoot.find("#contactMeParent");
      this.form = this.parentElement.find("#contactMeForm");
      this.data = {
        contactEmail: "",
        contactNumber: "",
        contactMessage: ""
      };
      this.init();
    }
    Constructor.prototype.init = function() {
      var $this = this;
      $this.formDataHandler();
      $this.formSubmitHandler();
    };
    /* set values to the data object in this class - single source of truth */
    Constructor.prototype.formDataHandler = function() {
      var $this = this;
      var emailInput = $this.form.find("#contactEmail");
      var phoneInput = $this.form.find("#contactNumber");
      var messageInput = $this.form.find("#contactMessage");

      /* common method */
      function inputHandler() {
        var id = $(this).attr("id");
        var value = $(this).val();
        $this.data[id] = value;
      }

      /* email */
      emailInput.on("change keyup paste", inputHandler);

      /* phone */
      phoneInput.on("change keyup paste", inputHandler);

      /* message - 250 character limit */
      messageInput.on("change keyup paste", function() {
        var id = $(this).attr("id");
        var message = $(this).val();
        message = message.length > 250 ? message.substring(0, 250) : message;
        messageInput.val(message);
        $this.data[id] = message;
      });
    };
    /* form submit handler */
    Constructor.prototype.formSubmitHandler = function() {
      var $this = this;
      var emailInput = $this.form.find("#contactEmail");
      var phoneInput = $this.form.find("#contactNumber");
      var messageInput = $this.form.find("#contactMessage");

      $this.form.on("submit", function(event) {
        event.preventDefault();
        $this.hideFormErrors();
        appSounds.playButtonClick();

        /* state for validatation */
        var validation = {
          contactEmail: false,
          contactMessage: false
        };
        var overallState = false;

        /* perform the actual validation here - phone number is optional */
        validation.contactEmail = (thisapp.isValidEmailFormat($this.data.contactEmail)) ? true : false;
        validation.contactMessage = ($this.data.contactMessage.length > 0) ? true : false;

        if (validation.contactEmail === true && validation.contactMessage === true) {
          var contactFormData = $this.createFormData();
          $this.showProcessing();
          $this.sendDataForStorage(contactFormData, function(response) {
            $this.hideProcessing();
            if (response.success === true) {
              $this.sendSuccessAlert();
              $this.resetContactForm();
              appSounds.playOkSound();
            }
            else {
              $this.sendFailAlert();
              appSounds.playErrorSound();
            }
          });
        }
        else {
          $this.showFormErrors(validation);
        }
      });
    };
    /* stores the form data in basin form */
    Constructor.prototype.sendDataForStorage = function(data, callback) {
      $.ajax({
        url: "https://usebasin.com/f/a35452a4dd53",
        method: "POST",
        data: data,
        contentType: false,
        processData: false,
        crossDomain: true,
        headers: {
          "Accept": "application/json"
        }
      })
      .done(function(response) {
        callback(response);
      })
      .fail(function(error) {
        console.error(error);
        callback({success: false});
      });
    };
    /* snackbar alert - success */
    Constructor.prototype.sendSuccessAlert = function() {
      thisapp.createSnackBar("Thank You! I've Got Your Message.", "alert-success")
    };
    /* snackbar alert - success */
    Constructor.prototype.sendFailAlert = function() {
      thisapp.createSnackBar("Sorry. Try Again?", "alert-danger")
    };
    /* creates the form data */
    Constructor.prototype.createFormData = function() {
      var $this = this;
      var formData = new FormData();

      for (var prop in $this.data) {
        if ($this.data.hasOwnProperty(prop)) {
          formData.append(prop, (!$this.data[prop]) ? "Not-Given-By-User" : $this.data[prop]);
        };
      };

      return formData;
    };
    /* show form errors for the fields */
    Constructor.prototype.showFormErrors = function(obj) {
      var $this = this;
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop) && !obj[prop]) {
          var idString = "#" + prop;
          $this.form.find(idString).parent().find(".error").addClass("show");
        }
      }
    };
    /* hides form errors for the fields */
    Constructor.prototype.hideFormErrors = function() {
      var $this = this;
      $this.form.find(".error").removeClass("show");
    };
    /* submit button animation - start */
    Constructor.prototype.showProcessing = function() {
      var $this = this;
      $this.form.find("#submitButton").addClass("processing");
    };
    /* submit button animation - stop */
    Constructor.prototype.hideProcessing = function() {
      var $this = this;
      $this.form.find("#submitButton").removeClass("processing");
    };
    /* resets the form */
    Constructor.prototype.resetContactForm = function() {
      var $this = this;
      $this.form.trigger("reset");
    };

    return Constructor;
  })();

  var PageHandler = (function() {
    function Constructor() {
      this.init();
    }
    Constructor.prototype.init = function() {
      var $this = this;
      contactForm = new ContactForm();
      $this.skillsCarouselHandler();
    };
    Constructor.prototype.skillsCarouselHandler = function() {
      var parentElement = $mainRoot.find("#dsaCarousel");
      var config = {
        nav: false,
        dots: true,
        loop: false,
        responsive: {
          0: {
            items: 1,
            stagePadding: 20
          },
          768: {
            items: 2,
            stagePadding: 30
          },
          992: {
            items: 3,
            stagePadding: 30
          },
          1200: {
            items: 3,
            stagePadding: 30
          }
        }
      };

      parentElement.owlCarousel(config);
    };

    return Constructor;
  })();

  function pageControl() {
    new PageHandler();
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
