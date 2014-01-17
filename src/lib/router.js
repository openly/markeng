var pageController = require('../controller/page')
  , compController = require('../controller/component')

var Router = {
    route: function(app){
        app.get('/', pageController.redirectToHome);
        app.get('/p/:name', pageController.showPage);
        app.get('/pages', pageController.list);
        app.get('/comp/:name', compController.showComponent);
        app.get('/comps', compController.list);
    }
}

module.exports = Router;