import jwt from 'jsonwebtoken';

export default function makeRegisterUser(addUser: any, addRefresh: any) {
    return async function registerUser(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const { email, password, passwordVerify, user }: { email: string; password: string; passwordVerify: string; user: string } = httpRequest.body;

            if (!email || !password || !passwordVerify || !user) return { headers, statusCode: 400, body: 'Please enter all required fields.' };

            const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;
            const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

            const emailValid = EMAIL_REGEX.test(email);

            if (!emailValid) {
                throw new Error('Must have valid Email.');
            }

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

            console.log(result);

            if (result.status === 'error') {
                return { headers, statusCode: 400, body: result.message };
            }

            const accessToken = jwt.sign(
                {
                    // aud: existingApp._id,
                    // appName: existingApp.appName,
                    sub: result.data
                },
                process.env.JWT_APP_SECRET as string
            );

            let newToken = await addRefresh({ userId: result.data });
            let existingToken = newToken.token;

            console.log(existingToken);
            const refreshToken = jwt.sign(
                {
                    id: existingToken._id,
                    sub: existingToken.userId,
                    refresh: existingToken.hash
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
                // roles: roles,
                user: email,
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
