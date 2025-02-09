import { Request, Response } from "express";
import { UserRepository } from "../repository/userCollection";
import { AuthenticatedRequest } from "../types/express";

import admin from "../config/firebaseConfig";
const db = admin.firestore();
export class UserController {
  static async fetchUserData(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized: Missing user data" });
      }

      const userId = req.user.uid;
      const userData = await UserRepository.fetchUserData(userId);

      if (!userData) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  static async updateUserData(req: AuthenticatedRequest, res: Response) {
    try {
      if (!req.user || !req.user.uid) {
        return res.status(401).json({ error: "Unauthorized: Missing user data" });
      }

      const userId = req.user.uid;
      const userData = req.body;

      await UserRepository.updateUserData(userId, userData);
      res.json({ message: "User data updated successfully" });
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  static async fetchPotentialUserData(req: Request, res: Response) {
    try {
      const lastDocId = (req.query.lastDocId as string) || "";
      const pageSize = req.query.pageSize ? String(req.query.pageSize) : "10";
  
      const potentialUserData = await UserRepository.fetchPotentialUserData(lastDocId, pageSize);
      res.json(potentialUserData);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }  

}
