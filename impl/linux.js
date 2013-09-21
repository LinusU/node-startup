
var fs = require('fs');
var exec = require('child_process').exec;

module.exports = function (cfg, cb) {

  var path = '/etc/init.d/node-' + cfg.name;
  var init = fs.readFileSync(__dirname + '/../data/linux-init', { encoding: 'utf8' });
  var out = [
    '#!/bin/sh',
    '',
    'NODE_STARTUP_APP="' + cfg.app + '"',
    'NODE_STARTUP_DIR="' + cfg.dir + '"',
    'NODE_STARTUP_ENV="' + cfg.env + '"',
    'NODE_STARTUP_NAME="' + cfg.name + '"',
    'NODE_STARTUP_EXEC="' + cfg.exec + '"',
    '',
    init
  ].join('\n');

  fs.writeFileSync(path, out);
  fs.chmodSync(path, 0755);

  exec('update-rc.d node-' + cfg.name + ' defaults', function (err) {
    cb(err);
  });

};
