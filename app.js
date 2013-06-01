/**
 *  Tutorial
 *
 *  update
 *    support cors
 *
 *  Step1. install nodejs & npm (download: http://nodejs.org/download/)
 *
 *  Step2. install express (http://expressjs.com/)
 *         $ sudo npm install express -g
 *
 *  Step3. $ node app
 *         default port is 3000
 *         default root is this file(app.js) path
 *
 *         if you want to change port or root folder you can follow this format
 *         $ node app [YOUR_PORT] [YOUR_ROOT (base on app.js file path)] or
 *         $ node app [YOUR_ROOT (base on app.js file path)] [YOUR_PORT]
 *
 *         SAMPLE: $ node app 8080 www
 *                 $ node app www 8080
 *         server will start on port 8080 and root folder is 'www'
 *
 *         SAMPLE2 $ node app 8080
 *         server will start on port 8080 and root folder is '/'
 *
 *         SAMPLE3 $ node app www
 *         server will start on port 3000 and root folder is 'www'
 */

var express = require('/usr/local/lib/node_modules/express') //mac default npm path
    , http = require('http')
    , path = require('path')
    , myFolder = '/'
    , myPort = 3000
    , myPath = __dirname + '/'+myFolder
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

if(process.argv.length > 2){
    if(!isNaN(process.argv[2])){
        myPort = process.argv[2];
    }else{
        myFolder = process.argv[2];
    }
}

if(process.argv.length > 3){
    if(!isNaN(process.argv[3])){
        myPort = process.argv[3];
    }else{
        myFolder = process.argv[3];
    }
}

app.configure(function(){
    app.set('port', process.env.PORT || myPort);
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.static(path.join(__dirname, myFolder)));
    app.use(express.directory( myPath));

    // for cors
    app.use(allowCrossDomain);
    app.use(handleOptionsMethod);
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port')+" root folder is '"+myPath+"'");
});