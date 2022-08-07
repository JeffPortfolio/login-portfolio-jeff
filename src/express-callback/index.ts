export default function makeCallback(controller: any) {
    return async (req: any, res: any) => {
        const httpRequest = {
            body: req.body,
            accessToken: req.cookies.fireDeeps,
            refreshToken: req.cookies.fireHeals
        };

        const httpResponse = await controller(httpRequest);
        if (httpResponse.headers) {
            res.set(httpResponse.headers);
        }
        res.type('json');
        if (httpResponse.accessToken) {
            res.cookie('fireDeeps', httpResponse.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                expires: httpResponse.accessExpire
            });
        }
        if (httpResponse.refreshToken) {
            res.cookie('fireHeals', httpResponse.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                expires: httpResponse.refreshExpire
            });
        }

        const returnResponse = {
            user: httpResponse.user,
            roles: httpResponse.roles,
            body: httpResponse.body,
            statusCode: httpResponse.statusCode
        };
        res.status(httpResponse.statusCode).json(returnResponse);
        return;
    };
}
