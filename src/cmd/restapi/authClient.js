// authClient.js
import RestAPI from "../config/ConfigRestAPI";

class AuthClient {
  static async register(phone, password) {
    const response = await fetch(`${RestAPI.address}/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.user_id;
  }

  static async login(phone, password) {
    const response = await fetch(`${RestAPI.address}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, password, app_id: RestAPI.appID }),
    });

    if (!response.ok) {
      throw new Error(`Login failed: ${response.statusText}`);
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
    const response = await fetch(`${RestAPI.address}/v1/auth/admin/${userId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`Admin check failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.is_admin;
  }

  static async getUser(phone) {
    const response = await fetch(
      `${RestAPI.address}/v1/users/${phone.replace(/[^0-9+]/g, "")}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      },
    );

    if (!response.ok) {
      throw new Error(`Get user failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.name;
  }

  static async updateUser(userId, name, email, phone, password, token) {
    const response = await fetch(`${RestAPI.address}/v1/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  }

  static async deleteUser(phone, token) {
    const response = await fetch(
      `${RestAPI.address}/v1/users/${phone.replace(/[^0-9+]/g, "")}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  }
}

export default AuthClient;
