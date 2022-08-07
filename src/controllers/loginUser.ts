import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function makeLoginUser(getUser: any, getRefreshByUser: any, addRefresh: any, expireRefreshById: any, getAppByName: any) {
    return async function loginUser(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        let roles = [1971];
        try {
            const { user, password, appName } = httpRequest.body;

            if (!user || !password || !appName) return { statusCode: 400, body: 'Please enter all required fields.' };

            const existingUser = await getUser({ user });
            if (!existingUser) return { statusCode: 401, body: 'Wrong username or password.' };

            const app = await getAppByName({ appName });
            if (!app) return { statusCode: 401, body: 'Application is not in Universe.' };

            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if (!passwordCorrect) return { statusCode: 401, body: 'Wrong username or password.' };

            const accessToken = jwt.sign(
                {
                    aud: app._id,
                    sub: existingUser._id,
                    user: existingUser.userName,
                    roles: roles
                },
                app.appKey
            );

            let existingToken = await getRefreshByUser( existingUser._id );
            if (existingToken && existingToken.expiration < new Date()) {
                await expireRefreshById(existingToken._id);
                existingToken = null;
            }

            if (!existingToken) {
                let newToken = await addRefresh({ userId: existingUser._id });
                existingToken = newToken.token;
            }

            if (!existingToken) {
                return { statusCode: 401, body: 'Issue with refresh token' };
            }

            const refreshToken = jwt.sign(
                {
                    aud: existingToken._id,
                    sub: existingToken.userId,
                    refresh: existingToken.hash
                },
                process.env.JWT_REFRESH_SECRET as string
            );

            return {
                statusCode: 200,
                body: "User Logged In Successful",
                accessToken: accessToken,
                accessExpire: new Date(Date.now() + 19000),
                refreshToken: refreshToken,
                refreshExpire: existingToken.expiration,
                roles: [1971],
                user: existingUser.userName
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 400,
                body: {
                    error: 'Error Logining in User'
                }
            };
        }
    };
}
