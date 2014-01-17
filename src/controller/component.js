var config = require('../config')
  , MarkengComponent = require('../lib/component')
;

var ComponentController = {
    redirectToHome: function(req, res, next){ res.redirect('/p/' + config.home_page); },
    showComponent: function(req, res, next){ res.render('component', MarkengComponent.get(req.params.name).getRenderable() ); },
    list: function(req, res, next){ res.render('componentlist', { comps: MarkengComponent.allNames() }); }
}
module.exports = ComponentController;