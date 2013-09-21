#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;

var impl = null;

switch(os.type()) {
  case 'Linux':
    impl = require('./impl/linux.js');
    break;
  default:
    throw new Error('Your OS is currently not supported by node-startup.');
}

if(process.argv[2]) {

  var file = fs.realpathSync(process.argv[2]);
  var data = fs.readFileSync(file, { encoding: 'utf8' });
  var info = JSON.parse(data);

  exec('which node', function (err, out) {
    if(err) { throw err; }

    var cfg = {
      app: (info.main || 'index.js'),
      dir: path.dirname(file),
      env: 'production',
      name: info.name,
      exec: out.toString().trim()
    };

    if(!cfg.name) { throw new Error('Name missing from package.json'); }
    if(!cfg.exec) { throw new Error('Cannot locate node binary'); }

    impl(cfg, function (err) {
      if(err) { throw err; }
      console.log('Success!');
    });

  });

} else {
  console.log('Usage: node-startup /path/to/package.json');
}
