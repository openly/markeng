var JSBuilder = require('./javascript')
  , CSSBuilder = require('./stylesheet')
  , ImagesBuilder = require('./images')
  , MiscBuilder = require('./misc')
  ;

var ResourceBuilder = {
    build: function(buildDir){
      var jsFiles = JSBuilder.build(buildDir)
        , cssFiles = CSSBuilder.build(buildDir);
      ImagesBuilder.build(buildDir);
      MiscBuilder.build(buildDir);
      return {js: jsFiles, css: cssFiles};
    }
}

module.exports = ResourceBuilder;