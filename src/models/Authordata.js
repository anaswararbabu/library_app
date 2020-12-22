const mongoose = require("mongoose");
 mongoose.connect('mongodb+srv://user1:user1@ictak-library.zvpzy.mongodb.net/LIBRARY?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
            author_name         : String,
            author_genre        : String,
            author_imageUrl     : String,
            author_image        : { data: Buffer, contentType: String }
});
var Authordata = mongoose.model('library_author',AuthorSchema);
module.exports = Authordata ;