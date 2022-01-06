// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from "joi";
import asyncHandler from "express-async-handler";

const options = {
  abortEarly: false,
  convert: false,
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
      await schema.validateAsync({ query, body, params }, options);
    } catch (error) {
      if (Joi.isError(error)) {
        const resp422 = {
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
          error: error.message,
        });
        return;
      }
      // todo loging it
      res.status(500).json({
        error: "Invalid server error",
      });
      return;
    }
    next();
  });
