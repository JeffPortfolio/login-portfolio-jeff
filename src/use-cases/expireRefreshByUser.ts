export default function makeExpireRefreshByUser({ refreshDb }: { refreshDb: any }) {
    return async function expireRefreshByUser(userId: string) {
        if (!userId) {
            throw new Error('You must supply the User Id');
        }
        const refreshInfo = await refreshDb.expireByUser(userId);
        return refreshInfo;
    };
}
