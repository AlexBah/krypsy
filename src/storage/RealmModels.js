// realmModels.js
import Realm from "realm";
import migrations from "./migrations";

class User extends Realm.Object {}
User.schema = {
  name: "User",
  properties: {
    id: "int",
    name: "string",
    email: "string",
    phone: "string",
    // code: 'string', // deprecated version 4
    jwt: "string",
    serveruserid: "int",
    deviceID: "int",
  },
  primaryKey: "id",
};

class CryptoWallet extends Realm.Object {}
CryptoWallet.schema = {
  name: "CryptoWallet",
  properties: {
    id: "int",
    name: "string",
    currency: "string",
    address: "string",
    password: "string",
    phrase: "string",
    value: "string",
    idinserver: "int",
  },
  primaryKey: "id",
};

const getRealm = async () => {
  const realm = await Realm.open({
    schema: [User, CryptoWallet],
    schemaVersion: 4,
    // deleteRealmIfMigrationNeeded: true // development
    migration: (oldRealm, newRealm) => {
      const oldVersion = oldRealm.schemaVersion;

      for (let version = oldVersion + 1; version <= 6; version++) {
        if (migrations[version]) {
          migrations[version](oldRealm, newRealm);
        }
      }
    },
  });
  return realm;
};

export { getRealm, User, CryptoWallet };
