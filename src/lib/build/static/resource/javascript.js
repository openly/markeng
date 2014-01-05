var ComponentResources = require('../../../resources/component')
  , GlobalResources = require('../../../resources/global')
  , Util = require('../../../util')
  , _ = require('underscore')
  , fs = require('fs')
  , UglifyJS = require("uglify-js")
  ;
i=0;
var JSBuilder = function(){
  this.build = function(buildDir){
    var pages = Util.getAllPageNames()
      , components = Util.getAllComponentNames();

    ComponentResources.reset();
    _.each(pages, function(page){ ComponentResources.addForPage(page); })
    _.each(components, function(component){ ComponentResources.addForComponent(component); })

    var jsFiles = _.uniq(_.union(GlobalResources.getJavascript(),ComponentResources.getJavascript()));
    var externalJs = Util.removeInternal(jsFiles);
    jsFiles = Util.removeExternal(jsFiles);
    jsFiles = Util.getFSPaths(jsFiles);

    var combinedFileName = 'js/main-' + (new Date()).toISOString() + '.js'
      , combinedFilePath = buildDir + '/' + combinedFileName;
    
    if(!fs.existsSync(buildDir + '/js/')){
      fs.mkdirSync(buildDir + '/js/');
    }

    _.each(jsFiles,function(file){
      fs.appendFileSync(combinedFilePath,fs.readFileSync(file).toString() + ";\n");
    })

    // var res = UglifyJS.minify(combinedFilePath);
    // fs.writeFileSync(combinedFilePath, res.code);

    externalJs.push(combinedFileName);
    return externalJs;
  }
}

module.exports = new JSBuilder;