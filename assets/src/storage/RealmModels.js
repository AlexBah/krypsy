import Realm from 'realm';

class User extends Realm.Object {}
    User.schema = {
        name: 'User',
        properties: {
            id: 'int',
            name: 'string',
            email: 'string',
            phone: 'string',
            jwt: 'string',
        },
        primaryKey: 'id',
    };

class CryptoWallet extends Realm.Object {}
    CryptoWallet.schema = {
        name: 'CryptoWallet',
        properties: {
            id: 'int',
            name: 'string',
            currency: 'string',
            address: 'string',
            password: 'string',
            phrase: 'string',
            value: 'string',
        },
        primaryKey: 'id',
    };

const getRealm = async () => {
    return await Realm.open({
        schema: [User.schema, CryptoWallet.schema],
        schemaVersion: 1,
    });
};

export { getRealm, User, CryptoWallet };
