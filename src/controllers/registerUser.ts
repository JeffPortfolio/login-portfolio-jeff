import jwt from 'jsonwebtoken';

export default function makeRegisterUser(addUser: any, addRefresh: any, getAppByName: any) {
    return async function registerUser(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        let roles = [1971];
        try {
            const { email, password, passwordVerify, user, appName }: { email: string; password: string; passwordVerify: string; user: string; appName: string } = httpRequest.body;

            if (!email || !password || !passwordVerify || !user || !appName) return { headers, statusCode: 400, body: 'Please enter all required fields.' };

            const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
            const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
            const USER_REGEX = /^(?=.{5,30})[A-z][a-z0-9]*$/;

            const emailValid = EMAIL_REGEX.test(email);

            if (!emailValid) {
                throw new Error('Must have valid Email.');
            }

            const userValid = USER_REGEX.test(user);
            if (!userValid) throw new Error('UserName must be 5-30 characters and not start with a number.');

            const passStrong = PWD_REGEX.test(password);
            if (!passStrong) {
                throw new Error('Password not strong enough');
            }

            if (password !== passwordVerify) return { headers, statusCode: 400, body: 'Passwords must match.' };

            const result = await addUser({
                email,
                password,
                user
            });

            if (result.status === 'error') {
                return { headers, statusCode: 400, body: result.message };
            }

            const app = await getAppByName({ appName });
            if (!app) return { statusCode: 401, body: 'Application is not in Universe.' };

            const accessToken = jwt.sign(
                {
                    aud: app.appId,
                    sub: result.data,
                    user: user,
                    roles: roles
                },
                app.appKey
            );

            let newToken = await addRefresh({ userId: result.data });
            let existingToken = newToken.token;

            const refreshToken = jwt.sign(
                {
                    aud: existingToken.refreshId,
                    sub: existingToken.userId
                },
                process.env.JWT_REFRESH_SECRET as string
            );

            return {
                statusCode: 200,
                body: 'User Registered',
                accessToken: accessToken,
                refreshToken: refreshToken,
                accessExpire: new Date(Date.now() + 9000),
                refreshExpire: existingToken.expiration,
                roles: roles,
                user: user,
                userCode: new Date(Date.now() + 900000).getTime()
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 400,
                body: 'Error Registering User'
            };
        }
    };
}
