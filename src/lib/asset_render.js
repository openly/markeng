// Generated by CoffeeScript 1.7.1
var AssetRender;

module.exports = AssetRender = {
  css: function(cssFiles) {
    var cssFile, cssLines;
    cssLines = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = cssFiles.length; _i < _len; _i++) {
        cssFile = cssFiles[_i];
        _results.push("<link rel='stylesheet' href='" + cssFile + "'>");
      }
      return _results;
    })();
    return cssLines.join("\n");
  },
  js: function(jsFiles) {
    var jsFile, jsLines;
    jsLines = (function() {
      var _i, _len, _results;
      _results = [];
      for (_i = 0, _len = jsFiles.length; _i < _len; _i++) {
        jsFile = jsFiles[_i];
        _results.push("<script type='text/javascript' src='" + jsFile + "'></script>");
      }
      return _results;
    })();
    return jsLines.join("\n");
  }
};
