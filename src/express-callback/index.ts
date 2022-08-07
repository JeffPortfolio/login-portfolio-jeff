export default function makeCallback(controller: any) {
    return async (req: any, res: any) => {
        const httpRequest = {
            body: req.body,
            accessToken: req.cookies.fireDeeps,
            refreshToken: req.cookies.fireHeals
        };

        const httpResponse = await controller(httpRequest);
        console.log(httpResponse);
        if (httpResponse.headers) {
            res.set(httpResponse.headers);
        }
        res.type('json');
        let tokenExpire = new Date(Date.now() + 5000);
        if (httpResponse.accessToken) {
            console.log('access Token');
            res.cookie('fireDeeps', httpResponse.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                // domain: 'localhost',
                expires: httpResponse.accessExpire
            });
        }
        if (httpResponse.refreshToken) {
            console.log('refresh Token');
            res.cookie('fireHeals', httpResponse.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                // domain: 'localhost',
                expires: httpResponse.refreshExpire
            });
        }

        const returnResponse = {
            user: httpResponse.user,
            roles: httpResponse.roles,
            body: httpResponse.body,
            statusCode: httpResponse.statusCode
        };
        console.log(returnResponse);
        res.status(httpResponse.statusCode).json(returnResponse);
        // res.status(200).json(false);
        return;
    };
}
