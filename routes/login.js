/*
 * Authentication-related configuration
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done){
        global.db.User.findOne({ 'name': username}, 'name password', function (err, user){
            if (err) { return done(err); }
            if (!user) {
                console.log('Incorrect user/password.');
                return done(null, false, { message: 'Incorrect user/password.' });
            }
            // check if the entered password is correct (with bcrypt's function)
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                    if (isMatch) {
                        console.log('login successful');
                        return done(null, user);
                    } else {
                        return done(null, false, { message: 'Incorrect user/password.' });
                    }
            });
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

app.post('/change_password', function(req,res){
    var oldPassword = req.body.oldPassword,
        newPassword1 = req.body.newPassword1,
        newPassword2 = req.body.newPassword2;

    if (!oldPassword || !newPassword1 || !newPassword2) {
        res.json({success:0,error:"Not all mandatory fields have been filled in."});
        return;
    }

    if (newPassword1 != newPassword2) {
        res.json({success:0,error:"Entered passwords do not match."});
        return;
    }

    global.db.User.findOne({ 'name': 'Admin'}, 'name password', function (err, user){
        if (err) return console.error(err);
        if (!user) {
            console.log('Incorrect password.');
            res.json({success:0,error:"Incorrect user/password."});
            return;
        }
        user.comparePassword(oldPassword, function(err, isMatch) {
            if (err) throw err;
            console.log(oldPassword, isMatch); // -> password: true/false

            if (isMatch) {
                // check if the new password is not the same as the old one
                if (oldPassword === newPassword1) {
                    res.json({success:0,error:"Old password matched the new one."});
                    return;
                }
                console.log('User exists and the password is correct. Proceeding with password change...');
                user.password = newPassword1;
                user.save(function(err) {
                    if (err) throw err;
                    console.log('Successfully updated password for: ' + user.name );
                    res.json({success:1});
                });
            } else {
                res.json({success:0,error:"Incorrect user/password."});
                return;
            }
        });
    });
});