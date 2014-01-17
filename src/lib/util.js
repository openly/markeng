var fs = require('fs')
  , _ = require('underscore')
;

module.exports = {
  removeExternal: function(files){
    return _.filter(files, function(file){ return !(file.match(/^https?:\/\//) || file.match(/^\/\//)); })
  },
  removeInternal: function(files){
    return _.filter(files, function(file){ return (file.match(/^https?:\/\//) || file.match(/^\/\//)); })
  }
}