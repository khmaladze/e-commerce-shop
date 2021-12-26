import forEach from "lodash/forEach";
import express, { Express, Request, Response } from "express";
import parser, { OpenApiConfig } from "./parser";
import { getPathSwagger, getOpenApiSchema } from "./baseSwagger";

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
