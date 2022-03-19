export default function buildMakeRefreshToken({ nanoid, hashPassword }: { nanoid: any; hashPassword: any }) {
    return function makeRefreshToken({ id, userId, expiration, hash, expired = false }: { id?: string; userId: string; expiration?: any; hash?: string; expired?: boolean }) {
        id = nanoid();

        let refreshTime = 4 * 24 * 60 * 60 * 1000;
        expiration = new Date(Date.now() + refreshTime);

        let expString = expiration.getTime().toString();
        hash = `${id}\\O/${expString}`;
        // console.log(userHash)
        let hashRefresh = hashPassword(hash);

        return Object.freeze({
            getId: () => id,
            getUserId: () => userId,
            getExpiration: () => expiration,
            getHash: () => hashRefresh,
            getExpired: () => expired
        });
    };
}
