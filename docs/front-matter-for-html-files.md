# Front Matter
Front matter in jekyll is a piece of code that is located on the top section of a html document. Two sets of hyphens (3 nos in each set) located on top of a html document would contain YAML code is how front matter looks like in jekyll. The arabica boilerplate initializes each page with a predefined set of front matter that affects the meta details of every page layout. 

Below is a sample snippet, following which there is a description on some of the portions of the boilerplate that these affect:
```yaml
---
layout: default
title: Jekyll Arabica Boilerplate | Free Github Download
metaDescription: A really simple project that serves as a boilerplate for developers building front end websites with Jekyll.
metaKeywords: "jekyll, jekyll boilerplate, jekyll boilerplate template, jekyll development
environment, jekyll arabica boilerplate, jekyll lava, jekyll website builder, jekyll website examples, jekyll project, jekyll environment how to"
permalink: "/"
bodyClass: homePage
bodyId: homePage
jsfile: "home/index"
---
```
+ ```layout``` is a pre-existing jekyll yaml key that points to the type of html layout that the current page is using from the ```_layouts``` directory
+ ```title``` is a key being used to control the value of the ```<title></title>``` in the ```_includes/app-meta/index.html```
+ ```metaDescription``` is a key being used to control the value of ```<meta name="description"/>```
+ ```metaKeywords``` is a key being used to control the value of ```<meta name="keywords"/>```
+ ```permalink``` controls the route of a particular page. This is another pre-existing jekyll yaml key
+ ```bodyClass``` affects the class string value of ```<body></body>``` in the ```_layouts/default.html``` file
+ ```bodyId``` affects the id string value of ```<body></body>``` in the ```_layouts/default.html``` file
+ ```jsfile``` refers to the source of the javascript file for a particular page. In this example, the value ```"home/index"``` refers to a javascript file located in ```assets/js/home/index.js``` in the boilerplate

In order to ensure convenient use of Front Matter, the boillerplate has also placed some default front matter in the ```_config.yml``` file that is located in the root of the application. You can make changes to these as per your project requirements. In order to understand how default front matter works, I would recommend that you checkout [this tutorial](https://www.mikedane.com/static-site-generators/jekyll/front-matter-defaults/) and [this documentation](https://jekyllrb.com/docs/configuration/front-matter-defaults/). Below is the default front matter from the ```_config.yml``` file
```yaml
# Default Front Matter
defaults:
  -
    scope:
      path: ""
      type: "pages"
    values:
      layout: "default"
      title: "Jekyll Arabica Boilerplate | Free Github Download"
      metaDescription: "A really simple project that serves as a boilerplate for developers building front end websites with Jekyll."
      metaKeywords: "jekyll, jekyll boilerplate, jekyll boilerplate template, jekyll development environment, jekyll arabica boilerplate, jekyll lava, jekyll website builder, jekyll website examples, jekyll project, jekyll environment how to"
```

You may choose to add or remove YAML keys from this front matter section as per your project requirements. It is <b>recommended</b> that you checkout the ```_includes/app-meta/index.html``` and the ```_layouts/default.html``` files to get better clarity on this section.
