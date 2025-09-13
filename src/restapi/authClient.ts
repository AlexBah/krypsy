import RestAPI from "../cmd/config/ConfigRestAPI";

export class AuthClient {

  static async register(phone: string, password: string): Promise<number> {
    const response = await fetch(`${RestAPI.address}/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password }),
    });

    if (!response.ok) {
      throw new Error(`Registration failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.user_id;
  }

  static async login(phone: string, password: string,): 
  Promise<{ name: string; email: string; token: string; userId: number }> {
    const response = await fetch(`${RestAPI.address}/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      userId: data.user_id
    };
  }

  static async isAdmin(userId: number): Promise<boolean> {
    const response = await fetch(`${RestAPI.address}/v1/auth/admin/${userId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Admin check failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.is_admin;
  }

  static async getUser(phone: string): Promise<string> {
    const response = await fetch(`${RestAPI.address}/v1/users/${phone.replace(/[^0-9+]/g, '')}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error(`Get user failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.name; 
  }

  static async updateUser(
    userId: number,
    name: string,
    email: string,
    phone: string,
    password: string,
    token: string
  ): Promise<boolean> {
    const response = await fetch(`${RestAPI.address}/v1/users/${userId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, email, phone, password }),
    });

    if (!response.ok) {
      throw new Error(`Update failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success; 
  }

  static async deleteUser(phone: string, token: string): Promise<boolean> {
    const response = await fetch(`${RestAPI.address}/v1/users/${phone.replace(/[^0-9+]/g, '')}`, {
      method: 'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error(`Delete failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.success;
  }
  
}
