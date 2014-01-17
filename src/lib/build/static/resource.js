var MarkengComponent = require('../../component')
  , MarkengPage = require('../../page')
  , FSManager = require('../../fs_manager')
  , Assets = require('../../assets')
  , util = require('../../util')
  , path = require('path')
  , csso = require('csso')
  , UglifyJS = require("uglify-js")
  , _ = require("underscore")
  , buildDir
;

var ResourceBuilder={};

ResourceBuilder.build = function(dir, version) {
  buildDir = dir;
  var allComps = MarkengComponent.all()
  , allPages = MarkengPage.all();

  var builtCss = ResourceBuilder.buildCss(allComps, allPages, dir, version);
  var builtJs = ResourceBuilder.buildJs(allComps, allPages, dir, version);
  ResourceBuilder.buildOtherAssets(allComps, allPages, dir, version);

  return {css: builtCss, js: builtJs}

}

ResourceBuilder.buildCss = function(comps, pages, dir, version){
  var compCss = _.flatten(_.map(comps, function(comp){ 
    return comp.getComponentCSS();
  }));

  var pageCss = _.flatten(_.map(pages, function(page){ 
    return page.getPageCSS();
  }));

  var allCss = _.union(Assets.globalCSS(), pageCss, compCss);

  var localCss = util.removeExternal(allCss);
  var externalCss = util.removeInternal(allCss);

  var combined = combineAndMinifyCSS(localCss, dir, version);

  externalCss.push(combined);

  return externalCss;
}

ResourceBuilder.buildJs = function(comps, pages, dir, version){
  var compJs = _.flatten(_.map(comps, function(comp){ 
    return comp.getComponentJS();
  }));

  var pageJs = _.flatten(_.map(pages, function(page){ 
    return page.getPageJS();
  }));

  var allJs = _.union(Assets.globalJS(), pageJs, compJs);

  var localJs = util.removeExternal(allJs);
  var externalJs = util.removeInternal(allJs);

  var combined = combineAndMinifyJS(localJs, dir, version);

  externalJs.push(combined);

  return externalJs;
}

ResourceBuilder.buildOtherAssets = function(comps, pages, dir, version){
  _.each(Assets.globalOtherAssets(), copyAsset)

  _.each(comps, function(comp){
    _.each(comp.getOtherAssets(), function(item,name){ copyAsset(item,name, comp.componentRelDir()); });
  })

  _.each(pages, function(page){
    _.each(page.getOtherAssets(),  function(item, name){ copyAsset(item, name, page.pageRelDir()); })
  })
}

function combineAndMinifyJS(files, dir, version){
  FSManager.createRecursiveDirs(dir, 'js');

  var combinedFileName = 'js/main.v' + version + '.js';
  var combinedFile = path.normalize(dir + '/' + combinedFileName);

  _.each(files, function(file){
    FSManager.append(combinedFile, FSManager.readFile(file) + ";\n");
  });

  var res = UglifyJS.minify(combinedFile);
  FSManager.writeFile(combinedFile, res.code);
  return combinedFileName;
}

function combineAndMinifyCSS(files, dir, version){
  FSManager.createRecursiveDirs(dir, 'css');

  var combinedFileName = 'css/main.v' + version + '.css';
  var combinedFile = path.normalize(dir + '/' + combinedFileName);

  var css = "";

  _.each(files, function(file){
    css += FSManager.readFile(file) + "\n";
  });

  css = csso.justDoIt(css);
  css = csso.justDoIt(css); // Two pass

  FSManager.writeFile(combinedFile, css);

  return combinedFileName;

}

function copyAsset(asset, name, dirToSearch){
  if(!_.isString(dirToSearch)) dirToSearch = '';
  if(_.isObject(asset)){
    FSManager.createRecursiveDirs(buildDir, name);
    FSManager.cpr(dirToSearch + name, buildDir + '/' + name);
  }else{
    FSManager.cp(dirToSearch + name, buildDir + '/' + name);
  }
}

module.exports = ResourceBuilder;