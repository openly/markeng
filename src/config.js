var _ = require('underscore')
  , fs = require('fs')
  , express = require('express')
  ;

var Config = {
  init: function(program){
    var conf = this;

    conf.dir = program.dir || process.cwd();
    var jsonCont = fs.readFileSync(this.dir + '/markeng.json');
    var config = JSON.parse(jsonCont);
    _.each(config,function(val,key){
      conf[key] = val;
    });
  },

  configureApp: function(app){
    app.set('views', __dirname + '/../views');
    app.engine('html', require('hogan-express'));
    app.set('view engine', 'html');

    app.use('/static',express.static(this.dir));
  }
}

module.exports = Config;