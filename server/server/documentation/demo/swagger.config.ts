import Joi, { Schema } from "joi";
import { OpenApiConfig } from "../open-api-documentation/parser";
import {
  AUTH_METHOD,
  AUTH_SCOPE,
} from "../open-api-documentation/utils/authSchemes";

const responseValidationSchema: Schema = Joi.object({
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
  permissions: {
    middlewareName: "permission",
    closure: "permissionMiddleware",
    paramName: "allowPermissions",
  },
  swaggerInitInfo: {
    servers: [
      {
        url: "http://localhost:8080",
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
