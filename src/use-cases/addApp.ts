import { makeApp } from '../entities';

export default function makeAddApp({ applicationDb }: { applicationDb: any }) {
    return async function addApp(appInfo: any) {
        const newApp = makeApp(appInfo);
        const appExists = await applicationDb.findByName(newApp.getAppName());
        if (appExists) {
            return { status: 'error', message: 'Application Name already exists.' };
        }

        const success = applicationDb.insert({
            _id: applicationDb.getId(),
            appName: applicationDb.getAppName(),
            description: applicationDb.getDescription(),
            owner: applicationDb.getOwner(),
            appKey: applicationDb.getAppKey()
        });

        if (success) {
            return { status: 'success', message: 'Application registered' };
        } else {
            return { status: 'error', message: 'Error on insert.' };
        }

        // const user = await usersDb.findByEmail(email)
        // return newUser
    };
}
