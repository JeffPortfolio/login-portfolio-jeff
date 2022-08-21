import jwt from 'jsonwebtoken';

export default function makeUserLoggedIn() {
    return async function userLoggedIn(httpRequest: any) {
        try {
            const headers = {
                'Content-Type': 'application/json'
            };

            const accessToken = httpRequest.accessToken;
            if (!accessToken) return { statusCode: 403, body: 'No Token' };

            const parts = accessToken.split('.');
            const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());

            let userRoles = [];
            let userCode = 0;
            let user = '';
            try {
                const verifiedToken = jwt.verify(accessToken, process.env.JWT_APP_SECRET as string);

                const parts = accessToken.split('.');
                const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                user = payload['user'];
                userRoles = payload['roles'];
                userCode = payload['iat'];
            } catch (error) {
                return { statusCode: 403, body: 'No Valid Token' };
            }

            return {
                headers: headers,
                statusCode: 200,
                body: 'Success',
                roles: [1971, 1908],
                user: user,
                userCode: userCode,
                token: 'fromLoggedIn'
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
