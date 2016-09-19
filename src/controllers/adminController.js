/**
 * Created by michaelbyrne on 9/15/16.
 * About_You core module
 * TODO: JSDocs
 */




var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var fs = require('fs');
var mult = require('multer');
var upload = mult({ dest: 'public/images/uploads'});
var Story = require('../models/storyModel');


var adminController = function (adminService, nav) {
    var middleware = function (req, res, next) {
        // if(!req.user){
        //     res.redirect('/');
        // }
        next();
    };
    
    var addStory = function(req,res, next){
        var newStory = req.body;
        var image = req.file;
        var newStory = new Story({
            title: newStory.title,
            url: newStory.url,
            blurb: newStory.blurb,
            img: image.filename,
            tag: newStory.tag,
            notes: newStory.notes,
            position: newStory.position
        });
        newStory.save(function(err) {
            if (err) throw err;
            console.log('Story saved successfully!');
            res.redirect('/admin');
        });
    };
    
    var getDash = function(req,res){
        console.log("getting dash");
        var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
        mongodb.connect(url,function(err,db) {
            var collection = db.collection('writing');
            if (collection){
                collection.find({}).toArray(function(err,results){
                    console.log(results);
                    results.sort(function(a, b) {
                        return a.position - b.position;
                    });
                    console.log(results);
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
    };

    var editStory = function(req,res){
        Story.findById(req.body.pk,function(err,story){
            story[req.body.name] = req.body.value;
            console.log(story['notes']);
            story.save(function(err){
                console.log("saved?");
            });
            res.redirect('/admin');
        });

    };

    var deleteStory = function(req,res){
        Story.findByIdAndRemove(req.body.delete, function(err) {
            if (err) throw err;

            // we have deleted the story
            console.log("deleted " + req.body.delete);
            res.redirect('/admin');
        });

    };
    
    return {
        middleware: middleware,
        getDash: getDash,
        addStory: addStory,
        editStory: editStory,
        deleteStory: deleteStory
    }

};

module.exports = adminController;