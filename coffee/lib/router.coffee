pageController      = require '../controller/page'
EventManager        = require './event_manager'
componentController = require '../controller/component'

Router =
  route: (app)->
    app.get('/'                    , pageController.redirectToHome      );

    app.get('/p/:name'             , pageController.showPage            );
    app.get('/page/:name'          , pageController.showPage            );
    app.get('/pages'               , pageController.list                );

    app.get('/c/:name'             , componentController.showComponent  );
    app.get('/component/:name'     , componentController.showComponent  );
    app.get('/components'          , componentController.list           );

    EventManager.raiseEvent 'global', 'route', {}, {app: app}, ()->


module.exports = Router;