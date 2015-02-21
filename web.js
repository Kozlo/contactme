// Modules
var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    app = express(),
    passport = require('passport'),
    exphbs = require('express-handlebars');

// body parser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Components
app.use("/public", express.static(__dirname + '/public'));
app.use("/bower_components", express.static(__dirname + '/bower_components'));

// Needed for login
app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening on port: ' + port);
});