var _opts = Object.prototype.toString;

/* [Dev Note]: the final index.min.js file will have jquery,
   not at this level, so we would be using vanilla js style to load the 
   files */

/* this function helps to load the required stylesheets */
function loadStylesheets(filesArray, callAfter) {
  try {
    if(_opts.call(filesArray) !== "[object Array]") {
      throw new Error("- requires argument filesArray to be of Array type. Please check.");
      return;
    }
    else if(filesArray.length <= 0) {
      throw new Error("- requires atleast 1 file to be passed into the fileArray for processing.");
      return;
    }
    else if(!!callAfter && typeof callAfter !== "function") {
      throw new Error("- if callback is being given (2nd Argument), then it must be of function type.");
      return;
    }
    else {
      var fileCount = filesArray.length,
          counter = 0;

      /* required area to place the file */
      var headTag = document.getElementsByTagName("head")[0];
      function createFile() {
        var l = document.createElement("link");
        l.setAttribute("rel", "stylesheet");
        l.setAttribute("type", "text/css");
        l.setAttribute("href", filesArray[counter]);

        headTag.appendChild(l);

        l.onload = function() {
          iterationHandler();
        };

        l.onerror = function() {
          console.warn("!! - Stylesheet Not Loaded -:");
          console.log("File Path: - " + filesArray[count]);
          iterationHandler();
        };

        function iterationHandler() {
          if(++counter < fileCount) {
            setTimeout(createFile, 10);
          }
          else {
            if(!!callAfter && typeof callAfter === "function") {
              callAfter();
            }
          }
        }
      }
      createFile();
    }
  }
  catch(thisErr) {
    console.error("Load Stylesheets Error");
    console.error(thisErr);
  }
}

/* this function will help to load the required javascript files */
function loadJavascriptFiles(filesArray, callAfter) {
  try {
    if(_opts.call(filesArray) !== "[object Array]") {
      throw new Error("- requires argument filesArray to be of Array type. Please check.");
      return;
    }
    else if(filesArray.length <= 0) {
      throw new Error("- requires atleast 1 file to be passed into the fileArray for processing.");
      return;
    }
    else if(!!callAfter && typeof callAfter !== "function") {
      throw new Error("- if callback is being given (2nd Argument), then it must be of function type.");
      return;
    }
    else {
      var fileCount = filesArray.length,
          counter = 0;
      
      /* append js files to the body tag of the app */
      var bodyTag = document.getElementsByTagName("body")[0];

      function createFile() {
        var s = document.createElement("script");
        s.setAttribute("type", "text/javascript");
        s.setAttribute("src", filesArray[counter]);

        bodyTag.appendChild(s);

        s.onload = function() {
          iterationHandler();
        };

        s.onerror = function() {
          console.warn("!! - Javascript File Not Loaded -:");
          console.log("File Path: - " + filesArray[count]);
          iterationHandler();
        };

        function iterationHandler() {
          if(++counter < fileCount) {
            setTimeout(createFile, 10);
          }
          else {
            if(!!callAfter && typeof callAfter === "function") {
              callAfter();
            }
          }
        }
      }
      createFile();
    }
  }
  catch(thisErr) {
    console.error("Load Javascript Files Error");
    console.error(thisErr);
  }
}
