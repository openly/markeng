express      = require 'express'
program      = require 'commander'
config       = require './config'
router       = require './lib/router'
builder      = require './lib/build'
pJson        = require '../package.json'
pluginLoader = require './lib/plugin_loader'
EventManager = require './lib/event_manager'

program.version(pJson.version)
  .option('-b, --build','Build the markup')
  .option('-t, --tool <tool>','Build the markup')
  .option('-o, --output <output>','Output folder for build')
  .option('-p, --port <port>','Application port')
  .option('-d, --dir <dir>','Markeng Root Directory')
  .parse(process.argv);
  
config.init(program);

if(program.build)
  builder.build();
else
  app = express();
  config.configureApp(app);
  
  pluginLoader.load()

  router.route(app);

  console.log("\nMarkeng running.\nDirectory: " + config.dir + 
                                "\nPort:      " + (program.port || 3000));
  console.log("\nMarkeng URL: http://localhost:#{(program.port || 3000)}/pages \n\n")

  server = require('http').createServer app

  EventManager.raiseEvent 'global', 'start', {}, {app: app, server: server}, ()->
    server.listen(program.port || 3000);
