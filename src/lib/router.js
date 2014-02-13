var pageController = require('../controller/page')
  , compController = require('../controller/component')
  , lessController = require('../controller/less')
;

var Router = {
    route: function(app){
        app.get('/', pageController.redirectToHome);
        app.get('/p/:name', pageController.showPage);
        app.get('/pages', pageController.list);
        app.get('/comp/:name', compController.showComponent);
        app.get('/comps', compController.list);
        app.get('/compile-less/*:file', lessController.compile);
    }
}

module.exports = Router;