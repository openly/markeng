var _ = require('underscore')
  , fs = require('fs')
  , express = require('express')
  ;

var Config = {
  init: function(program){
    var conf = this;

    conf.dir = program.dir || process.cwd();
    conf.outputDir = program.output || (conf.dir + '/build');
    conf.build_tool = program.tool || 'static';

    if(!fs.existsSync(this.dir + '/markeng.json')){
      console.log( "ERROR: Not a valid directory."+
        " Please run the application inside a markeng Directory,"+
        " or pass the directory through the command line switch -d" );
      process.exit();
    }

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