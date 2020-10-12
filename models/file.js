const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const fileSchema = new Schema({
    fileId: ObjectId,
    fileName: String,
    content: String,
    //content: {
    //    //data: Buffer,
    //    type: Buffer,
    //    contentType: String
    //},
    folderId: String,
    creator: String,
    createdDatetime: String
})

module.exports.File = mongoose.model('File', fileSchema);