// this is my own middleware that I use whenever I require the user to be authenticated
function loggedIn(req, res, next){
    if(req.user){
        console.log('user is logged in');
        next();
    }else{
        console.log('user is not logged in');
        res.redirect('/auth');
    }
};

// replace all line breaks with br tags and carriage returns with paragraphs
function createTextHtml(text, callback) {
    var result = "<p>" + text + "</p>";
    result = result.replace(/\r\n\r\n/g, "</p><p>").replace(/\n\n/g, "</p><p>");
    result = result.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");

    callback(result);
}

module.exports = {
    loggedIn: loggedIn,
    createTextHtml: createTextHtml
};