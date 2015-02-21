/*
 * Routes concerning operation actions (orders, messages)
 */

// modules
var functions = require('./functions');
var email = require('./email');


// delete an order
app.post('/delete_order', functions.loggedIn, function(req,res){
    var orderId = req.body.orderId;
    global.db.Order.remove({_id: orderId}, function(err, result){
        if (err) return console.error(err);
        console.log('Successfully deleted order');
        res.redirect('/orders');
    });
});


// get all messages
app.post('/get_all_messages', function(req,res){
    global.db.ClientMessage.find({}, function(err, messages){
        if (err) return console.error(err);
        console.log('Successfully retrieved ' + messages.length + ' messages');
        res.json(messages);
    });
});

// create a new client message
app.post('/new_client_message', function(req,res){
    var clientName = req.body.clientName,
        clientEmail = req.body.clientEmail,
        clientPhone = req.body.clientPhone,
        clientNote = req.body.clientNote;
    if (!clientName || !clientEmail || !clientNote) {
        console.log('Not all mandatory fields have been filled in.');
        res.json({success:0,error:"Not all mandatory fields have been filled in."})
        return;
    }
    var newClientMessage = new global.db.ClientMessage ({
        name: clientName,
        email: clientEmail,
        phone: clientPhone,
        note: clientNote,
        status: false

    });
    newClientMessage.save(function (err, message) {
        if (err) return console.error(err);
        console.log('Client message saved successfully!');
        //send email to 222
        email.smtpTransport.sendMail({
            from: "222 <222preces@gmail.com>", // sender address
            to: "222 <222preces@gmail.com>", // comma separated list of receivers
            subject: "Ziņojums nr: " + message._id, // Subject line
            text: "Ir pienākusi jauna ziņa no klienta: " + newClientMessage // plaintext body
        }, function(error, response){
            if(error){
                console.log(error);
            }else{
                console.log("Message sent: " + response.message);
            }
            res.json({success:1});
        });
    });
});

// delete client message
app.post('/delete_message', functions.loggedIn, function(req,res){
    var messageId = req.body.messageId;
    global.db.ClientMessage.remove({_id: messageId}, function(err, result){
        if (err) return console.error(err);
        console.log('Successfully deleted message');
        res.redirect('/messages');
    });
});

// process client message
app.post('/process_message', functions.loggedIn, function(req,res){
    var messageId = req.body.messageId;
    global.db.ClientMessage.update(
        {_id: messageId},
        { status: true},
        function(err){
            if (err) return console.error(err);
            console.log('Successfully updated message');
            res.redirect('/messages');
        }
    );
});