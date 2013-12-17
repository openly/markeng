var ComponentController = require('../controllers/component');
  , PageController      = require('../controllers/page');

var Router = {
  route: function(app) {
    console.log("Routing...");
    app.get('/comp/:name',        ComponentController.render  );
    app.get('/comp/:name/:theme', ComponentController.render  );
    app.get('/',                  PageController.renderHome   );
    app.get('/pages',             PageController.list         );
    app.get('/components',        ComponentController.list    );
    app.get('/p/:name',           PageController.render       );
    app.get('/p/:name/:theme',    PageController.render       );
  }
}

module.exports = Router;