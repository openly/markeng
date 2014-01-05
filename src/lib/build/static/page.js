var Util = require('../../util')
  , config = require('../../../config')
  , _ = require('underscore')
  , fs = require('fs')
  , hogan = require('hogan.js')
  , pageRender = require('../../page')
  , ResourceRender = require('../../resources/render')
;
var PageBuilder = function(){
  var assets, buildDir;
  this.build = function(theAssets, theBuildDir){
    assets = theAssets;
    buildDir = theBuildDir;

    var pages = Util.getAllPageNames();
    _.each(pages, createPage)
  }

  function createPage(pageName){
    var fileName = (config.home_page == pageName) ? 'index.html' : (pageName + '.html');
    console.log('Creating "' + fileName + '" for page "' + pageName + '".');

    var template = hogan.compile(fs.readFileSync(__dirname + '/../../../../views/page.html').toString());
    var pageCont = template.render({
      "stylesheets" : ResourceRender.renderCSS(assets.css), // execute functions later :)
      "scripts"     : ResourceRender.renderJS(assets.js),
      "title"       : getTitle(pageName),
      "main"        : getPageMarkup(pageName)
    });
    fs.writeFileSync(buildDir + '/' + fileName, pageCont);
  }

  function getTitle(pageName){
    return config.title + " :: " + pageName;
  }

  function getPageMarkup(pageName){
    return pageRender.renderPage(pageName);
  }
}

module.exports = new PageBuilder;