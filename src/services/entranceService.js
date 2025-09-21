// entranceService.js
import AuthClient from "../cmd/restapi/authClient";
import DatabaseService from "../storage/dbProvider";

class EntranceService {
  static async completeEntrance(phone) {
    // todo: new deviceID
    try {
      const userData = {
        id: 1,
        phone: phone,
      };

      const saved = await DatabaseService.addUser(userData);

      if (!saved) {
        throw new Error("Failed to save user to local database");
      }

      console.log("User saved to the phone");
      return { success: true, userData };
    } catch (error) {
      console.error("Registration failed:", error.message);
      return {
        success: false,
        error: error.message,
        step: error.step || "unknown",
      };
    }
  }
}

export default EntranceService;
