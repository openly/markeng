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

ResourceBuilder.build = function(dir, version, dirnames) {
  buildDir = dir;
  var allComps = MarkengComponent.all()
  , allPages = MarkengPage.all();

  var builtCss = ResourceBuilder.buildCss(allComps, allPages, dir, version, dirnames);
  var builtJs = ResourceBuilder.buildJs(allComps, allPages, dir, version, dirnames);
  ResourceBuilder.buildOtherAssets(allComps, allPages, dir, version);

  return {css: builtCss, js: builtJs}

}

ResourceBuilder.buildCss = function(comps, pages, dir, version, dirnames){
  var compCss = _.flatten(_.map(comps, function(comp){ 
    return comp.getComponentCSS();
  }));

  var pageCss = _.flatten(_.map(pages, function(page){ 
    return page.getPageCSS();
  }));

  var allCss = _.union(Assets.globalCSS(), pageCss, compCss);

  var localCss = util.removeExternal(allCss);
  var externalCss = util.removeInternal(allCss);

  var combined = combineAndMinifyCSS(localCss, dir, version, dirnames);

  externalCss.push(combined);

  return externalCss;
}

ResourceBuilder.buildJs = function(comps, pages, dir, version, dirnames){
  var compJs = _.flatten(_.map(comps, function(comp){ 
    return comp.getComponentJS();
  }));

  var pageJs = _.flatten(_.map(pages, function(page){ 
    return page.getPageJS();
  }));

  var allJs = _.union(Assets.globalJS(), pageJs, compJs);

  var localJs = util.removeExternal(allJs);
  var externalJs = util.removeInternal(allJs);

  var combined = combineAndMinifyJS(localJs, dir, version, dirnames);

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

function combineAndMinifyJS(files, dir, version, dirnames){
  var jsDirname = _.isObject(dirnames) ? dirnames.js : "js";
  FSManager.createRecursiveDirs(dir, jsDirname);

  var combinedFileName = jsDirname + '/main.v' + version + '.js';
  var combinedMinFileName = jsDirname + '/main.v' + version + '.min.js';
  var combinedFile = path.normalize(dir + '/' + combinedFileName);
  var combinedMinFile = path.normalize(dir + '/' + combinedMinFileName);

  FSManager.append(combinedFile, "// Created by Markeng\n");

  _.each(files, function(file){
    FSManager.append(combinedFile, "\n/* Source: " + file + " */\n" + FSManager.readFile(file) + ";\n");
  });

  var res = UglifyJS.minify(combinedFile);
  FSManager.writeFile(combinedFile, res.code);
  return combinedMinFileName;
}

function combineAndMinifyCSS(files, dir, version, dirnames){
  var cssDirname = _.isObject(dirnames) ? dirnames.css : "css";

  FSManager.createRecursiveDirs(dir, cssDirname);

  var combinedFileName = cssDirname + '/main.v' + version + '.css';
  var combinedMinFileName = cssDirname + '/main.v' + version + '.min.css';
  var combinedFile = path.normalize(dir + '/' + combinedFileName);
  var combinedMinFile = path.normalize(dir + '/' + combinedMinFileName);

  var css = "";

  _.each(files, function(file){
    css += "/* Source: " + file + " */\n" + FSManager.readFile(file) + "\n";
  });
  css = css.replace(/\/static/g,'..'); // Static assets. Reset them :)
  FSManager.writeFile(combinedFile, css);

  css = csso.justDoIt(css);
  css = csso.justDoIt(css); // Two pass
  FSManager.writeFile(combinedMinFile, css);

  return combinedMinFileName;

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