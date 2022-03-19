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
            res.cookie('fireDeeps', httpResponse.accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                domain: 'localhost',
                expires: httpResponse.accessExpire
            });
        }
        if (httpResponse.refreshToken) {
            res.cookie('fireHeals', httpResponse.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                domain: 'localhost',
                expires: httpResponse.refreshExpire
            });
        }
        console.log(httpResponse);
        res.status(httpResponse.statusCode).json(httpResponse);
        // res.status(200).json(false);
        return;
    };
}
