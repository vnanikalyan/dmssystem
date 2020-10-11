const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    user_id: ObjectId,
    userName: {
        type: String     
    },
    password: {
        type: String     
    },
    emailId: {
        type: String     
    },
    phoneNumber: {
        type: String     
    },
    createDateTime : {
        type: String     
    },
})

module.exports.User = mongoose.model('User', userSchema);