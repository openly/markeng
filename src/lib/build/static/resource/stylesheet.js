var ComponentResources = require('../../../resources/component')
  , GlobalResources = require('../../../resources/global')
  , Util = require('../../../util')
  , _ = require('underscore')
  , fs = require('fs')
  , csso = require('csso')
  ;


var CSSBuilder = function(){
  this.build = function(buildDir){
    var pages = Util.getAllPageNames()
      , components = Util.getAllComponentNames();

    ComponentResources.reset();
    _.each(pages, function(page){ ComponentResources.addForPage(page); })
    _.each(components, function(component){ ComponentResources.addForComponent(component); })

    var cssFiles = _.uniq(_.union(GlobalResources.getStyleSheets(),ComponentResources.getStyleSheets()));
    var externalCSS = Util.removeInternal(cssFiles);
    cssFiles = Util.removeExternal(cssFiles);
    cssFiles = Util.getFSPaths(cssFiles);

    var combinedFileName = 'css/main-' + (new Date()).toISOString() + '.css'
      , combinedFilePath = buildDir + '/' + combinedFileName;
    
    if(!fs.existsSync(buildDir+'/css/'))
      fs.mkdirSync(buildDir + '/css/');

    _.each(cssFiles,function(file){
      fs.appendFileSync(combinedFilePath, fs.readFileSync(file));
    })

    var newCss = csso.justDoIt(fs.readFileSync(combinedFilePath).toString())
    newCss = csso.justDoIt(newCss); // Two pass :)

    fs.writeFileSync(combinedFilePath, newCss); 

    externalCSS.push(combinedFileName);
    return externalCSS;
  }
}

module.exports = new CSSBuilder;