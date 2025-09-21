// entranceService.js
import DatabaseService from "../storage/dbProvider";

class EntranceService {
  static async completeEntrance(phone) {
    const op = "EntranceService.completeEntrance: "

    // todo: new deviceID
    try {
      const userData = {
        id: 1,
        phone: phone,
      };

      const saved = await DatabaseService.addUser(userData);

      if (!saved) {
        throw new Error(op + "Failed to save user to local database");
      }

      console.log(op + "User saved to the phone");
      return { success: true, userData };
    } catch (error) {
      console.error(op + "Registration failed:", error.message);
      return {
        success: false,
        error: error.message,
        step: error.step || "unknown",
      };
    }
  }
}

export default EntranceService;
