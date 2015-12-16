var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/contactme-dev');

var mainPageContentSchema = mongoose.Schema({
    header: String,
    pageText: String,
    phone: String,
    email: String,
    companyName: String,
    companyId: String
});

var MainPageContent = mongoose.model('MainPageContent', mainPageContentSchema);


var newMainPageContent = new MainPageContent({
    header: 'Galvenās lapas virsraksts',
    pageText: 'Šis ir testa galvenais teksts.',
    phone: '+371 7812 3741',
    email: 'divi@divi.lv',
    companyName: 'SIA "Remesis"',
    companyId: 'ABC12345'
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
    console.log('Successfully connected to the DB!');
    saveMainContent();
});

function saveMainContent() {
    // see if main page content exists and save the default one if it doesn't
    MainPageContent.find({}, function (err, content) {
        if (content.length <= 0) {
            console.log('Main page content not found. Saving...');
            newMainPageContent.save(function (err, content) {
                if (err) return console.error(err);
                console.log('Main page content saved successfully! Exiting');
                process.exit();
            });
        } else {
            console.log('Main page content found. Skipping and exiting...');
            process.exit();
        }
    });
}