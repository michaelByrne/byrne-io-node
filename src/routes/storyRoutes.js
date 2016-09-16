/**
 * Created by michaelbyrne on 9/12/16.
 */


var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var storyRouter = express.Router();

// var router = function(nav){
//     var stories = [
//         {
//             title: 'Dog Post',
//             tag: 'Creatures'
//         },
//         {
//             title: 'Hack This',
//             tag: 'Tutorial'
//         },
//         {
//             title: 'Hot Physics Shit',
//             tag: 'Particles'
//         }
//     ];
//     storyRouter.route('/')
//         .get(function (req, res) {
//             var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
//             mongodb.connect(url,function(err,db){
//                 var collection = db.collection('writing');
//                 collection.find({}).toArray(function(err,results){
//                     //console.log(results[0].title);
//                     res.render('writing', {
//                         title: 'Byrneco. Co. Site V 0.1 Co.',
//                         nav: nav,
//                         stories: results
//                     });
//                 });
//             });
//
//         });
//
//     storyRouter.route('/:id')
//         .get(function (req, res) {
//             var id = req.params.id;
//             res.render('storyView',{
//                 story: stories[id],
//                 nav: nav
//             });
//         });
//     return storyRouter;
// };


var router = function (nav) {
    var storyController = require('../controllers/storyController')(null,nav);
    storyRouter.use(storyController.middleware);
    storyRouter.route('/')
        .get(storyController.getIndex);


    return storyRouter;
};

module.exports = router;