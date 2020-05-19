const jwt = require('jsonwebtoken');

const jwtSecret = "rjoewijrowerij298848324-823";

function auth(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];

        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.sendStatus(401);
            }else{
                req.token = token;
                req.loggedUser = {id: data.id, email: data.email};
                next();
            }
        });
    }else{
        res.sendStatus(401);
    }

    
    
};

module.exports = {
    auth,
    jwtSecret
}