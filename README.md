offlinebookmarks
================

This is a lightweight system to maintain a list of web bookmarks, where all the URIs share the same structure. For instance, Twitter accounts:

```
https://twitter.com/smiffy
https://twitter.com/twitter
https://twitter.com/guardian
```

Archive pages of Tumblr accounts:

```
http://theeconomist.tumblr.com/archive
http://smarterplanet.tumblr.com/archive
http://newyorker.tumblr.com/archive
```

These URIs are all the same, barring a single element. This system is all about storing these elements and rendering them as an HTML page, without having to go through the tediour process of maintaining actual HTML.

The code for maintaining the list is designed to be run on a UNIX-like system (developed and tested under OSX,) with node.js installed. Merely reading the list should be possible on any system with a web browser, that supports JavaScript. It may be possible to adapt the list manager for other systems, such as Microsoft Windows.

## Files ##

### index.html ###

Bare-bones HTML page, which can be invoked through a browser using a ```file:///``` URI.

### makelist.js ###

JavaScript that renders the dynamic content of index.html

### data.js ###

Javascript array (generated) that holds the list of items to render.

### data.json ###

Configuration data (generated) for the listmanager. If this file does not exist, it will be created when first run.

### listmanager.js ###

node.js script to manage the list of files.

## listmanager.js syntax ##

```./listmanager.js arg1=xxxx arg2=yyyy ... argN=nnnn```

### Arguments ###

* title - set the page title.
* uristart - the first part of the URI, before the item.
* uriend - the last part of the URI, after the item.
* add - add this item
* remove - remove this item.

As a rule, title, uristart, and uriend would only need to be set once. Maintenance would then be a case of add, and remove.

If you want to set a title with spaces in it, they will need to be escaped, thus:

```./listmanager.js title=This\ Is\ My\ Title```

### Examples ###

Create the list of Twitter links, show above:

```./listmanager.js title=Twitter uristart=https://twitter.com/ add=smiffy add=twitter add=guardian```

Create the list of Tumbler links, shown above:

```./listmanager.js title=Tumblr uristart=http:// uriend=.tumblr.com/archive add=theeconomist add=smarterplanet add=newyorker```

## Dependencies ##

* node.js
