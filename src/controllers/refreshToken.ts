import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function makeRefreshToken(getRefreshById: any, getUserById: any, getAppByName: any, getRolesByAppId: any, getRoleAssignsByUserRoleId: any) {
    return async function refreshToken(httpRequest: any) {
        let roles = [1971];
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            const { appName } = httpRequest.body;
            if (!appName) return { statusCode: 400, body: false };

            const refreshToken = httpRequest.refreshToken;
            if (!refreshToken) return { statusCode: 200, body: 'No Refresh Token' };

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

            const parts = refreshToken.split('.');
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
            const token = await getRefreshById(payload['aud']);

            let expString = token.expiration.getTime().toString();
            let testRefresh = `${token.refreshId}\\O/${expString}`;
            const refreshCheck = await bcrypt.compare(testRefresh, token.hash);

            if (token.refreshId !== payload['aud'] || !refreshCheck) {
                return { statusCode: 200, body: 'No Refresh Token' };
            }

            let tokenUser = await getUserById(token.userId);

            const app = await getAppByName({ appName });
            if (!app) return { statusCode: 401, body: 'Application is not in Universe.' };

            const rolesForApp = await getRolesByAppId(app.appId);
            if (rolesForApp != undefined && rolesForApp.length > 0) {
                let rolesList: any[] = [];
                rolesForApp.forEach((role: any) => {
                    rolesList.push(role.roleId);
                });
                let userRoles = await getRoleAssignsByUserRoleId(tokenUser.userId, rolesList);
                if (userRoles != undefined && userRoles.length > 0) {
                    userRoles.forEach((role: any) => {
                        roles.push(role.roleId);
                    });
                }
            }

            const accessToken = jwt.sign(
                {
                    aud: app.appId,
                    sub: tokenUser.userId,
                    user: tokenUser.userName,
                    roles: roles
                },
                app.appKey
            );

            // TODO: Add a procedure to create a new refresh token if expiration is within a day

            // if (token.expiration - currDate.getTime() < 86400000) {
            //     let addToken = await addRefresh({ userId: token.userId });
            //     let existingToken = addToken.token;

            //     newToken = jwt.sign(
            //         {
            //             id: existingToken._id,
            //             sub: existingToken.userId,
            //             refresh: existingToken.hash
            //         },
            //         process.env.JWT_SECRET as string
            //     );

            //     newTokenExpire = existingToken.expiration;
            // }

            return {
                statusCode: 200,
                body: 'Success',
                accessToken: accessToken,
                accessExpire: new Date(Date.now() + 9000),
                // refreshToken: newToken,
                // refreshExpire: newTokenExpire
                roles: roles,
                user: tokenUser.userName
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 400,
                body: false
            };
        }
    };
}
