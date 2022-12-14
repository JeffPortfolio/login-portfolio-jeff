export default function makeExpireRefreshById({ refreshDb }: { refreshDb: any }) {
    return async function expireRefreshById(id: string) {
        if (!id) {
            throw new Error('You must supply the Refresh Id');
        }
        const refreshInfo = await refreshDb.expireById(id);
        return refreshInfo;
    };
}
