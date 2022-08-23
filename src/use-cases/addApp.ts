import { makeApp } from '../entities';

export default function makeAddApp({ applicationDb }: { applicationDb: any }) {
    return async function addApp(appInfo: any) {
        const newApp = makeApp(appInfo);

        const success = applicationDb.insert({
            appId: newApp.getAppId(),
            appName: newApp.getAppName(),
            description: newApp.getDescription(),
            owner: newApp.getOwner(),
            appKey: newApp.getAppKey()
        });

        if (success) {
            return { status: 'success', message: 'Application registered' };
        } else {
            return { status: 'error', message: 'Error on insert.' };
        }
    };
}
