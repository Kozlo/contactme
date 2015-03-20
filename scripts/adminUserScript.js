var mongoose = require('mongoose'),
    User = require('../models/user.js');

mongoose.connect(process.env.MONGOLAB_URI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Successfully connected to the DB!');
});

User.find({ name: /^Admin/ }, function (err, user) {
    if (err) return console.error(err);
    if (user.length > 0) {
        console.log('found admin, so no need to run the script again.. exiting');
        process.exit();
    } else {
        createNewAdmin();
    }
});
function createNewAdmin() {

    var admin = new User({ name: 'Admin', password: 'Admin' })
    // password is encrypted automatically by bcrypt
    admin.save(function (err, admin) {
        if (err) return console.error(err);
        console.log('User ' + admin.name + ' saved successfully!');
        console.log('exiting');
        process.exit();
    });
}