import Joi from "joi";

export function validateUser(user: unknown) {
  const schema = Joi.object({
    name: Joi.string().optional().messages({
      "string.base": "Name should be a type of text",
    }),
    mobile: Joi.string().optional().messages({
      "string.base": "Mobile number should be a type of text",
    }),
    username: Joi.string().required().messages({
      "string.base": "Username should be a type of text",
      "string.empty": "Username cannot be empty",
      "any.required": "Username is a required field",
    }),
    email: Joi.string().email().required().messages({
      "string.base": "Email should be a type of text",
      "string.email": "Email must be a valid email address",
      "string.empty": "Email cannot be empty",
      "any.required": "Email is a required field",
    }),
    password: Joi.string().required().messages({
      "string.base": "Password should be a type of text",
      "string.empty": "Password cannot be empty",
      "any.required": "Password is a required field",
    }),
    isSuperAdmin: Joi.boolean().optional().messages({
      "boolean.base": "isSuperAdmin should be a type of boolean",
    }),
    rolesIds: Joi.array().optional(),
  });

  return schema.validate(user, { abortEarly: false });
}
