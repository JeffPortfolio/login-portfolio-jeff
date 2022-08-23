export default function makeGetRefreshById({ refreshDb }: { refreshDb: any }) {
    return async function getRefreshById(id: any) {
        if (!id) {
            throw new Error('You must supply the User Id');
        }
        const refreshInfo = await refreshDb.findById(id);
        return refreshInfo;
    };
}
