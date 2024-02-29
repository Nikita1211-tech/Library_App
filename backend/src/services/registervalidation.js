const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string()
        .pattern(/[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/)
        .min(8)
        .max(15)
        .required(),
    email: Joi.string()
        .email()
        .required(),
    contact: Joi.string()
        .pattern(/^((\+91-?)|0)?[0-9]{10}$/)
        .required(),
    password: Joi.string()
        .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/)
        .required(),
});

// const passwordSchema = Joi.object({
//     password: Joi.string()
//               .min(8)
//               .max(20)
//               .pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/)
//               .required(),
//     confirmpassword: Joi.string()
//                      .valid(Joi.ref('password'))
//                      .required()
// })

function saveUserHandler(req, res) {
    const data = req.body;
    const validationResult = registerSchema.validate(data);

    if (validationResult.error) {
        console.error(validationResult.error.details);
        return res.status(400).json({ error: validationResult.error.details });
    } else {
        return res.status(200).json({ message: 'Data is valid', data: validationResult.value });
    }
}

// function Passwordvalidation(req, res) {
//         const data = req.body;
//         const passwordValidation = passwordSchema.validate(data)
//         if (passwordValidation.error) {
//             console.error(passwordValidation.error.details);
//             return res.status(400).json({ error: passwordValidation.error.details });
//         } else {
//             return res.status(200).json({ message: 'Data is valid', data: passwordValidation.value });
//         }
// }

module.exports = saveUserHandler;
