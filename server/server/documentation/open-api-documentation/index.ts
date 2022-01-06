import forEach from "lodash/forEach";
import express, { Express, Request, Response } from "express";
import parser, { OpenApiConfig } from "./parser";
import { getPathSwagger, getOpenApiSchema } from "./baseSwagger";
import swaggerUi from "swagger-ui-express";

export const getOpenApiSchemaJson = async (
  app: Express,
  config: OpenApiConfig
) => {
  const endpoints = await parser(app, config);
  let resultSwagger = {};
  forEach(endpoints, (endpoint) => {
    resultSwagger = {
      ...resultSwagger,
      ...getPathSwagger(endpoint),
    };
  });
  return getOpenApiSchema({
    paths: resultSwagger,
    openApiInit: config.swaggerInitInfo,
  });
};

export const getOpenApiSchemaRouter = (app: Express, config: OpenApiConfig) => {
  let respSwagger = {};
  void getOpenApiSchemaJson(app, config).then((schema) => {
    respSwagger = schema;
  });
  const router = express.Router();
  router.get("/openapi/schema.json", (req: Request, res: Response) => {
    res.send(respSwagger);
  });
  return router;
};

export const getSwaggerUiRouter = (app: Express, config: OpenApiConfig) => {
  let respSwagger = {};
  void getOpenApiSchemaJson(app, config).then((schema) => {
    respSwagger = schema;
  });

  const router = express.Router();

  router.use("/docs", swaggerUi.serve, async (req: Request, res: Response) => {
    return res.send(swaggerUi.generateHTML(respSwagger));
  });

  router.get("/openapi/schema.json", (req: Request, res: Response) => {
    res.send(respSwagger);
  });
  return router;
};
