// registrService.js
import AuthClient from "../cmd/restapi/authClient";
import DatabaseService from "../storage/dbProvider";

class RegistrService {
  static async completeRegistration(phone, code) {
    const op = "RegistrService.completeRegistration: "

    // todo: new deviceID
    try {
      const serveruserid = await AuthClient.register(phone, code);
      console.log(op + "Server registration successful!");

      const userData = {
        id: 1,
        phone: phone,
        serveruserid: serveruserid,
      };

      const saved = await DatabaseService.addUser(userData);

      if (!saved) {
        throw new Error(op + "Failed to save user to local database");
      }

      console.log(op + "User saved to the phone");
      return { success: true, serveruserid, userData };
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

export default RegistrService;
