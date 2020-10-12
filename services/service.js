//const {File, Folder, User} = require('../models');

const { File } = require('../models/file');
const { Folder } = require('../models/folder');
const { User } = require('../models/user');

const moment = require('moment');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const FileType = require('file-type');


function Service(objectCollection) {
    const db = objectCollection.db;
    const privateKey = (objectCollection.privateKey).toString();

    this.getAllFilesAndFoldersOfAUser = async (request) => {
        let responseData = [],
            error = true;        

        console.log('Decoded User Id - ', request.decoded_user_id);
        console.log('USER ID - ', request.user_id);
        
        if(request.decoded_user_id !== request.user_id) {
            responseData.push({
                'message': 'Invalid Access Token!'
            })
            return [error, responseData];
        }

        //Get all the Folders
        const foldersData = await db.collection('folders').find().toArray(); 
        //console.log('foldersData - ', foldersData);
        for(const i of foldersData) {
            if(i.creator === request.user_id) {
                responseData.push(i);
            }
        }

        //Get all the Files
        const filesData = await db.collection('files').find().toArray();    
        //console.log('DATA - ', filesData);
        for(const i of filesData) {
            if(i.creator === request.user_id) {
                responseData.push(i);
            }
        }
    
        if(responseData.length === 0) {
            responseData.push({
                'message': 'No Data!'
            })
        }

        return [error, responseData];
    }

    //To get the specific files of a Folder
    this.getFilesOfGivenFolder = async(request) => {
        let responseData = [],
            error = true;

        console.log('Decoded User Id - ', request.decoded_user_id);
        console.log('USER ID - ', request.user_id);
            
        if(request.decoded_user_id !== request.user_id) {
            responseData.push({
                'message': 'Invalid Access Token!'
            })
            return [error, responseData];
        }

        console.log('FOLDER ID - ', request.folder_id);        

        //Get all the Files
        const filesData = await db.collection('files').find({"folderId": request.folder_id}).toArray();
        console.log(filesData);
        responseData = filesData;
        
        if(responseData.length === 0) {
            responseData.push({
                'message': 'No Data!'
            })
        }
    
        return [error, responseData];
    }

    //Creates a New Folder
    this.createNewFolder = async(request) => {
        let error = true,
            responseData = [];

        const folder = new Folder();
        folder.folderName = request.folder_name;
        folder.creator = request.user_id;
        folder.createdDatetime= moment().utc().format("YYYY-MM-DD HH:mm:ss");

        //console.log(folder);

        const folderData = await 
            db.collection('folders')
            .find({$and:[{"folderName": request.folder_name}, {"creator": request.user_id}]})
            .toArray();

        console.log('folderData - ', folderData);
        if(folderData.length > 0) {
            responseData.push({'message': 'A folder with the same name exists already!'});            
        } else {
            await new Promise((resolve , reject)=>{
                folder.save((err, doc) => {
                    if (!err) {
                        error = false;
                        console.log('DOC - ', doc);
                        //responseData = doc;
    
                        responseData.push({
                            'message': 'Folder Saved Successfully!'
                        })
                    } else {
                        console.log('Error in saving Folder : ', err);
                        responseData.push({
                            'error': err
                        })
                    }   
    
                    resolve();
                });
            })
        }

        return [false, responseData];
    }

    //Creates a New File
    this.createNewFile = async(request) => {
        let error = true,
            responseData = [];        

        const file = new File();
        file.fileName = request.file_name;
        file.content = request.file_content;
        //file.content = 'This is file content!',
        //file.content = fs.readFileSync(`uploads/${request.file.originalname}`);
        //file.content = binary(request.files.uploadedFile.data);
        file.folderId =  request.folder_id || 0;
        file.creator = request.user_id;
        file.createdDatetime= moment().utc().format("YYYY-MM-DD HH:mm:ss");

        //check whether this file_name is already existing for that  User
        const fileData = await 
            db.collection('files')
            .find({$and: [{"fileName": request.file_name}, {creator: request.user_id}]})
            .toArray();

        console.log('fileData - ', fileData);
        if(fileData.length > 0) {
            responseData.push({'message': 'A file with the same name exists already!'});            
        } else { 
            await new Promise((resolve , reject)=>{
                file.save((err, doc) => {
                    if (!err) {
                        error = false;
                        console.log('DOC - ', doc);
                        //responseData = doc;
    
                        responseData.push({
                            'message': 'File Successfully Created!'
                        })
                    } else {
                        console.log('Error in  saving File : ', err);
                        responseData.push({
                            'message': err
                        })
                    }
    
                    resolve();
                });
            })
        }     
            
        return [false, responseData];
    }

    //Moves file from one folder to Another Folder
    this.moveFile = async(request) => {
        let error = true,
            responseData = [];

        const fromFolderID = request.from_folder_id;
        const toFolderID = request.to_folder_id;
        const fileID = request.file_id;

        console.log('Moving The File ID - ', request.file_id);
        console.log('Moving To Folder ID - ', request.to_folder_id);

        //Check if the folderId exists
        const toFolderData = await db.collection('folders').find({"folderId": request.to_folder_id}).toArray();
        if(toFolderData.length > 0) {
            const filter = {"_id": fileID};
            const update = {"folder_id": toFolderID};
            const fileData = await db.collection('files').findOneAndUpdate(filter, update);
        } else {
            responseData.push({
                'message': 'To Folder does not exist!'
            })
        }

        return [error, responseData];
    }

    //Authenticates User
    //Returns a JWT token
    this.loginUser = async(request) =>{
        let error = true,
            responseData = [];

        console.log(request);

        //Get the password hash from DB        
        const data = await db.collection('users').find().toArray();
        console.log('DATA - ', data);

        let hash;
        let userID;
        for(const i of data){
            if(i.userName === request.user_name) {
                hash = i.password;
                userID = i._id;
            }
        }

        //console.log('HASH - ', hash);
        const result = await bcrypt.compare(request.password, hash);
        console.log('Result - ', result);

        if(result) {
            error = false;

            //JWT            
            const token = jwt.sign(
                { 
                    user_id: userID
                }, privateKey, { expiresIn: '1h' }, { algorithm: 'RS256'});

            
            responseData.push({
                user_id: userID,
                access_token: token
            });
        }

        return [error, responseData];
    }

    this.addUser = async (request) => {        
        let error = true,
            responseData = [];

        const saltRounds = 10
        const hash = await bcrypt.hash(request.password, saltRounds);

        //Store hash - new password in the DB
        const user = new User();
        user.userName = request.user_name;
        user.password = hash;
        user.emailId = request.email_id;
        user.phoneNumber = request.phone_number;
        user.createDatetime = moment().utc().format("YYYY-MM-DD HH:mm:ss");;        

        //check whether the username is already taken
        const userData = await db.collection('users').find({"userName": request.user_name}).toArray();
        console.log(userData);
        if(userData.length > 0) {
            responseData.push({'message': `The userName ${request.user_name} is already taken!`});
        } else {
            await new Promise((resolve , reject)=>{
                user.save(async (err, doc) => {
                    if (!err) {
                        error = false;
                        console.log('DOC - ', doc);
                        responseData = doc;

                        //await createDefaultFolderZero(doc);
                    } else {
                        console.log('Error in  saving File : ', err);
                    }
    
                    resolve();
                });
            })
        }
        return [error, responseData];
    }

    async function createDefaultFolderZero(doc) {
        let error = true,
            responseData = [];

        const folder = new Folder();
        folder._id = '0_'+ doc._id;
        folder.folderName = null;
        folder.creator = doc._id;
        folder.createdDatetime= moment().utc().format("YYYY-MM-DD HH:mm:ss");
        
        await new Promise((resolve , reject)=>{
            folder.save((err, doc) => {
                if (!err) {
                    error = false;
                    console.log('DOC - ', doc);            

                    //responseData.push({
                    //    'message': 'Folder Saved Successfully!'
                    //})
                } else {
                    console.log('Error in saving Folder : ', err);
                    //responseData.push({
                    //    'error': err
                    //})
                }   

                resolve();
            });
            })
        
        return [false, responseData];
    }

        
}

module.exports = Service;