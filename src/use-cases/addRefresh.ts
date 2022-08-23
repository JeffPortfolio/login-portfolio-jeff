import { makeRefreshToken } from '../entities';

export default function makeAddRefresh({ refreshDb }: { refreshDb: any }) {
    return async function addRefresh(refreshInfo: any) {
        const newRefresh = makeRefreshToken(refreshInfo);

        const success = refreshDb.insert({
            refreshId: newRefresh.getRefreshId(),
            userId: newRefresh.getUserId(),
            expiration: newRefresh.getExpiration(),
            hash: newRefresh.getHash(),
            expired: newRefresh.getExpired()
        });

        if (success) {
            const newToken = {
                refreshId: newRefresh.getRefreshId(),
                userId: newRefresh.getUserId(),
                expiration: newRefresh.getExpiration(),
                hash: newRefresh.getHash()
            };
            return { status: 'success', message: 'Token Added', token: newToken };
        } else {
            return { status: 'error', message: 'Error on insert.' };
        }
    };
}
