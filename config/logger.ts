import { format, createLogger } from "winston";
import winston from "winston";

import { Request, Response } from "express";

const winstonFormat = format.printf(({ level, message, timestamp, stack }) => {
  return `${timestamp}: ${level}: ${stack || message}`;
});

export const logger = createLogger({
  level: "info",
  format: format.combine(format.timestamp(), winstonFormat),
  transports: [new winston.transports.Console()],
});
