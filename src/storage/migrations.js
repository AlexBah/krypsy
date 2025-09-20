// migrations.js
const migrations = {
  4: (oldRealm, newRealm) => {
    const oldUsers = oldRealm.objects("User");
    const newUsers = newRealm.objects("User");

    for (let i = 0; i < oldUsers.length; i++) {
      for (let i = 0; i < oldUsers.length; i++) {
        newUsers[i].id = oldUsers[i].id;
        newUsers[i].name = oldUsers[i].name;
        newUsers[i].email = oldUsers[i].email;
        newUsers[i].phone = oldUsers[i].phone;
        newUsers[i].jwt = oldUsers[i].jwt;
        newUsers[i].serveruserid = oldUsers[i].serveruserid;
        newUsers[i].deviceID = 0;
      }
    }
  },
};

export default migrations;
