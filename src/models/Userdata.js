const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://user1:user1@ictak-library.zvpzy.mongodb.net/LIBRARY?retryWrites=true&w=majority');
const Schema = mongoose.Schema;
 const UserSchema = new Schema({
            user_fname      : { type: String , required : true},
            user_lname      : { type: String , required : true},
            user_email      : { type: String , required : true},
            user_password   : { type: String , required : true}
});
var Userdata = mongoose.model('library_user',UserSchema);
module.exports = Userdata ;