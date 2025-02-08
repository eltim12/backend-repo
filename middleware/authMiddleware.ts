import { Response, NextFunction } from "express";
import admin from "../config/firebaseConfig";
import { AuthenticatedRequest } from "../types/express";

const db = admin.firestore();

export const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

  try {
    // Search for the user with the given token in Firestore
    const usersRef = db.collection("USERS");
    const snapshot = await usersRef.where("token", "==", token).limit(1).get();

    if (snapshot.empty) {
      return res.status(403).json({ error: "Forbidden: Invalid or expired token" });
    }

    // Extract user data and enforce the uid field
    const userData = snapshot.docs[0].data();

    if (!userData.uid) {
      return res.status(403).json({ error: "Forbidden: User data is missing UID" });
    }

    // Attach user data to request, ensuring it has at least `uid`
    req.user = {
      uid: userData.uid,
      email: userData.email, // Optional
      password: userData.password, // Optional
      token: userData.token, // Optional
    };

    next(); // Proceed to the endpoint
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
