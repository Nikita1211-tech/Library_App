const Joi = require('joi');

const Registervalidation = (schema, property) => { 
    return (req, res, next) => {
    const data = {
        username: req.body.username,
        email: req.body.mail, 
        contact: req.body.contact,
        password: req.body.password,
    };

    const { result } = Joi.validate(data, Registerschema);
    // const { value, error } = result; 
    const valid = error == null; 
    if (valid) { 
        next(); 
    } 
    else { 
       const { details } = result; 
       const message = details.map(i => i.message).join(',');
       
       console.log("error", message); 
       res.status(422).json({ error: message }) } 
};
}
const Passwordvalidation = (schema, property) => {
    return(req, res, next) => {
        const data = {
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        };

        const { result } = Joi.validate(data, )
    }
}

module.exports = Registervalidation;
