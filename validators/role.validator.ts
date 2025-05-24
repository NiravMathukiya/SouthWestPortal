import Joi from "joi";

export function validateRole(role: unknown) {
  const schema = Joi.object({
    name: Joi.string().min(2).required().messages({
      "string.base": "Name must be a type of text",
      "string.empty": "Name cannot be empty",
      "string.min": "Name must be at least {#limit} characters long",
      "any.required": "Name is a required field",
    }),
    redirect_url: Joi.string().min(2).required(),
  });

  return schema.validate(role, { abortEarly: false });
}
