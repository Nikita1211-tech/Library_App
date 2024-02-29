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


function saveUserHandler(req, res) {
    const data = req.body;

    // Perform validation
    const validationResult = registerSchema.validate(data);

    // Handle validation results
    if (validationResult.error) {
        console.error(validationResult.error.details);
        // Respond with validation error
        return res.status(400).json({ error: validationResult.error.details });
    } else {
        // Data is valid, proceed with further processing
        // For example, save data to database
        // Return success response
        return res.status(200).json({ message: 'Data is valid', data: validationResult.value });
    }
}

module.exports = saveUserHandler;
