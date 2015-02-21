/*
 * Routes concerning page content
 */

app.post('/get_main_content', function(req,res){
    global.db.MainPageContent.find({}, function(err, content){
        if (err) return console.error(err);
        console.log('Main page content retrieved successfully');
        res.json(content[0]);
    });
});

app.post('/update_main_content', function(req,res){
    var mainContentId = req.body.mainContentId,
        mainPageHeader = req.body.mainPageHeader,
        mainPageText = req.body.mainPageText,
        ourEmail = req.body.ourEmail,
        ourPhone = req.body.ourPhone,
        companyName = req.body.companyName,
        companyId = req.body.companyId;

    global.db.MainPageContent.update(
        {_id: mainContentId},
        {
            header: mainPageHeader,
            pageText: mainPageText,
            phone: ourPhone,
            email: ourEmail,
            phone: ourPhone,
            companyName: companyName,
            companyId: companyId
        },
        function(err){
            if (err) return console.error(err);
            console.log('Successfully updated main page content');
            res.redirect('/admin');
        }
    );
});