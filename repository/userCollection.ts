import { db } from "../config/firebaseConfig";
import { User } from "../entities/user";

const USERS_COLLECTION = "USERS";

export class UserRepository {
  static async fetchUserData(userId: string): Promise<User | null> {
    const userDoc = await db.collection(USERS_COLLECTION).doc(userId).get();
    return userDoc.exists ? (userDoc.data() as User) : null;
  }

  static async updateUserData(userId: string, data: Partial<User>): Promise<void> {
    await db.collection(USERS_COLLECTION).doc(userId).set(data, { merge: true });
  }
}
