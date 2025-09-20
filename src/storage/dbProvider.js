// dbProvider.js
import { getRealm, User, CryptoWallet } from "./realmModels";

class DatabaseService {
  // ===== USER OPERATIONS =====

  static async addUser(userData) {
    try {
      const realm = await getRealm();

      const clear = await DatabaseService.deleteAllUsers();
      if (!clear) {
        console.error("Failed to clear users table:", error);
        return false;
      }

      realm.write(() => {
        realm.create("User", {
          id: userData.id || 1,
          name: userData.name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          jwt: userData.jwt || "",
          serveruserid: userData.serveruserid || 0,
          deviceID: userData.deviceID || 0,
        });
      });

      return true;
    } catch (error) {
      console.error("Error adding user:", error);
      return false;
    }
  }

  static async getAllUsers() {
    try {
      const realm = await getRealm();
      const users = realm.objects("User");
      return Array.from(users);
    } catch (error) {
      console.error("Error getting users:", error);
      return [];
    }
  }

  static async getUserById(id) {
    try {
      const realm = await getRealm();
      const user = realm.objectForPrimaryKey("User", id);
      return user ? user.toJSON() : null;
    } catch (error) {
      console.error("Error getting user by ID:", error);
      return null;
    }
  }

  static async updateUser(id, updates) {
    try {
      const realm = await getRealm();

      realm.write(() => {
        const user = realm.objectForPrimaryKey("User", id);
        if (user) {
          Object.keys(updates).forEach((key) => {
            if (key !== "id" && user.hasOwnProperty(key)) {
              user[key] = updates[key];
            }
          });
        }
      });

      return true;
    } catch (error) {
      console.error("Error updating user:", error);
      return false;
    }
  }

  static async deleteUser(id) {
    try {
      const realm = await getRealm();

      realm.write(() => {
        const user = realm.objectForPrimaryKey("User", id);
        if (user) {
          realm.delete(user);
        }
      });

      return true;
    } catch (error) {
      console.error("Error deleting user:", error);
      return false;
    }
  }

  static async deleteAllUsers() {
    try {
      const realm = await getRealm();

      realm.write(() => {
        const allUsers = realm.objects("User");
        realm.delete(allUsers);
      });

      return true;
    } catch (error) {
      console.error("Error deleting all users:", error);
      return false;
    }
  }

  // ===== CRYPTO WALLET OPERATIONS =====

  static async addCryptoWallet(walletData) {
    try {
      const realm = await getRealm();

      realm.write(() => {
        realm.create("CryptoWallet", {
          id: walletData.id || Date.now(), // todo: new generator
          name: walletData.name || "",
          currency: walletData.currency || "",
          address: walletData.address || "",
          password: walletData.password || "",
          phrase: walletData.phrase || "",
          value: walletData.value || "",
          idinserver: walletData.idinserver || 0,
        });
      });

      return true;
    } catch (error) {
      console.error("Error adding crypto wallet:", error);
      return false;
    }
  }

  static async getAllCryptoWallets() {
    try {
      const realm = await getRealm();
      const wallets = realm.objects("CryptoWallet");
      return Array.from(wallets);
    } catch (error) {
      console.error("Error getting crypto wallets:", error);
      return [];
    }
  }

  static async deleteAllCryptoWallets() {
    try {
      const realm = await getRealm();

      realm.write(() => {
        const allWallets = realm.objects("CryptoWallet");
        realm.delete(allWallets);
      });

      return true;
    } catch (error) {
      console.error("Error deleting all crypto wallets:", error);
      return false;
    }
  }

  static async clearDatabase() {
    try {
      const usersDeleted = await this.deleteAllUsers();
      const walletsDeleted = await this.deleteAllCryptoWallets();
      return usersDeleted && walletsDeleted;
    } catch (error) {
      console.error("Error clearing database:", error);
      return false;
    }
  }
}

export default DatabaseService;
