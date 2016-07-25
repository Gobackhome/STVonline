/**
 * Created by Binh Yen on 7/12/2016.
 * Tương tự như Cart, thực hiện sưu tầm playlist application server using Express and connecting to MongoDB
 */
var express = require('express'),
    engine = require('ejs-locals');
var favicon = require('serve-favicon');
var path = require('path');

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/playlist');

require('./models/post_model');
require('./models/users_model');

var app = express();

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.engine('.html',require('ejs').__express);
app.engine('ejs', engine);
app.set('views', __dirname + '/views');
//app.set('view engine','html');
app.set('view engine', 'ejs');

app.use(bodyParser());
app.use(cookieParser());
app.use(expressSession({
    secret: 'SECRET',
    cookie: {
        maxAge: 60 * 60 * 1000
    },
    store: new MongoStore({
        saveUninitialized: true,
        resave: true,
        mongooseConnection: db.connection,
        //collection: 'sessions'
    })
}));
require('./routes/routes')(app);
app.listen(80);
module.exports = app;