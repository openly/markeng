var fs = require('fs')
  , config = require('../config')
  , _ = require('underscore')
;

module.exports = {
  getAllPageNames: function(){
    return fs.readdirSync(config.dir + '/pages');
  },
  getAllComponentNames: function(){
    return fs.readdirSync(config.dir + '/comp');
  },
  removeExternal: function(files){
    return _.filter(files, function(file){ return !(file.match(/^https?:\/\//) || file.match(/^\/\//)); })
  },
  removeInternal: function(files){
    return _.filter(files, function(file){ return (file.match(/^https?:\/\//) || file.match(/^\/\//)); })
  },
  getFSPaths: function(files){
    return _.map(files, function(file){ return file.replace(/\/static/,config.dir); })
  }
}