// Generated by CoffeeScript 1.7.1
var Config, EventManager, express, fs, path, _;

_ = require('underscore');

fs = require('fs');

express = require('express');

path = require('path');

EventManager = require('./lib/event_manager');

Config = {
  init: function(program) {
    var conf, config, jsonCont;
    conf = this;
    conf.dir = program.dir || process.cwd();
    if (!/^\//.test(conf.dir)) {
      conf.dir = path.resolve(process.cwd(), conf.dir);
    }
    conf.build_dir = program.output || (conf.dir + '/build');
    conf.build_tool = program.tool || 'static';
    if (!fs.existsSync(this.dir + '/markeng.json')) {
      console.log("ERROR: Not a valid directory." + " Please run the application inside a markeng Directory," + " or pass the directory through the command line switch -d");
      process.exit();
    }
    jsonCont = fs.readFileSync(this.dir + '/markeng.json');
    config = JSON.parse(jsonCont);
    _.each(config, function(val, key) {
      return conf[key] = val;
    });
    return EventManager.raiseEvent('global', 'config_complete', {}, {
      config: config
    }, function() {});
  },
  configureApp: function(app) {
    app.set('views', __dirname + '/../views');
    app.engine('html', require('hogan-express'));
    app.set('view engine', 'html');
    return app.use('/static', express["static"](this.dir));
  }
};

module.exports = Config;
