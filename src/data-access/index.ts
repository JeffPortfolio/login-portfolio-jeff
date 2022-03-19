// import makeUserDb from './user-db';
// import makeProjectDb from './project-db';
// import makeRefreshDb from './refresh-db';
// import makeRolesDb from './roles.db';
import makeUserDbStub from './stubs/user-db-stub';
import makeApplicationDbStub from './stubs/application-db-stub';
import makeRefreshDbStub from './stubs/refresh-token-db-stub';
import makeRoleDbStub from './stubs/role-db-stub';
import makeAssignRoleDbStub from './stubs/assignRole-db-stub';
import dotenv from 'dotenv';

dotenv.config();

// const { MongoClient } = require('mongodb');
// const url = process.env.USERS_DB_URL as string;
// const dbName = process.env.USERS_DB_NAME;
// const client = new MongoClient(url);

// export async function makeDb() {
//     // if (!client.isConnected()) {
//     await client.connect();
//     // }
//     return client.db(dbName);
// }
// const userDb = makeUserDb({ makeDb });
// const projectDb = makeProjectDb({ makeDb });
// const refreshDb = makeRefreshDb({ makeDb });
// const roleDb = makeRolesDb({ makeDb });

const userDb = makeUserDbStub();
const applicationDb = makeApplicationDbStub();
const refreshDb = makeRefreshDbStub();
const roleDb = makeRoleDbStub();
const assignRoleDb = makeAssignRoleDbStub();

const dbService = Object.freeze({
    userDb,
    applicationDb,
    refreshDb,
    roleDb,
    assignRoleDb
});

export default dbService;

export { userDb, applicationDb, refreshDb, roleDb, assignRoleDb };
