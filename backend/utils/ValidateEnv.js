// utils/validateEnv.js
const Joi = require('joi');

const validateEnv = () => {
  const envSchema = Joi.object({
    PORT: Joi.number().default(5000),
    MONGO_URI_MAIN: Joi.string().uri().required(),
    MONGO_URI_CONTACTS: Joi.string().uri().required(),
    JWT_SECRET_KEY: Joi.string().required(),
  });

  const { error, value } = envSchema.validate(process.env, { allowUnknown: true });

  if (error) {
    throw new Error(`Environment variable validation error: ${error.message}`);
  }

  return value;
};

module.exports = { validateEnv };
