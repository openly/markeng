var config = require('../config')
  , fs = require('fs')
  , fse = require('fs.extra')
  , path = require('path')
  , _ = require('underscore')
;

var FSManager = {
  getDirContents: function(dir, includes, excludes){
    var dirPath = path.normalize(config.dir + '/' + dir);
    
    if(!fs.existsSync(dirPath)) return [];

    var contents = fs.readdirSync(dirPath);
    if(typeof includes != 'undefined' && includes != null){
      contents = include(contents, includes);
    }
    if(typeof excludes != 'undefined' && excludes != null){
      contents = exclude(contents, excludes);
    }
    return contents;
  },

  getDirContentsRecursive: function(dir, includes, excludes){
    var contents = FSManager.getDirContents(dir, includes, excludes);
    var subDirs = _.map(contents, function(content){
      if(fs.statSync(path.normalize(config.dir + '/' + dir + '/' + content)).isDirectory())
        return FSManager.getDirContentsRecursive(dir + '/' + content);
      else
        return undefined;
    });
    return _.object(contents, subDirs);
  },

  createRecursiveDirs: function(basePath, dirPath){
    var splitDirs = dirPath.split(/\//)
      , nextDir = path.normalize(basePath + '/' + splitDirs.shift());
    
    if(!fs.existsSync(nextDir)){
      fs.mkdirSync(nextDir);
    }

    if(splitDirs.length >= 1)
      FSManager.createRecursiveDirs(nextDir, splitDirs.join('/'));
  },

  exists: function(file){
    return fs.existsSync(path.normalize(config.dir + '/' + file));
  },
  readFile: function(file){
    return fs.readFileSync(path.normalize(config.dir + '/' + file)).toString();
  },

  writeFile: function(file, contents){
    fs.writeFileSync(path.normalize(file), contents);
  },

  append: function(file, contents){
    fs.appendFileSync(path.normalize(file), contents);
  },

  rmrf: function(dir){
    fse.rmrfSync(dir);
  },
  cp: function(src, dest){
    fs.createReadStream(path.normalize(config.dir + '/' + src)).pipe(fs.createWriteStream(path.normalize(dest)));
  },
  cpr: function(src, dest){
    fse.copyRecursive(path.normalize(config.dir + '/' +src), path.normalize(dest), function(){});
  }
}

function include(contents, includes){
  var filtered = [];
  if(_.isArray(includes)){
    _.each(includes, function(includeRule){
      filtered = _.union(filtered, include(contents, includeRule));
    })
  }else{
      if(includes instanceof RegExp)
        filtered = _.filter(contents,function(content){ return includes.test(content); });
      else
        filtered = _.filter(contents,function(content){ return includes == content; });
  }
  return filtered;
}

function exclude(contents, excludes){
  var toExclude = include(contents, excludes);
  return _.difference(contents, toExclude);
}

module.exports = FSManager;