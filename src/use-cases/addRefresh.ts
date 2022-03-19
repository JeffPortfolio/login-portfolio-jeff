import { makeRefreshToken } from '../entities';

export default function makeAddRefresh({ refreshDb }: { refreshDb: any }) {
    return async function addRefresh(refreshInfo: any) {
        const newRefresh = makeRefreshToken(refreshInfo);

        const success = refreshDb.insert({
            _id: newRefresh.getId(),
            userId: newRefresh.getUserId(),
            expiration: newRefresh.getExpiration(),
            hash: newRefresh.getHash(),
            expired: newRefresh.getExpired()
        });

        if (success) {
            // const refreshToken = await refreshDb.findByUser( newRefresh.getId() )
            const newToken = {
                _id: newRefresh.getId(),
                userId: newRefresh.getUserId(),
                expiration: newRefresh.getExpiration(),
                hash: newRefresh.getHash()
            };
            return { status: 'success', message: 'Token Added', token: newToken };
        } else {
            return { status: 'error', message: 'Error on insert.' };
        }

        // const user = await usersDb.findByEmail(email)
        // return newUser
    };
}
