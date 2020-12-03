const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
  app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
  app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
  app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
  app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
  app.get('/logout', mid.requiresLogin, controllers.Account.logout);
  app.get('/profile', mid.requiresSecure, mid.requiresLogin, controllers.Profile.profilePage);
  app.get('/getPieces', mid.requiresSecure, mid.requiresLogin, controllers.Profile.getPieces);
  app.get('/getAccInfo', mid.requiresSecure, mid.requiresLogin, controllers.Account.getAccInfo);
  app.get('/upload', mid.requiresSecure, mid.requiresLogin, controllers.Upload.uploadPage);
  app.post('/upload', mid.requiresSecure, mid.requiresLogin, controllers.Upload.make);
  app.get('/search', mid.requiresSecure, mid.requiresLogin, controllers.Search.searchPage);
  app.get('/search', mid.requiresSecure, mid.requiresLogin, controllers.Search.search);
  app.post('/subscribe', mid.requiresSecure, mid.requiresLogin, controllers.Account.subscribe);
  app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;
