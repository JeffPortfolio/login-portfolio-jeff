// import { addUser, getProject, addProject, addRole, addRefresh, getUser, getRole, getRefresh, getRefreshById } from '../use-cases';
// import makeRegisterUser from './register-user';
// import makeRegisterProject from './register-project';
import makeLoginUser from './loginUser';
// import makeLogoutUser from './logout-user';
// import makeRegisterRole from './register-role';
// import makeRefreshToken from './refresh-token';
// import makeUserLoggedIn from './user-logged-in';
import { addApp, getAppByName, getAppList, addUser, getAppById, getUserList, getUser, addRefresh, getRefreshById, getRefreshByUser, getUserById } from '../use-cases';
import makeRegisterApplication from './registerApplication';
import makeAllApplications from './listApplications';
import makeRegisterUser from './registerUser';
import makeUserLoggedIn from './userLoggedIn';
import makeAllUsers from './listUsers';
import makeRefreshToken from './refreshToken';
import makeLogoutUser from './logoutUser';

const registerApplication = makeRegisterApplication({ addApp, getAppByName });
const allApplications = makeAllApplications({ getAppList });
const registerUser = makeRegisterUser(addUser, addRefresh);
const userLoggedIn = makeUserLoggedIn();
const allUsers = makeAllUsers({ getUserList });
// const registerProject = makeRegisterProject({ addProject });
const loginUser = makeLoginUser(getUser, getRefreshByUser);
const logoutUser = makeLogoutUser();
// const logoutUser = makeLogoutUser();
// const registerRole = makeRegisterRole({ getUser, getProject, addRole });
// const refreshToken = makeRefreshToken({ getProject, getRole, getRefreshById, addRefresh });
const refreshToken = makeRefreshToken({ getRefreshById, getUserById });
// const userLoggedIn = makeUserLoggedIn();

const userController = Object.freeze({
    registerApplication,
    allApplications,
    registerUser,
    allUsers,
    //     registerProject,
    loginUser,
    logoutUser,
    //     registerRole,
    refreshToken,
    userLoggedIn
});

export default userController;
export { registerApplication, allApplications, registerUser, userLoggedIn, allUsers, loginUser, refreshToken, logoutUser };
// export { registerUser, registerProject, loginUser, logoutUser, registerRole, refreshToken, userLoggedIn };
