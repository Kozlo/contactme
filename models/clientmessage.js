var mongoose = require('mongoose');

var clientMessageSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    note: String,
    status: Boolean
});

var ClientMessage = mongoose.model('Contact', clientMessageSchema);

module.exports = ClientMessage;