/**
 * Created by michaelbyrne on 9/15/16.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://admin:123@ds147975.mlab.com:47975/byrneio');

var storySchema = new Schema({
    title: String,
    tag: String,
    url: String,
    img: String,
    blurb: String,
    notes: String,
    position: Number
},{ collection: 'writing' });



var story = mongoose.model('Story',storySchema);

module.exports = story;
