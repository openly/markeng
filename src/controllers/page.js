var PageRenderEngine = require('../lib/render/page');

var PageController = {
    "render": function(req,res,next){
        var renderEng = new PageRenderEngine(req.params.name);
        renderEng.renderTo(res, req.params, next);
    },
    list: function(req,res,next){
        
    }

}

module.exports = PageController;