import { Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";
import { AuthenticatedRequest } from "../types/express";

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken || !decodedToken.uid) {
      return res.status(403).json({ error: "Forbidden: Invalid token" });
    }

    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || "",
    };

    next();
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
  }
};
