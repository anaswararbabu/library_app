const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://user1:user1@ictak-library.zvpzy.mongodb.net/LIBRARY?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
const BookSchema = new Schema({
            book_title      : String,
            book_author     : String,
            book_genre      : String,
            book_image      : { data: Buffer, contentType: String }
});
var Bookdata = mongoose.model('library_book',BookSchema);
module.exports = Bookdata ;


