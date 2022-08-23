export default function buildMakeRefreshToken({ nanoid, hashPassword }: { nanoid: any; hashPassword: any }) {
    return function makeRefreshToken({ refreshId, userId, expiration, hash, expired = false }: { refreshId?: string; userId: string; expiration?: any; hash?: string; expired?: boolean }) {
        refreshId = nanoid();

        let refreshTime = 4 * 24 * 60 * 60 * 1000;
        expiration = new Date(Date.now() + refreshTime);

        let expString = expiration.getTime().toString();
        hash = `${refreshId}\\O/${expString}`;
        let hashRefresh = hashPassword(hash);

        return Object.freeze({
            getRefreshId: () => refreshId,
            getUserId: () => userId,
            getExpiration: () => expiration,
            getHash: () => hashRefresh,
            getExpired: () => expired
        });
    };
}
