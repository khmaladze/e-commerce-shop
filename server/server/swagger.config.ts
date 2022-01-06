import Joi, { Schema } from "joi";
import { OpenApiConfig } from "./documentation/open-api-documentation/parser";
import {
  AUTH_METHOD,
  AUTH_SCOPE,
} from "./documentation/open-api-documentation/utils/authSchemes";

const responseValidationSchema: Schema = Joi.object({
  success: Joi.boolean().required(),
  detail: Joi.array().items(
    Joi.object({
      label: Joi.string().required(),
      message: Joi.string().required(),
      path: Joi.array().items(Joi.string()).required(),
      type: Joi.string().required(),
    })
  ),
});
const config: OpenApiConfig = {
  requestSchemaName: "requestSchema",
  responses: {
    200: {
      schemaName: "responseSchema",
    },
    422: {
      defaultSchema: responseValidationSchema,
    },
  },
  businessLogicName: "businessLogic",
  tagsName: "TAGS",
  swaggerInitInfo: {
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    info: {
      description: "Generated Store",
      title: "Test app",
    },
    security: {
      method: AUTH_METHOD.BEARER,
      config: {
        bearerFormat: "JWT",
      },
      scope: AUTH_SCOPE.ENDPOINT,
      authMiddlewareName: "authenticate",
    },
  },
  // filter: '.*animals.*'
};

export default config;
