var mongoose = require('mongoose'),
    User = require('../models/user.js');

mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Successfully connected to the DB!');
});

User.findOne({ 'name': 'Admin'}, 'name password', function (err, user){
    if (err) return console.error(err);
    if (!user) {
        console.log('Incorrect password.');
        res.json({success:0,error:"Incorrect user/password."});
        return;
    }
    console.log('Current user, password', user.name, user.password);
    // res-save the default password to be encrypted
    user.password = 'Admin1';
    user.save(function(err) {
        if (err) throw err;
        console.log('Successfully updated password ' + user.password + ' for: ' + user.name );
        process.exit();
    });
});