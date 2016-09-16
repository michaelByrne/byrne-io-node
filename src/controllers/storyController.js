/**
 * Created by michaelbyrne on 9/15/16.
 */
/**
 * Created by michaelbyrne on 9/8/16.
 */
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;


var storyController = function (storyService, nav) {
    var middleware = function(req,res,next){
        // if(!req.user){
        //     res.redirect('/');
        // }
        next();
    };

    var getIndex = function (req, res) {
        var url = 'mongodb://admin:123@ds147975.mlab.com:47975/byrneio';
        mongodb.connect(url, function (err, db) {
            var collection = db.collection('writing');
            collection.find({}).toArray(
                function (err, results) {
                    results.sort(function(a, b) {
                        return a.position - b.position;
                    });
                    res.render('writing', {
                        title: 'Byrneco. Co. Site V 0.1 Co. Writings on Subjects',
                        nav: nav,
                        stories: results
                    });
                }
            );
        });

    };

   

    return {
        getIndex: getIndex,
        middleware: middleware
    }
};


module.exports = storyController;