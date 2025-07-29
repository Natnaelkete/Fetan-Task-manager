import { ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };

export default validate;
