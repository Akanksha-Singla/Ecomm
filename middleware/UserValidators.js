const Joi = require('joi'); // Import Joi for validation

// Joi validation schema for user registration
const validateRegisterUser = (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    mobile:Joi.number().min(1000000000).message("Invaild mobile number").max(9999999999).message("Invaild mobile number"),
    
    profileImage:Joi.object({
      data: Joi.binary().optional(),
      contentType: Joi.string().optional(),
  }).optional(),
 });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // Proceed if validation passes
};

// Validation for login (email & password)
const validateLoginUser = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  next(); // Proceed if validation passes
};

module.exports = { validateRegisterUser, validateLoginUser };