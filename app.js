/**
 * Created by michaelbyrne on 9/9/16.
 */


var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {extended: true}));

var nav = [{
    Link: '/', Text: '/'
    }, {
    Link: '/writing', Text: '/writing'
    }, {
    Link: '/photos', Text: '/photo'
    }, {
    Link: '/code', Text: '/projects'
    }
];

var storyRouter = require('./src/routes/storyRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var photoRouter = require('./src/routes/photoRoutes')(nav);


app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('uploads'));


app.use('/writing', storyRouter);
app.use('/admin',adminRouter);
app.use('/photos',photoRouter);

var server = app.listen(port, function(err){
    var host = server.address().address;
    console.log("You are serving at " + host + " on port " + port);
});

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Byrneco. Co. Site V 0.1 Co.',
        nav: nav,
        stories: []
    });
});

