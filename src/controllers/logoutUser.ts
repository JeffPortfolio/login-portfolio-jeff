export default function makeLogoutUser() {
    return async function logoutUser(httpRequest: any) {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            return {
                statusCode: 200,
                body: 'User Logged Out',
                accessToken: 'logout',
                accessExpire: new Date(Date.now()),
                refreshToken: 'logout',
                refreshExpire: new Date(Date.now()),
                user: '',
                token: ''
            };
        } catch (e) {
            console.log(e);
            return {
                statusCode: 400,
                body: {
                    error: 'Error logging out user'
                }
            };
        }
    };
}
