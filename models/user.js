const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const userSchema = new Schema({
    userId: ObjectId,
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
    createDatetime : {
        type: String     
    },
})

module.exports.User = mongoose.model('User', userSchema);