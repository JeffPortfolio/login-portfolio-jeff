export default function makeExpireRefreshById({ refreshDb }: { refreshDb: any }) {
    return async function expireRefreshById(id: string) {
        if (!id) {
            throw new Error('You must supply the Refresh Id');
        }
        console.log(`Expire ID: ${id}`)
        const refreshInfo = await refreshDb.expireById(id);
        return refreshInfo;
    };
}
