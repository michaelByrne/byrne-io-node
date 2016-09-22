/**
 * Created by michaelbyrne on 9/21/16.
 */


var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function () {
    passport.use(new LocalStrategy({
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username,password,done){
        var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('users');
            collection.findOne({
                    username: username
                },
                function(err,results){
                    if(results.password === password) {
                        console.log(results);
                        var user = results;
                        done(null,user);
                    }
                    else{
                        done('bad password',null);
                    }

                }
            );
        });
    }));
};