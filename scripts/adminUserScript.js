var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//
mongoose.connect(process.env.DB_NAME);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Successfully connected to the DB!');
});

var userSchema = mongoose.Schema({
    name: String,
    password: String
});

var User = mongoose.model('User', userSchema);

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
    console.log(admin.name)
    console.log(admin.password)

    admin.save(function (err, admin) {
        if (err) return console.error(err);
        console.log('User ' + admin.name + ' saved successfully!');
        console.log('exiting');
        process.exit();
    });
}