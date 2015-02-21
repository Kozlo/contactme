var mongoose = require('mongoose');

var mainPageContentSchema = mongoose.Schema({
    header: String,
    pageText: String,
    phone: String,
    email: String,
    companyName: String,
    companyId: String
});

var MainPageContent = mongoose.model('MainPageContent', mainPageContentSchema);

module.exports = MainPageContent;