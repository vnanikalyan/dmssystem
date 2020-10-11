const Service = require('../services/service');

function Controller(objCollection) {
    const app = objCollection.app;
    const service = new Service(objCollection);        
    
    /** 
     * @swagger
     * /dms/simple:
     *  get:
     *      description: To Check
     *      responses:
     *          '200':
     *              description: A Successful Response
    */
    app.get('dms/simple', (req, res)=>{
        res.send({'message': 'Hello World!'});
    });


    
    /** 
     * @swagger
     * /dms/folders-files/list/:user_id:
     *  get:
     *      description: To list all the files & folders of a specific User
     *      responses:
     *          '200':
     *              description: A Successful Response
    */
    app.get('/dms/folders-files/list/:user_id', async (req, res) => {
        const [err, data] = await service.getAllFilesAndFoldersOfAUser(req.params);
        (!err)?
            res.status(200).send(data):        
            res.status(400).send(data);
    });



    /** 
     * @swagger
     * /dms/:folder_id/files/list:
     *  get:
     *      description: To list all the files in a specific Folder
     *      responses:
     *          '200':
     *              description: A Successful Response
    */
    app.get('/dms/:folder_id/files/list', async (req, res) => {
        const [err, data] = await service.getFilesOfGivenFolder(req.params);
        (!err)?
            res.status(200).send(data):
            res.status(400).send(data);
    });



    /** 
     * @swagger
     * /dms/folder/add:
     *  post:
     *      description: Create a New Folder
     *      responses:
     *          '200':
     *              description: A Successful Response, returns folder ID
    */    
    app.post('/dms/folder/add', async (req, res) => {
        const [err, data] = await service.createNewFolder(req.body);
        (!err)?
            res.status(200).send(data):
            res.status(400).send(data);
    });



    /** 
     * @swagger
     * /dms/file/add:
     *  post:
     *      description: Create a New File
     *      responses:
     *          '200':
     *              description: A Successful Response, returns file ID
    */
    app.post('/dms/file/add', async (req, res) => {
        const [err, data] = await service.createNewFile(req.body);
        (!err) ?
            res.status(200).send(data):        
            res.status(400).send(data);
    });



    /** 
     * @swagger
     * /dms/file/move:
     *  put:
     *      description: Move File from One Folder to Another Folder
     *      responses:
     *          '200':
     *              description: A Successful Response
    */
    //To list all the files in a specific Folder
    app.put('/dms/file/move', async (req, res) => {
        const [err, data] = await service.moveFile(req.body);
        (!err)?
            res.status(200).send(data):        
            res.status(400).send(data);
    });



    /** 
     * @swagger
     * /dms/user/login:
     *  post:
     *      description: Existing User to SignIn
     *      parameters:
     *          user_name
     *          password
     *          email_id 
     *          phone_number
     *      responses:
     *          '200':
     *              description: A Successful Response, returns AccessToken
    */
    app.post('/dms/user/login', async (req, res) => {
        const [err, data] = await service.loginUser(req.body);
        (!err) ?
            res.status(200).send(data):        
            res.status(400).send(data);
    });

    

    /** 
     * @swagger
     * /dms/user/add:
     *  post:
     *      description: To Add a New User
     *      parameters:
     *          user_name
     *          password
     *          email_id 
     *          phone_number
     *      responses:
     *          '200':
     *              description: A Successful Response, returns User ID
    */
    app.post('/dms/user/add', async (req, res) => {
        const [err, data] = await service.addUser(req.body);
        (!err) ?
            res.status(200).send({'message': 'User Successfully Created!'}):
            res.status(400).send(data);
    });
 
}

module.exports = Controller;