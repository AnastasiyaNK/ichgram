import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: string;
      file?: Express.Multer.File & { path?: string };
    }
  }
}
