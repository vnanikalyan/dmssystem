
/*
    GET
        - folders-list/{user_id}        
        - {folder_id}/files/list
    POST
        - folder/add
        - file/add
    PUT
        - move/file
    POST 
        - user/login
*/

const Service = require('../services/service');

function Controller(objCollection) {
    const app = objCollection.app;
    const service = new Service(objCollection);
    
    app.get('/', (req, res)=>{
        res.send({'message': 'Hello World!'});
    });
    
    //To list all the files of a specific User
    //Including all folders and files which are not in any folder
    /*app.get('/folders-files/list/:user_id', async (req, res) => {
        const [err, data] = await service.getAllFilesAndFoldersOfAUser(req.body);
        if (!err) {
            res.send(responseWrapper.getResponse({}, data, 200, req.body));
        } else {
            res.send(responseWrapper.getResponse(err, data, -9999, req.body));
        }
    });


    //To list all the files in a specific Folder
    app.get('/:folder_id/files/list', async (req, res) => {
        const [err, data] = await service.getFilesOfGivenFolder(req.body);
        if (!err) {
            res.send(responseWrapper.getResponse({}, data, 200, req.body));
        } else {
            res.send(responseWrapper.getResponse(err, data, -9999, req.body));
        }
    });*/

    //To list all the files in a specific Folder
    app.post('/folder/add', async (req, res) => {
        const [err, data] = await service.createNewFolder(req.body);
        if (!err) {
            res.status(200).send({'message': 'File Successfully Saved!'});
        } else {
            res.status(400).send({'message': err});
        }
    });

    //To list all the files in a specific Folder
    app.post('/file/add', async (req, res) => {
        const [err, data] = await service.createNewFile(req.body);
        if (!err) {
            res.status(200).send({'message': 'File Successfully Saved!'});
        } else {
            res.status(400).send({'message': err});
        }
    });
/*
    //To list all the files in a specific Folder
    app.put('/file/move', async (req, res) => {
        const [err, data] = await service.moveFile(req.body);
        if (!err) {
            res.send(responseWrapper.getResponse({}, data, 200, req.body));
        } else {
            res.send(responseWrapper.getResponse(err, data, -9999, req.body));
        }
    });

    //To list all the files in a specific Folder
    app.post('/user/login', async (req, res) => {
        const [err, data] = await service.loginUser(req.body);
        if (!err) {
            res.send(responseWrapper.getResponse({}, data, 200, req.body));
        } else {
            res.send(responseWrapper.getResponse(err, data, -9999, req.body));
        }
    });
    */    
}

module.exports = Controller;