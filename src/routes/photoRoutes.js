/**
 * Created by michaelbyrne on 9/16/16.
 */


var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var photoRouter = express.Router();

var router = function(nav){
    var photoController = require('../controllers/photoController')(null,nav);
    photoRouter.use(photoController.middleware);
    photoRouter.route('/')
        .get(photoController.showGallery);
    
    return photoRouter;
};

module.exports = router;