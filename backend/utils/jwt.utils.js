const jwt = require("jsonwebtoken");
const jwtConfig = require("./../jwtconfig");


exports.verifyToken = (token) => jwt.verify(token, jwtConfig.secret);

exports.createToken = (data) => jwt.sign(data, jwtConfig.secret, { expiresIn: jwtConfig.ttl });