const jwt = require('jsonwebtoken');

function AccessTokenInterceptor(app) {
    app.use((req, res, next) => {token = req.headers.accesstoken;
         
        next();
        
        // get the decoded payload and header
        decoded = jwt.decode(token, {complete: true});
        //console.log('decoded : ', decoded);
        if(decoded === null) {
            console.log('Invalid token');
            //res.send(responseWrapper.getResponse(null, {}, -3205, req.body));
            return;
        }

        //Upon succcessful verification of the Token
        next();

    })

}

module.exports = AccessTokenInterceptor;