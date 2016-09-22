/**
 * Created by michaelbyrne on 9/20/16.
 */


var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var passport = require('passport');

var authRouter = express.Router();

var router = function(nav){
    authRouter.route('/')
        .get(function(req,res){
            res.render('auth');
        });

    authRouter.route('/login')
        .post(passport.authenticate('local',{
            failureRedirect: '/'
        }), function(req,res){
            res.redirect('/admin');
        });

    authRouter.route('/reg')
        .post(function(req,res){
            console.log(req.body);
            var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.user,
                    password: req.body.pass
                };
                collection.insert(user,function(err,results){
                    req.login(results.ops[0], function () {
                        res.redirect('/admin');
                    });
                });
            });
        });
    authRouter.route('/user')
        .all(function(req,res,next){
            if(!req.user){
                res.redirect('/');
            }
            next();
        })
        .get(function(req,res){
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;