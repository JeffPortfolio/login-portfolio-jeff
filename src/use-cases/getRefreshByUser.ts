export default function makeGetRefreshByUser({ refreshDb }: { refreshDb: any }) {
    return async function getRefreshByUser(userId: any) {
        if (!userId) {
            throw new Error('You must supply the User Id');
        }
        const refreshInfo = await refreshDb.findByUser(userId);
        return refreshInfo;
    };
}
