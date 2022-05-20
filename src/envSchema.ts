import Joi = require('joi')

export const validationSchema = Joi.object({
  APP_ENV: Joi.string().valid('development', 'production').default('development'),
  PORT: Joi.number().default(4000),
  FEATURE_TOGGLE_URL: Joi.string().required(),
  FEATURE_TOGGLE_APP_NAME: Joi.string().required(),
  FEATURE_TOGGLE_API_TOKEN: Joi.string().required(),
  FEATURE_TOGGLE_CLIENT_KEYS: Joi.string().required(),
})
