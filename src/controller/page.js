var config = require('../config')
  , MarkengPage = require('../lib/page')
;

var PageController = {
    redirectToHome: function(req, res, next){ res.redirect('/p/' + config.home_page); },
    showPage: function(req, res, next){ res.render('page', MarkengPage.get(req.params.name).getRenderable() ); },
    list: function(req, res, next){ res.render('pagelist', { pages: MarkengPage.allNames() }); }
}
module.exports = PageController;