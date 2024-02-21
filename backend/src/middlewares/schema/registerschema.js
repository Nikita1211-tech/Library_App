const Joi = require('joi');
const errorFunction = require('../../utils/errorfunction');

const Registerschema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(8)
        .max(15)
        .pattern(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;'"<>,.?\\/|\-=]+$/)
        .required(),
    mail: Joi.string()
        .email()
        .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
        .required(),
    contact: Joi.string()
        .pattern(/^((\+91-?)|0)?[0-9]{10}$/)
        .required()
});

module.exports = Registerschema;
