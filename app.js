/**
 * Created by michaelbyrne on 9/9/16.
 */


var express = require('express');


var app = express();
var port = process.env.PORT || 5000;

var nav = [{
    Link: '/', Text: '/'
}, {
    Link: '/writing', Text: '/writing'
}, {
    Link: '/photo', Text: '/photo'
}, {
    Link: '/code', Text: '/code'
}
];

app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
var server = app.listen(port,'https://web.engr.oregonstate.edu/~byrnemi/', function(err){
    var host = server.address().address;
    console.log("You are serving at " + host + " on port " + port);
});

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Byrneco. Co. Site V 0.1 Co.',
        nav: nav
    });
});

