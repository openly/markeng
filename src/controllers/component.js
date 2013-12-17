var ComponentRenderEngine = require('../lib/render/component');

var ComponentController = {
	"render": function(req,res,next){
		var renderEng = new ComponentRenderEngine(req.params.name);
		renderEng.renderTo(res, req.params, next);
	},
    list: function(req,res,next){
        
    }

}

module.exports = ComponentController;