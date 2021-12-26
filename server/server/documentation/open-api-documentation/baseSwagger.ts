import joiToSwagger from "joi-to-swagger";
import Joi from "joi";
import { includes, isEmpty, map } from "lodash";
import getSecurityScheme, {
  AUTH_METHOD,
  AUTH_SCOPE,
  IAuthenticationSchemeConfig,
} from "./utils/authSchemes";

interface ExternalDocsS {
  name?: string; // Apache 2.0
  url: string; // http://www.apache.org/licenses/LICENSE-2.0.html
  description: string;
}

interface License {
  name: string; // Apache 2.0
  url: string; // http://www.apache.org/licenses/LICENSE-2.0.html
}

interface OpenApiTag {
  name: string; // Apache 2.0
  description: string;
  externalDocs?: ExternalDocsS;
}

interface Contact {
  email: string; // apiteam@swagger.io
}

interface OpenApiInfo {
  description?: string; // This is a sample Pet Store
  version?: string; // 1.0.6-SNAPSHOT
  title?: string; // Swagger Petstore - OpenAPI 3.0
  termsOfService?: string; // http://swagger.io/terms/
  contact?: Contact; // http://swagger.io/terms/
  license?: License; // http://swagger.io/terms/
}

interface OpenApiServer {
  url: string; // '/v3'
}

interface ISchema {}

interface IResponse {
  description?: string;
  content: any;
  "application/json"?: ISchema;
  "application/xml"?: ISchema;
}

interface OpenApiRequestBody {
  description: string;
  required: boolean;
  content: any;
  operationId: string;
  responses: {
    "200": IResponse;
  };
  security: any[];
  requestBody: any[];
}

interface OpenApiRequest {
  tags: string[];
  summary: string;
  description: string;
  operationId: string;
  responses: {
    "200"?: IResponse;
    "405"?: IResponse;
  };
  security: any[];
  requestBody: OpenApiRequestBody;
}

interface OpenApiComponents {
  schemas: any;
  requestBodies?: string;
  securitySchemes?: any;
}

interface OpenApiPathMethods {
  get?: OpenApiRequest;
  post?: OpenApiRequest;
  put?: OpenApiRequest;
  delete?: OpenApiRequest;
  patch?: OpenApiRequest;
}

interface OpenApiPath {
  [key: string]: OpenApiPathMethods;
}

interface Security {
  method: AUTH_METHOD;
  config?: IAuthenticationSchemeConfig;
  scope: AUTH_SCOPE;
  authMiddlewareName?: string;
}

export interface OpenApi {
  openapi: string; // '3.0.2'
  servers: OpenApiServer[]; // '3.0.2'
  info: OpenApiInfo;
  tags?: OpenApiTag[];
  paths: OpenApiPath; // requests
  components: OpenApiComponents;
  security: any;
}

export const getPathSchema: any = (
  pathName: string,
  methodsOfPaths: OpenApiPathMethods
) => ({
  [pathName]: {
    ...methodsOfPaths,
  },
});

export interface OpenApiInit {
  servers: OpenApiServer[];
  info: OpenApiInfo;
  tags?: OpenApiTag[];
  security?: Security;
}

export interface SwaggerSchemaInput {
  paths: OpenApiPath;
  schemas?: any;
  openApiInit: OpenApiInit;
}

export function getOpenApiSchema(input: SwaggerSchemaInput): OpenApi {
  const { schemas, paths, openApiInit } = input;

  return {
    openapi: "3.0.3",
    servers: openApiInit.servers,
    info: {
      ...openApiInit.info,
    },
    tags: openApiInit.tags,
    paths,
    components: {
      securitySchemes: openApiInit?.security
        ? {
            ...getSecurityScheme(
              openApiInit.security.method,
              openApiInit.security.config
            ),
          }
        : {},
      schemas,
    },
    security:
      openApiInit?.security?.scope === AUTH_SCOPE.GLOBAL
        ? [{ [openApiInit?.security.method]: [] }]
        : [],
  };
}

export type methodType = "get" | "post" | "patch" | "delete" | "put";

export function getBaseMethod(
  method: methodType,
  tags: string[],
  security: any,
  headerParameterArray: any,
  pathParameterArray: any,
  queryParameterSchema: any,
  responses: any,
  requestBody: any,
  summary: string,
  description?: string
): OpenApiPathMethods {
  let requestBodyObject: any = null;
  if (requestBody) {
    requestBodyObject = {
      requestBody: {
        content: {
          "application/json": {
            schema: requestBody,
          },
        },
      },
    };
  }

  return {
    [method]: {
      tags,
      security,
      summary,
      description,
      parameters: [
        ...headerParameterArray,
        ...pathParameterArray,
        ...queryParameterSchema,
      ],
      responses,
      ...requestBodyObject,
    },
  };
}

