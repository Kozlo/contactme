/*
 * Authentication-related configuration
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done){
        global.db.User.findOne({ 'name': username, 'password': password}, 'name password', function (err, user){
            if (err) { return done(err); }
            if (!user) {
                console.log('Incorrect password');
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                console.log('incorrect password');
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log('login successful');
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done){
    console.log('serializing user');
    done(null,user.name);
});

passport.deserializeUser(function(name, done) {
    console.log('deserializing user');
    global.db.User.findOne({ 'name': name}, function (err, user){
        done(err, user);
    });
});

app.post('/login',
    passport.authenticate('local', { successRedirect: '/admin',
        failureRedirect: '/auth'})
);