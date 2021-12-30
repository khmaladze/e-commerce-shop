// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import asyncHandler from "express-async-handler";

const options = {
  abortEarly: false,
};

export default (schema: Schema) =>
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!schema) {
      throw new Error("Validation schema is not provided");
    }
    const { query, body, params } = req;

    Object.keys(query || {}).forEach((key) => {
      if (query[key] === "null") {
        query[key] = undefined;
      }
    });
    try {
      let val = {} as any;
      if (req.method === "GET" || req.method === "HEAD") {
        val = await schema.validateAsync({ query, params }, options);
      } else {
        val = await schema.validateAsync({ query, body, params }, options);
      }
      req.params = val.params;
      req.query = val.query;
      // console.log(JSON.stringify(val, null, 2));
    } catch (error) {
      if (Joi.isError(error)) {
        const resp422 = {
          success: false,
          detail: error.details.map((item: any) => ({
            label: item.context.label,
            message: item.message,
            path: item.path,
            type: item.type,
          })),
        };
        res.status(422).json(resp422);
        return;
      }
      if (error instanceof Error) {
        res.status(422).json({
          success: false,
          error: error.message,
        });
        return;
      }
      // todo loging it
      res.status(500).json({
        success: false,
        error: "Invalid server error",
      });
      return;
    }
    next();
  });
