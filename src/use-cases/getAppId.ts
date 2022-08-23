export default function makeGetAppById({ applicationDb }: { applicationDb: any }) {
    return async function getAppById({ appId }: { appId: any }) {
        if (!appId) {
            throw new Error('You must supply the id');
        }

        const app = await applicationDb.findById(appId);
        return app;
    };
}
