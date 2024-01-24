const jwt = require("jsonwebtoken");

const authenticateJWT = (req,res,next) => {
    const token = req.header('Authorization');
    console.log(token);
    if(!token){
        return res.status(401).json({mesage: 'Unauthorized'});
    }
    const tokenWithoutBearer = token.slice(7); 
    console.log(tokenWithoutBearer);
    jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expired' });
            } else {
                return res.status(403).json({ message: 'Forbidden' });
            }
        }
        req.user = user;
        next();
    });
}


module.exports = authenticateJWT;