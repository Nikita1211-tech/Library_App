import { Request, Response } from "express";

const Joi = require("joi");

const passwordSchema = Joi.object({
  password: Joi.string()
    .min(8)
    .max(20)
    .pattern(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\|[\]{};:'",.<>/?]).{8,20}$/
    )
    .required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required(),
});

function Passwordvalidation(req: Request, res: Response) {
  const data = req.body;
  const passwordValidation = passwordSchema.validate(data);
  if (passwordValidation.error) {
    console.error(passwordValidation.error.details);
    return res.status(400).json({ error: passwordValidation.error.details });
  } else {
    return res
      .status(200)
      .json({ message: "Data is valid", data: passwordValidation.value });
  }
}
export { Passwordvalidation };
