import makeUserDb from './user-db';
import makeAssignRoleDb from './assignRole-db';
import makeAppDb from './application-db';
import makeRolesDb from './roles-db';
import makeRefreshDb from './refresh-db';
import dotenv from 'dotenv';

dotenv.config();

const { MongoClient } = require('mongodb');
const url = process.env.USERS_DB_URL as string;
const dbName = process.env.USERS_DB_NAME;
const client = new MongoClient(url);

export async function makeDb() {
    await client.connect();
    return client.db(dbName);
}
const userDb = makeUserDb({ makeDb });
const applicationDb = makeAppDb({ makeDb });
const assignRoleDb = makeAssignRoleDb({ makeDb });
const roleDb = makeRolesDb({ makeDb });
const refreshDb = makeRefreshDb({ makeDb });

const dbService = Object.freeze({
    userDb,
    applicationDb,
    refreshDb,
    roleDb,
    assignRoleDb
});

export default dbService;

export { userDb, applicationDb, refreshDb, roleDb, assignRoleDb };
