/*
 * Configuration for email sending
 */

var nodemailer = require('nodemailer');

var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "gmail",
    auth: {
        user: "222preces@gmail.com",
        pass: "Brakis222"
    }
});

module.exports = {
    smtpTransport : smtpTransport
};