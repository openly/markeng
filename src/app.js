var express = require('express')
  , program = require('commander')
  , config  = require('./config')
  , router  = require('./lib/router')
  , builder = require('./lib/build')
  , l2css = require('./lib/l2css')
;

program
  .version('0.0.1')
  .option('-b, --build','Build the markup')
  .option('-l, --l2css','Build all less files')
  .option('-t, --tool <tool>','Build the markup')
  .option('-o, --output <output>','Build the markup')
  .option('-p, --port <port>','Application port')
  .option('-d, --dir <dir>','Markup Directory')
  .parse(process.argv);

if(program.build){
  config.init(program);
  builder.build();
}else if(program.l2css){
  config.init(program);
  l2css.compileAll();
}else{
  var app = express();
  config.init(program);
  config.configureApp(app);

  router.route(app);

  console.log("\nMarkeng running.\nDirectory: " + config.dir + 
                                "\nPort:      " + (program.port || 3000));
  app.listen(program.port || 3000);
}