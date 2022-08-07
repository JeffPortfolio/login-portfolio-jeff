import { userDb } from '../data-access';
import { refreshDb } from '../data-access';
import { roleDb } from '../data-access';
import { applicationDb } from '../data-access';
import { assignRoleDb } from '../data-access';
import makeAddUser from './addUser';
import makeAddApp from './addApp';
import makeAddRefresh from './addRefresh';
import makeAddRole from './addRole';
import makeAddRoleAssign from './addRoleAssign';
import makeGetUserByEmail from './getUserEmail';
import makeGetUserById from './getUserId';
import makeGetAppById from './getAppId';
import makeGetAppByName from './getAppName';
import makeGetRoleById from './getRoleById';
import makeGetRoleAssignById from './getRoleAssignById';
import makeGetRefreshById from './getRefreshId';
import makeGetCurrentRefresh from './getCurrentRefresh';
import makeGetAppList from './getAppList';
import makeGetUserList from './getUserList';
import makeGetUser from './getUser';
import makeGetRefreshByUser from './getRefreshByUser';
import makeExpireRefreshByUser from './expireRefreshByUser';
import makeExpireRefreshById from './expireRefreshById';

const addUser = makeAddUser({ userDb });
const addApp = makeAddApp({ applicationDb });
const addRefresh = makeAddRefresh({ refreshDb });
const addRole = makeAddRole({ roleDb });
const addRoleAssign = makeAddRoleAssign({ assignRoleDb });

const getUserByEmail = makeGetUserByEmail({ userDb });
const getUserById = makeGetUserById({ userDb });
const getAppById = makeGetAppById({ applicationDb });
const getAppByName = makeGetAppByName({ applicationDb });
const getRoleById = makeGetRoleById({ roleDb });
const getCurrentRefresh = makeGetCurrentRefresh({ refreshDb });
const getRefreshById = makeGetRefreshById({ refreshDb });
const getRoleAssignById = makeGetRoleAssignById({ assignRoleDb });

const getAppList = makeGetAppList({ applicationDb });
const getUserList = makeGetUserList({ userDb });

const getUser = makeGetUser({ userDb });
const getRefreshByUser = makeGetRefreshByUser({ refreshDb });
const expireRefreshByUser = makeExpireRefreshByUser({ refreshDb });
const expireRefreshById = makeExpireRefreshById({ refreshDb });

const usersService = Object.freeze({
    addUser,
    addApp,
    addRefresh,
    addRole,
    getUserByEmail,
    getUserById,
    getRoleById,
    getAppById,
    getAppByName,
    getCurrentRefresh,
    getRefreshById,
    addRoleAssign,
    getRoleAssignById,
    getAppList,
    getUserList,
    getUser,
    getRefreshByUser,
    expireRefreshByUser,
    expireRefreshById
});

export default usersService;
export {
    addUser,
    addApp,
    addRefresh,
    addRole,
    getUserByEmail,
    getUserById,
    getRoleById,
    getAppById,
    getAppByName,
    getCurrentRefresh,
    getRefreshById,
    addRoleAssign,
    getRoleAssignById,
    getAppList,
    getUserList,
    getUser,
    getRefreshByUser,
    expireRefreshByUser,
    expireRefreshById
};