interface Response {
  outputJoiSchema: any;
  code: 200 | 300 | 400 | 401;
}

interface SwaggerMethod {
  method: methodType;
  responses: Response[];
  requestJoiSchema?: any;
  permissions?: any;
  security: any;
  tags: string[];
}

interface SwaggerInput {
  path: string;
  methods: SwaggerMethod[];
  security: any;
}

export type ResponseCode = 200 | 300 | 400 | 401 | 403 | 404 | 409;

export const createJsonResponse = (
  responseSchema: any,
  code: ResponseCode, // TODO: add more response codes
  description?: string
) => ({
  [code]: {
    description: description || "Success response",
    content: {
      "application/json": {
        schema: responseSchema,
      },
    },
  },
});

export const createCustomResponse = (
  responseSchema: any,
  code: ResponseCode // TODO: add more response codes
) => ({
  [code]: {
    ...responseSchema,
  },
});

const prepAlternativesArray = (alts: any[]) =>
  alts.reduce(
    (acc: any, curr: any, index: number) => {
      acc[`option_${index}`] = curr;
      return acc;
    },
    {
      warning: {
        type: "string",
        enum: [".alternatives() object - select 1 option only"],
      },
    }
  );

const getPermissionDescription = (permissions: string[]): string => {
  const permissionsResult = "PERMISSION:";
  if (!isEmpty(permissions)) {
    return `${permissionsResult} [${permissions.join(", ")}]`;
  }
  return `${permissionsResult} NO`;
};

export function getPathSwagger(swagger: SwaggerInput) {
  const { path, methods } = swagger;

  const methodsSwaggerObjects = methods
    .map((data: SwaggerMethod) => {
      try {
        const {
          method,
          responses,
          requestJoiSchema,
          permissions: permissionObject,
          security,
          tags,
        } = data;

        const responsesSwagger = responses
          .map((response: Response) => {
            const { outputJoiSchema, code } = response;
            if (Joi.isSchema(outputJoiSchema)) {
              const { swagger: responseSwagger } = joiToSwagger(
                outputJoiSchema,
                undefined
              );
              return createJsonResponse(responseSwagger, code);
            } else {
              return createCustomResponse(outputJoiSchema, code);
            }
          })
          .reduce(
            (previousValue, currentValue) => ({
              ...previousValue,
              ...currentValue,
            }),
            {}
          );

        // if request does not register schema, the empty one is needed
        const requestSchema =
          requestJoiSchema ||
          Joi.object().keys({
            body: Joi.object(),
            query: Joi.object(),
            params: Joi.object(),
            headers: Joi.object(),
          });

        const { swagger: requestSwagger } = joiToSwagger(
          requestSchema,
          undefined
        );

        const headerParameterArray =
          map(
            requestSwagger.properties.headers?.properties,
            (schema, name) => ({
              name,
              in: "header",
              schema,
              required: includes(
                requestSwagger.properties.headers.required,
                name
              ),
            })
          ) || [];

        const queryParameterArray =
          map(requestSwagger.properties.query?.properties, (schema, name) => ({
            name,
            in: "query",
            schema,
            required: includes(requestSwagger.properties.query.required, name),
          })) || [];

        const pathParameterArray =
          map(requestSwagger.properties.params?.properties, (schema, name) => ({
            name,
            in: "path",
            required: true,
            schema,
          })) || [];

        let requestBody: {
          type: string;
          properties: any;
          required: boolean;
        } = {
          type: "",
          properties: {},
          required: false,
        };
        if (method !== "get" && method !== "delete") {
          requestBody = {
            type: "object",
            properties: requestSwagger.properties.body.anyOf
              ? prepAlternativesArray(requestSwagger.properties.body.anyOf)
              : requestSwagger.properties.body.properties,
            required: requestSwagger.properties.body.required,
          };
        }

        const permissionDescriptions =
          getPermissionDescription(permissionObject);
        const { description } = requestSwagger;

        return getBaseMethod(
          method,
          tags,
          security,
          headerParameterArray,
          pathParameterArray,
          queryParameterArray,
          responsesSwagger,
          requestBody,
          permissionDescriptions,
          description
        );
      } catch (e) {
        console.log(`ERROR with method:${data.method} ${path}`, e);
        return null;
      }
    })
    .reduce(
      (previousValue, currentValue) => ({
        ...previousValue,
        ...currentValue,
      }),
      {}
    );

  return getPathSchema(path, methodsSwaggerObjects);
}
