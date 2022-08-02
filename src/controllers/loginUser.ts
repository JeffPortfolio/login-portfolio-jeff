import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default function makeLoginUser(getUser: any, getRefreshByUser: any) {
    return async function loginUser(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const { user, password } = httpRequest.body;
            // !email ? console.log('no email') : console.log(email);

            if (!user || !password) return { statusCode: 400, body: 'Please enter all required fields.' };

            const existingUser = await getUser({ user });

            if (!existingUser) return { statusCode: 401, body: 'Wrong username or password.' };

            const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
            if (!passwordCorrect) return { statusCode: 401, body: 'Wrong username or password.' };

            console.log(existingUser);
            const accessToken = jwt.sign(
                {
                    aud: existingUser._id,
                    user: existingUser.email
                },
                process.env.JWT_APP_SECRET as string
            );

            let existingToken = await getRefreshByUser({ userId: existingUser._id });
            // console.log(existingToken);
            // if (!existingToken) {
            //     let newToken = await addRefresh({ userId: existingUser._id });
            //     existingToken = newToken.token;
            // }

            // if (!existingToken) {
            //     return { statusCode: 401, body: 'Issue with refresh token' };
            // }

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
                body: existingUser.email,
                accessToken: accessToken,
                accessExpire: new Date(Date.now() + 19000),
                refreshToken: refreshToken,
                refreshExpire: existingToken.expiration
                // roles: [1971]
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
