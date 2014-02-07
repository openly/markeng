var config = require('../config')
  , MarkengComponent = require('../lib/component')
;

var ComponentController = {
    showComponent: function(req, res, next){ 
        if(req.query.ajax){
            MarkengComponent.reset();
            var renderable = MarkengComponent.get(req.params.name).getRenderable();
            res.end( renderable.main + renderable.stylesheets() );
        }
        else{
            MarkengComponent.reset();
            res.render('component', MarkengComponent.get(req.params.name).getRenderable() ); 
        }
    },
    list: function(req, res, next){ res.render('componentlist', { comps: MarkengComponent.allNames() }); }
}
module.exports = ComponentController;