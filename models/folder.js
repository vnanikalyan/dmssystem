const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


const folderSchema = new Schema({
    folderId: ObjectId,
    folderName: String,    
    creator: String,
    createdDatetime: String
})

module.exports.Folder = mongoose.model('Folder', folderSchema);