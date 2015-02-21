if (!global.hasOwnProperty('db')) {
    // Database
    var mongoose = require('mongoose');
    mongoose.connect(process.env.MONGOLAB_URI);
    var db = mongoose.connection;

    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', function callback () {
        console.log('Successfully connected to the MongoDB!');
    });

    global.db = {
        User: require(__dirname+'/user.js'),
        ClientMessage: require(__dirname+'/clientmessage.js'),
        MainPageContent: require(__dirname+'/content/mainpagecontent.js')
    }
}
module.exports = global.db;
