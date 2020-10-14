const express = require('express');
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser= require('body-parser');
const server = require('http').createServer(app);
const AccessTokenInterceptor = require('./interceptors/accessTokenInterceptor');
const ControlInterceptor = require('./interceptors/controlInterceptor');
const fs = require('fs');

const privateKey = fs.readFileSync('private.key');

app.use(bodyParser.urlencoded({ extended: true }));
//app.use(fileUpload());

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Document Management System',
            version: '1.0.0',
            description: 'All APIs of DMS',
            contact: {
                name: 'Nani Kalyan V'
            },
            servers: ["http://localhost:3000"]
        }
    },
    //[*.routes/*.js]
    apis: ["main.js", "./controllers/controller.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Connecting to Database
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongodb:27017/dms', {useNewUrlParser:true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', (error)=>{
    console.log('Unable to connect to MongoDB - ', error);
})

db.once('open', ()=>{
    console.log('connected to Database!');

    const objCollection = {
        app: app,    
        db: db,
        privateKey: privateKey
    };
    new AccessTokenInterceptor(objCollection);
    new ControlInterceptor(objCollection);
    
    const port = 3000;
    server.listen(port);
    console.log(`Server running on port ${port}`);
})
//////////////////////////////// -- MongoDB

//Catching Process level exceptions
process.on('warning',(warning) => {
    console.log('On Warning - ', warning);
});

process.on('uncaughtException',(error,origin) => {
    console.log('UncaughtException', error);
    console.log(error);
    console.log(origin);    
});

process.on('error',(error) => {
    console.log('On Error - ', error);
});
///////////////////////////////////
