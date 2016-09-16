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


var router = function (nav) {
    var adminController = require('../controllers/adminController')(null,nav);
    adminRouter.use(adminController.middleware);
    adminRouter.route('/')
        .get(adminController.getDash);

    adminRouter.use(adminController.middleware);
    adminRouter.route('/addStory')
         .post(upload.single('displayImage'),adminController.addStory);
    
    adminRouter.route('/editStory')
        .post(adminController.editStory);
    
    adminRouter.route('/deleteStory')
        .post(adminController.deleteStory);

    return adminRouter;
};

module.exports = router;