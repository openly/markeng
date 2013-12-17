var express = require('express')
  , program = require('commander')
  , config  = require('./config')
  , router  = require('./lib/router')
  ;

program
  .version('0.0.1')
  .option('-p, --port <port>','Application port')
  .option('-d, --dir <dir>','Markup Directory')
  .parse(process.argv);

var app = express();

config.init(program);
config.configureApp(app);

router.route(app);

console.log("Listening to " + (program.port || 3000))
app.listen(program.port || 3000);