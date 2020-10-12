const jwt = require('jsonwebtoken');

function AccessTokenInterceptor(objCollection) {
    objCollection.app.use((req, res, next) => {

        console.log(req.url);        
        if(req.url === '/dms/user/login' || req.url === '/dms/user/add') {
            next();
        } else {
            try {
                token = req.headers.authorization;
                token = token.split(' ')[1];

            console.log('token - ', token);
            if(token === null || token === undefined) {
                res.status(400).send({'message': 'Invalid Access Token'});
                return;            
            }        
            
            //decoded = jwt.decode(token, {complete: true});               
            //console.log('objCollection.privateKey - ', (objCollection.privateKey).toString());
            const decoded = jwt.verify(token, (objCollection.privateKey).toString());
            console.log('decoded : ', decoded);

            if(decoded === null) {                
                res.status(400).send({'message': 'Invalid Access Token'});
                return;
            }

            const userIDFromRequest = req.body.user_id;
            console.log('userIDFromRequest - ', userIDFromRequest);

            if(decoded.user_id === userIDFromRequest) {
                //Upon succcessful verification of the Token
                next();
            } else if(userIDFromRequest === undefined) {
                console.log('decoded.user_id - ', decoded.user_id);
                req.decoded_user_id = decoded.user_id;                
                next();
            } else {
                res.status(400).send({'message': 'Invalid Access Token'});
                return;
            }
            } catch(err) {
                console.log(err.name);
                if(err.name === 'TokenExpiredError') {
                    res.status(400).send({'message': 'Access Token Expired!'});
                    return;
                } else {
                    res.status(400).send({'message': 'Invalid Access Token'});
                    return;    
                }                            
            }
                        
        }
    })

}

module.exports = AccessTokenInterceptor;