import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import buildMakeApp from './application';
import buildMakeUser from './user';
import buildMakeRole from './role';
import buildMakeRefreshToken from './refreshToken';
import buildMakeRoleAssign from './roleAssign';

dotenv.config();

const makeApp = buildMakeApp({ nanoid, hashPassword });

const makeUser = buildMakeUser({ nanoid, hashPassword });
const makeRole = buildMakeRole();
const makeRefreshToken = buildMakeRefreshToken({ nanoid, hashPassword });
const makeRoleAssign = buildMakeRoleAssign({ nanoid });

const entityService = Object.freeze({
    makeApp,
    makeUser,
    makeRole,
    makeRefreshToken,
    makeRoleAssign
});

function hashPassword(password: string) {
    const salt = parseInt(process.env.HASH_SALT as string, 10);
    return bcrypt.hashSync(password, salt);
}

export default entityService;
export { makeApp, makeUser, makeRole, makeRefreshToken, makeRoleAssign };
