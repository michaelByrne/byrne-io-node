/**
 * Created by michaelbyrne on 9/12/16.
 */


var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var storyRouter = express.Router();



var router = function (nav) {
    var storyController = require('../controllers/storyController')(null,nav);
    storyRouter.use(storyController.middleware);
    storyRouter.route('/')
        .get(storyController.getIndex);


    return storyRouter;
};

module.exports = router;