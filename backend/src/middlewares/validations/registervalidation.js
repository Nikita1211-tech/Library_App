const Joi = require('joi');

// const Registerschema = Joi.object({
//     username: Joi.string()
//         .alphanum()
//         .min(8)
//         .max(15)
//         .regex(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;'"<>,.?\\/|\-=]+$/)
//         .required(),
//     email: Joi.string()
//         .email()
//         .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
//         .required(),
//     contact: Joi.string()
//         .regex(/^((\+91-?)|0)?[0-9]{10}$/)
//         .required(),
//     password: Joi.string()
//         .required()
//         .min(8)
//         .max(20)
//         .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/)
//         .messages({
//             'string.pattern.base': 'Password must be at least 8 characters long and contain at least one uppercase letter, one digit, and one special character.',
//             'string.min': 'Password must be at least {#limit} characters long.',
//             'string.max': 'Password must be at most {#limit} characters long.'
//         })
// });

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

module.exports = Registervalidation;
