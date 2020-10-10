const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const fileSchema = new Schema({
    file_id: ObjectId,
    file_name: String,
    content: String,
    folder_id: String,
    file_created_by: String,
    file_created_datetime: String
})

module.exports.File = mongoose.model('File', fileSchema);