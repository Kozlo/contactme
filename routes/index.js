/*
 * GET home page, client-side pages, and admin pages.
 */

var functions = require('./functions'),
    db = require('../models');

app = require('../server');

// home page
app.get('/', function(req,res) {
    global.db.MainPageContent.find({}, function(err, content){
        if (err) return console.error(err);
        console.log('Main page content retrieved successfully. Rendering index page...');
        functions.createTextHtml(content[0].pageText, function(newText) {
            content[0].pageText = newText;
            res.render('index', { content: content[0] });
        });
    });
});

app.get('/logout', function(req,res){
    req.logout();
    res.redirect('/');
});

app.get('/auth', function(req,res){
    res.render('auth', { admin: true });
});

// admin pages
app.get('/admin', functions.loggedIn, function(req,res){
    res.render('admin', { admin: true, adminPage: true });
});

app.get('/messages', functions.loggedIn, function(req,res){
    res.render('messages', { admin: true, messages: true });
});


// rotues for content-related operations
require('./content');
// rotues for operation-related operations
require('./operations');
// passport configuration
require('./login');