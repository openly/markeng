var express = require('express')
  , program = require('commander')
  , config  = require('./config')
  , router  = require('./lib/router')
  , builder = require('./lib/build')
;

program
  .version('0.0.1')
  .option('-b, --build','Build the markup')
  .option('-t, --tool <tool>','Build the markup')
  .option('-o, --output <output>','Build the markup')
  .option('-p, --port <port>','Application port')
  .option('-d, --dir <dir>','Markup Directory')
  .parse(process.argv);

if(program.build){
  config.init(program);
  builder.build();
}else{
  var app = express();
  config.init(program);
  config.configureApp(app);

  router.route(app);

  console.log("Listening to " + (program.port || 3000))
  app.listen(program.port || 3000);
}