/**
 * Created by michaelbyrne on 9/20/16.
 */
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var authController = function (authService, nav) {
    var middleware = function(req,res,next){
        // if(!req.user){
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function (req, res) {
        res.render('auth');
    };

    var logIn = function (req, res) {
        console.log(req.body);
    };



    return {
        getIndex: getIndex,
        logIn: logIn,
        middleware: middleware
    }
};


module.exports = authController;