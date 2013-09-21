
var os = require('os');
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

if(process.argv[1]) {

  var dir = path.dirname(process.argv[1]);
  var data = fs.readFileSync(process.argv[1], { encoding: 'utf8' });
  var info = JSON.prase(data);

  exec('which node', function (err, out) {
    if(err) { throw err; }

    var cfg = {
      app: (info.main || 'index.js'),
      dir: dir,
      env: 'production',
      name: info.name,
      exec: out.toString()
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
