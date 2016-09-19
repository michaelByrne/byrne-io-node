/**
 * Created by michaelbyrne on 9/16/16.
 */

var Flickr = require("flickrapi"),
    flickrOptions = {
        api_key: "f5c16a2eb494b063220dcd3afe5d9169",
        secret: "2e0789ed78bf1ff0"
    };



var photoController = function (photoService, nav) {
    var middleware = function(req,res,next){
        // if(!req.user){
        //     res.redirect('/');
        // }
        next();
    };

    var showGallery = function(req,res){
        Flickr.tokenOnly(flickrOptions, function(error, flickr) {
            //res.send("showing gallery?");
            function Image(url, active){
                url = this.url;
                active = this.active;
            }
            flickr.photosets.getPhotos({
                user_id: "8298209@N02",
                photoset_id: '72157673523985406',
                page: 1,
                per_page: 10
            }, function(err, result) {
                // result is Flickr's response
                console.log(result.photoset.photo[0].id);
                var images = [];
                for (var i = 0;i< result.photoset.photo.length;i++){
                    var url = "https://farm" + result.photoset.photo[i].farm +".staticflickr.com/"+result.photoset.photo[i].server+
                        "/"+result.photoset.photo[i].id+"_"+result.photoset.photo[i].secret+"_c.jpg";
                    images[i] = new Image();
                    images[i].url = url;
                    images[i].active = false;

                }
                images[0].active = true;
                images[1].active = true;
                res.render('photos',{
                    images: images,
                    nav: nav
                });
            });
        });
    };

    return {
        showGallery: showGallery,
        middleware: middleware
    }
};

module.exports = photoController;