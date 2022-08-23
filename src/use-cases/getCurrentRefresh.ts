export default function makeGetCurrentRefresh({ refreshDb }: { refreshDb: any }) {
    return async function getCurrentRefresh(userId: string) {
        if (!userId) {
            throw new Error('You must supply the User Id');
        }
        const refreshInfo = await refreshDb.findCurrent(userId);
        return refreshInfo;
    };
}
