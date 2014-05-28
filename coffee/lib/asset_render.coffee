module.exports = AssetRender = 
  css: (cssFiles)->
    cssLines = ("<link rel='stylesheet' href='#{cssFile}'>" for cssFile in cssFiles)
    cssLines.join("\n");
  js: (jsFiles)->
    jsLines = ("<script type='text/javascript' src='#{jsFile}'></script>" for jsFile in jsFiles)
    jsLines.join("\n");