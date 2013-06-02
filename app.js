
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path')
  , app = express()
  , allowCrossDomain = function(req, res, next){
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With');
      next();
    }
  , handleOptionsMethod = function(req, res, next){
      if( req.method == 'OPTIONS'){
        return res.send(200);
      }
      next();
    };

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  // for cors
  app.use(allowCrossDomain);
  app.use(handleOptionsMethod);
});

// app.configure('development', function(){
//   app.use(express.errorHandler());
// });

// router here
app.get('/', routes.index);
app.get('/top100', routes.top100);
app.get('/exam', routes.exam);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
