const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    user_id: ObjectId,
    user_name: {
        type: String     
    },
    password: {
        type: String     
    },
    email_id: {
        type: String     
    },
    phone_number: {
        type: String     
    }
})

module.exports.User = mongoose.model('User', userSchema);