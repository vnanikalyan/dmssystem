const {File, Folder, User} = require('../models');

//const { File } = require('../models/file');
//const { Folder } = require('../models/folder');
//const { User } = require('../models/user');
const moment = require('moment');

function Service(objectCollection) {
    const db = objectCollection.db;

    this.getAllFilesAndFoldersOfAUser = async () => {
        let responseData = [],
        error = true;

        //model.Folder
        const folders = await Folder.find();
        console.log(folders);

        const files = await File.find();
        console.log(files);

        return [error, responseData];
    }

    //To get the specific files of a Folder
    this.getFilesOfGivenFolder = async() => {}

    //Creates a New Folder
    this.createNewFolder = async() => {
        let error = true,
            responseData = [];

        const folder = new Folder();
        folder.folder_name = request.folder_name;
        folder.file_created_by = request.user_id;
        folder.file_created_datetime= moment().utc().format("YYYY-MM-DD HH:mm:ss");

        //console.log(folder);

        await new Promise((resolve , reject)=>{
            folder.save((err, doc) => {
                if (!err) {
                    error = false;
                    console.log('DOC - ', doc);
                    responseData = doc;
                } else {
                    console.log('Error in saving Folder : ', err);
                }   

                resolve();
            });
        })        

        return [false, responseData];
    }

    //Creates a New File
    this.createNewFile = async(request) => {
        let error = true,
            responseData = [];

        const file = new File();
        file.file_name = request.file_name;
        file.content = 'This is file content!',
        file.folder_id =  request.folder_id || 0;
        file.file_created_by = request.user_id;
        file.file_created_datetime= moment().utc().format("YYYY-MM-DD HH:mm:ss");

        //console.log(file);

        await new Promise((resolve , reject)=>{
            file.save((err, doc) => {
                if (!err) {
                    error = false;
                    console.log('DOC - ', doc);
                    responseData = doc;
                } else {
                    console.log('Error in  saving File : ', err);
                }   

                resolve();
            });
        })        

        return [false, responseData];
    }

    //Moves file from one folder to Another Folder
    this.moveFile = async(request) => {
        from_folder = request.from_folder;
        to_folder = request.to_folder;
        file_id = request.file_id;

        /*await new Promise((resolve , reject)=>{
            file.update((err, doc) => {
                if (!err) {
                    error = false;
                    console.log('DOC - ', doc);
                    responseData = doc;
                } else {
                    console.log('Error in  saving File : ', err);
                }   

                resolve();
            });
        })*/      

    }

    //Authenticates User
    //Returns a JWT token
    this.loginUser = async() =>{
    }


}

module.exports = Service;