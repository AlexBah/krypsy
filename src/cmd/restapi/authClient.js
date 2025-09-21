// authClient.js
import RestAPI from "../config/ConfigRestAPI";

class AuthClient {
  static async register(phone, password) {
    const op = "AuthClient.register: "
    const clearPhone = phone.replace(/[^0-9+]/g, "");

    const response = await fetch(`${RestAPI.address}/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clearPhone, password }),
    });

    if (!response.ok) {
      throw new Error(op + `Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.user_id;
  }

  static async login(phone, password) {
    const op = "AuthClient.login: "
    const clearPhone = phone.replace(/[^0-9+]/g, "");
    
    const response = await fetch(`${RestAPI.address}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ clearPhone, password, app_id: RestAPI.appID }),
    });

    if (!response.ok) {
      throw new Error(op + `Login failed in authClient: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      name: data.name,
      email: data.email,
      token: data.token,
      userID: data.user_id,
    };
  }

  static async isAdmin(userId) {
    const op = "AuthClient.isAdmin: "

    const response = await fetch(`${RestAPI.address}/v1/auth/admin/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(op + `Admin check failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.is_admin;
  }

  static async getUser(phone) {
    const op = "AuthClient.getUser: "
    const clearPhone = phone.replace(/[^0-9+]/g, "");

    const response = await fetch(
      `${RestAPI.address}/v1/users/${clearPhone}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error(op + `Get user failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.name;
  }

  static async updateUser(userId, name, email, phone, password, token) {
    const op = "AuthClient.updateUser: "
    const clearPhone = phone.replace(/[^0-9+]/g, "");

    const response = await fetch(`${RestAPI.address}/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, clearPhone, password }),
    });

    if (!response.ok) {
      throw new Error(op + `Update failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  }

  static async deleteUser(phone, token) {
    const op = "AuthClient.deleteUser: "
    const clearPhone = phone.replace(/[^0-9+]/g, "");

    const response = await fetch(
      `${RestAPI.address}/v1/users/${clearPhone}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(op + `Delete failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  }
}

export default AuthClient;
