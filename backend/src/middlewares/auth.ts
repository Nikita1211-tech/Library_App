import { Errback, NextFunction, Request, Response } from "express";

const jwt = require("jsonwebtoken");

const authenticateJWT = (req: any, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  console.log(token);
  if (!token) {
    return res.status(401).json({ mesage: "Unauthorized" });
  }
  const tokenWithoutBearer = token.slice(7);
  console.log(tokenWithoutBearer);
  jwt.verify(
    tokenWithoutBearer,
    process.env.JWT_SECRET,
    (err: Errback, user: any) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(401).json({ message: "Token expired" });
        } else {
          return res.status(403).json({ message: "Forbidden" });
        }
      }
      req.user = user;
      next();
    }
  );
};

export { authenticateJWT };
