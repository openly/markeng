var config = require('../config')
, less = require('less')
, path = require('path')
, FSManager = require('../lib/fs_manager')
;

var LessCompileController = {
  compile: function(req, res, next){
    res.setHeader('Content-Type', 'text/css');
    var lessCode = FSManager.readFile(req.params.file.replace(/\.css?$/,'.less'));

    console.log("Parsing: " + req.params.file.replace(/\.css?$/,'.less'))

    var parser = new(less.Parser)({
      paths: [path.dirname(config.dir + '/' + req.params.file)],
      filename: req.params.file.replace(/\.css?$/,'.less')
    });
    process.on('uncaughtException', onError);
    parser.parse(lessCode, function (e, tree) {
      process.removeListener('uncaughtException', onError);
      if(e){
        onError(e)
        return;
      }
      try{
        res.end(tree.toCSS({
          compress: true
        }));
      } catch(e){ onError(e); }
    });

    function onError(e) {
      res.end(
        'body:before{'+
          'content:"' + e.message + ' - in ' + e.filename + ' - Line: ' + e.line + '" ;' +
          'position: fixed;' +
          'bottom: 0;' +
          'left: 0;' +
          'width:100%;' +
          'min-height: 30px;' +
          'background-color: #faa;' +
          'z-index: 10000;' +
          'font-weight: bold;' +
          'text-align: center;' +
        '}'
      );
    }

  }
}
module.exports = LessCompileController;