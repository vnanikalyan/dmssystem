const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const folderSchema = new Schema({
    folder_id: ObjectId,
    folder_name: String,    
    folder_created_by: String,
    folder_created_datetime: String
})

module.exports.user = folderSchema;