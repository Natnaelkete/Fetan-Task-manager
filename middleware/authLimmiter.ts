import { RateLimiterMemory } from "rate-limiter-flexible";
import { Request, Response, NextFunction } from "express";

interface RateLimitError {
  status: number;
  message: string;
  retryAfter: number;
}

const ipRateLimiter = new RateLimiterMemory({
  keyPrefix: "ip",
  points: 100, // 100 requests per day
  duration: 24 * 60 * 60, // 24 hours
  blockDuration: 24 * 60 * 60, // Block for 24 hours after limit
});

const emailRateLimiter = new RateLimiterMemory({
  keyPrefix: "email",
  points: 10, // 10 login attempts
  duration: 15 * 60, // per 15 minutes
  blockDuration: 15 * 60, // Block for 15 minutes after limit
});

const emailIpRateLimiter = new RateLimiterMemory({
  keyPrefix: "email-ip",
  points: 10, // 10 attempts per email+IP
  duration: 15 * 60, // per 15 minutes
  blockDuration: 15 * 60, // Block for 15 minutes after limit
});

const authLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // IP rate limiting
    await ipRateLimiter.consume(req.ip as any).catch((rateLimiterRes) => {
      throw {
        status: 429,
        message:
          "You have reached the maximum daily limit of 100 requests. Please try again tomorrow.",
        retryAfter: rateLimiterRes.msBeforeNext / 1000,
      } as RateLimitError;
    });

    // Email rate limiting
    const emailKey: string = req.body.email || "unknown";
    await emailRateLimiter.consume(emailKey).catch((rateLimiterRes) => {
      throw {
        status: 429,
        message:
          "You have reached the maximum of 10 login attempts. Please try again in 15 minutes.",
        retryAfter: rateLimiterRes.msBeforeNext / 1000,
      } as RateLimitError;
    });

    // Email+IP rate limiting
    const emailIpKey: string = `${emailKey}:${req.ip}`;
    await emailIpRateLimiter.consume(emailIpKey).catch((rateLimiterRes) => {
      throw {
        status: 429,
        message:
          "You have reached the maximum of 10 login attempts for this email and IP. Please try again in 15 minutes.",
        retryAfter: rateLimiterRes.msBeforeNext / 1000,
      } as RateLimitError;
    });

    next();
  } catch (error) {
    const rateLimitError = error as RateLimitError;
    res.status(rateLimitError.status || 429).json({
      error:
        rateLimitError.message || "Too many requests, please try again later",
      retryAfter: rateLimitError.retryAfter || 0,
    });
  }
};

export default authLimiter;
