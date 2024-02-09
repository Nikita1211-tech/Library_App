const jwt = require("jsonwebtoken");
function tokengenerator(email){
    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    return token
}
module.exports = tokengenerator;