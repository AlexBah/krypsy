import Realm from 'realm';

class User extends Realm.Object {}
    User.schema = {
        name: 'User',
        properties: {
            id: 'int',
            name: 'string',
            email: 'string',
            phone: 'string',
            code: 'string',
            jwt: 'string',
            serveruserid: 'int',
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
            idinserver: 'int',
        },
        primaryKey: 'id',
    };

const getRealm = async () => {
    const realm = await Realm.open({
        schema: [User, CryptoWallet],
        schemaVersion: 2, 
    });
    return realm;
};

export { getRealm, User, CryptoWallet };
