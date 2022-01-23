const jwt = require('jsonwebtoken');

function verifyToken(req, res, next){
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) {
        return res.status(401).send({
            message: 'No token provided'
        });
    }

    const token =  authorizationHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);
    // console.log(token);
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function verifyRefreshToken(req, res, next){
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

module.exports = {verifyToken, verifyRefreshToken};
