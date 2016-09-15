/**
 * Created by michaelbyrne on 9/12/16.
 */

var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var fs = require('fs');
var mult = require('multer');
var upload = mult({ dest: 'public/images/uploads'});



var router = function(nav){

    adminRouter.route('/addStory')
        .post(upload.single('displayImage'),function (req,res,next) {
            var newStory = req.body;
            var image = req.file;
            console.log(image);
            console.log(newStory);
            var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
            mongodb.connect(url,function(err,db) {
                var collection = db.collection('writing');
                if (collection){
                    if (image) {
                       newStory.filename = image.filename;
                    }
                    else{
                        newStory.filename = null;
                    }
                    collection.insert(newStory, function (err, results) {
                        console.log("added ..." + JSON.stringify(newStory));
                        res.redirect('/admin')
                    });
                }
            });
            
        });
    adminRouter.route('/')
        .get(function (req,res){
            var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
            mongodb.connect(url,function(err,db) {
                var collection = db.collection('writing');
                if (collection){
                    collection.find({}).toArray(function(err,results){
                        res.render('admin',{
                            stories: results
                        });
                    });
                }
                else{
                    res.render('admin',{
                        newEntry: null
                    });
                }
            });
        });

    
    return adminRouter;
};


module.exports = router;