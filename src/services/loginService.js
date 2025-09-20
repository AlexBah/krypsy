// loginService.js
import AuthClient from "../cmd/restapi/authClient";
import DatabaseService from "../storage/dbProvider";

class LoginService {
  static async completeLogin(phone, code) {
    try {
      const user = await AuthClient.login(phone, code);
      console.log("Server login successful!");

      const userData = {
        name: user.name,
        email: user.email,
        jwt: user.token,
        serveruserid: user.userID,
      };

      const saved = await DatabaseService.updateUser(1, userData);

      if (!saved) {
        throw new Error("Failed to save user to local database");
      }

      console.log("User saved to the phone");
      return { success: true, userData };
    } catch (error) {
      console.error("Login failed:", error.message);
      return {
        success: false,
        error: error.message,
        step: error.step || "unknown",
      };
    }
  }
}

export default LoginService;
