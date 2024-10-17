const Joi = require('joi'); // Import Joi for validation

const basicDetailsSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.number().min(1000000000).max(9999999999).required(),
  address: Joi.string().min(3).max(100).required(),
  city: Joi.string().min(2).max(30).required(),
  state: Joi.string().required(),
  pincode: Joi.number().required(),
  intro: Joi.string().min(3).max(500).required(),
  _id: Joi.string().optional(),


});

// Validation schema for education
const educationSchema = Joi.object({
  degree: Joi.string().required(),
  institution: Joi.string().required(),
  percentage: Joi.number().min(0).max(100).required(),
  _id: Joi.string().optional(),
});

// Validation schema for experience
const experienceSchema = Joi.object({
  organization: Joi.string().required(),
  location: Joi.string().required(),
  position: Joi.string().required(),
  ctc: Joi.number().optional(),
  startDate: Joi.date().optional(),
  endDate: Joi.date().optional(),
  technologies: Joi.string().optional(),
  _id: Joi.string().optional(),
});

// Validation schema for projects
const projectsSchema = Joi.object({
  title: Joi.string().required(),
  teamSize: Joi.number().optional(),
  duration: Joi.string().optional(),
  technologies: Joi.string().optional(),
  description: Joi.string().optional(),
  _id: Joi.string().optional(),
});

// Validation schema for skills
const skillsSchema = Joi.object({
  skillName: Joi.string().required(),
  proficiency: Joi.number().min(0).max(100).required(),
  _id: Joi.string().optional(),
});

// Validation schema for social profiles
const socialProfilesSchema = Joi.object({
  platform: Joi.string().required(),
  link: Joi.string().uri().required(),
  _id: Joi.string().optional(),
});

const cvImageSchema = Joi.object({
  data: Joi.binary().optional(),
  contentType: Joi.string().optional(),
})

// Main CV validation schema
const validateCvSchema = (req, res, next) => {
  const schema = Joi.object({
    basicDetails: basicDetailsSchema,
    education: Joi.array().items(educationSchema).optional(),
    experience: Joi.array().items(experienceSchema).optional(),
    projects: Joi.array().items(projectsSchema).optional(),
    skills: Joi.array().items(skillsSchema).optional(),
    socialProfiles: Joi.array().items(socialProfilesSchema).optional(),
    user: Joi.string().optional(), // Assuming creator is a string ObjectId
    cvImage:cvImageSchema.optional()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateIdSchema = (req, res, next) => {
  const schema = Joi.object({
    _id: Joi.string(),
  });

  const { error } = schema.validate(req.params);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateCvSchema, validateIdSchema };
