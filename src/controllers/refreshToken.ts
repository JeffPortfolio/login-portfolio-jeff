import jwt from 'jsonwebtoken';

export default function makeRefreshToken({ getRefreshById, getUserById }: { getRefreshById: any; getUserById: any }) {
    return async function refreshToken(httpRequest: any) {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            // const { projName } = httpRequest.body;
            // if (!projName) return { statusCode: 400, body: false };

            const refreshToken = httpRequest.refreshToken;
            if (!refreshToken) return { statusCode: 200, body: 'No Refresh Token' };

            jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string);

            const parts = refreshToken.split('.');
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

            const token = await getRefreshById(payload['id']);

            if (token._id !== payload['id'] || token.hash !== payload['refresh']) {
                return { statusCode: 200, body: 'No Refresh Token' };
            }

            // console.log(token.userId);
            let tokenUser = await getUserById(token.userId);
            console.log(tokenUser);

            const accessToken = jwt.sign(
                {
                    aud: tokenUser._id,
                    user: tokenUser.email
                },
                process.env.JWT_APP_SECRET as string
            );

            // let newToken = null;
            // let newTokenExpire = null;
            // let currDate = new Date(Date.now());
            // // console.log(token.expiration - currDate);

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

            // // console.log(process.env.JWT_SECRET)

            console.log(`user = ${tokenUser.userName}`);
            return {
                statusCode: 200,
                body: 'Success',
                accessToken: accessToken,
                accessExpire: new Date(Date.now() + 9000),
                // refreshToken: newToken,
                // refreshExpire: newTokenExpire
                roles: [1971],
                user: tokenUser.userName
                // userCode: userCode
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
