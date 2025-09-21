// loginService.js
import AuthClient from "../cmd/restapi/authClient";
import DatabaseService from "../storage/dbProvider";

class LoginService {
  static async completeLogin(code) {
    try {
      // get phone of user from local mobile database
      const userTemp = await DatabaseService.getUserById(1);
      let phone;
      if (userTemp) {
        phone = userTemp.phone; 
      } else {
        console.log("User not found in local database!");
        return {
          success: false,
          error: error.message,
          step: error.step || "unknown",
        };
      }
      
      // login user in SSO service
      const user = await AuthClient.login(phone, code);
      console.log("Server login successful!");

      // Save user in local mobile database
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
