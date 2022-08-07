export default function makeGetAppByName({ applicationDb }: { applicationDb: any }) {
    return async function getAppByName(appName: any) {
        if (!appName) {
            throw new Error('You must supply the Application Name');
        }

        const app = await applicationDb.findByName(appName);
        return app;
    };
}
