#!/usr/bin/env node

var fs = require('fs');
var data = {};
var cmdargs = {};

/*
 * List of acceptable argument names.
 */
var vargs = new Array('title', 'uristart', 'uriend', 'add', 'remove');

/* Define data file path. */
var fpath = './data.json';

/*
 * Look for data store, create if it does not exist.
 */
if (fs.existsSync(fpath)) {
  console.log('Reading configuration from ' + fpath);
  data = require(fpath);
} else {
  console.log('Data file ' + fpath + ' does not exist, creating.');
  data.title = 'Example List';
  data.uristart = 'https://example.com/';
  data.uriend = '';
  data.list = [];
  doSave();
}

/*
 * Process command line arguments.
 */
var arglist = process.argv.slice(2);
if (arglist.length < 1) {
  usage();
}
for (var i = 0; i < arglist.length; i++) {
  var re = /^\w+=/;
  if (!arglist[i].match(re)) {
    usage();
  }

  var splitidx = arglist[i].indexOf('=');
  var argname = arglist[i].substr(0, splitidx);
  var argval = arglist[i].substr(splitidx + 1);

  /* Unknown argument. */
  if (vargs.indexOf(argname) == -1) {
    usage();
  }
  
  var argidx = (i < 10 ? 'arg0' + i : 'arg' + i);
  cmdargs[argidx] = {};
  cmdargs[argidx].argname = argname;
  cmdargs[argidx].argval = argval;

}

/*
 * We should now have a (validated) array of
 * arguments. Iterate through and process them.
 */
for (var key in cmdargs) {

  var cmd = cmdargs[key];

  if (cmd['argname'] == 'title' || cmd['argname']== 'uristart' || cmd['argname'] == 'uriend') {
    data[cmd['argname']] = cmd['argval'];
  }
  if (cmd['argname'] == 'add') {
    var idx = data.list.indexOf(cmd['argval']);
    if (idx > -1) {
      console.log('Skipping adding ' + cmd['argval'] + ' - already exists.');
    } else {
      console.log('Saving ' + cmd['argval']);
      data.list.push(cmd['argval']);
      data.list.sort();
    }
  }
  if (cmd['argname'] == 'remove') {
    var idx = data.list.indexOf(cmd['argval']);
    if (idx > -1) {
      data.list.splice(idx, 1);
      console.log('Removing ' + cmd['argval']);
    } else {
      console.log('Skipping removing ' + cmd['argval'] + ' - does not exist.');
    }
  }
}

doSave();
process.exit(0);


/*
 * Usage statement.
 */
function usage() {
  console.log('Usage: listmanager.js arg1=foo arg2=bar ... argN=baz');
  console.log('Valid arguments: ' + vargs.join(', '));
  process.exit(-1);
}

/*
 * Write to data store.
 */
function doSave() {
  var json = JSON.stringify(data);
  /* Write config. */
  fs.writeFileSync(fpath, json);
  console.log('Writing config data to ' + fpath);
  /* Write JavaScript version for web page. */
  var js = "var data='" + json + "';";
  fs.writeFileSync('data.js', js);
}
