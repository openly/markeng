var PageRenderEngine = require('../lib/render/page')
  , config = require('../config')
;

var PageController = {
  "render": function(req,res,next){
    var renderEng = new PageRenderEngine(req.params.name);
    renderEng.renderTo(res, req.params, next);
  },

  redirectToHome:function(req, res, next){
    res.redirect('/p/' + config.home_page)
  },

  list: function(req,res,next){
    
  }
}

module.exports = PageController;