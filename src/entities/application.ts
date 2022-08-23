export default function buildMakeApp({ nanoid, hashPassword }: { nanoid: any; hashPassword: any }) {
    return function makeApp({ appId, appName, appKey, description, owner }: { appId?: string; appName: string; appKey?: any; description?: string; owner: string }) {
        const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;

        const emailValid = EMAIL_REGEX.test(owner);

        if (!emailValid) {
            throw new Error('Owner must be a valid Email.');
        }

        appId = nanoid();

        let appString = `${appId}${appName}`;
        appKey = hashPassword(appString);

        return Object.freeze({
            getAppId: () => appId,
            getAppName: () => appName,
            getAppKey: () => appKey,
            getDescription: () => description,
            getOwner: () => owner
        });
    };
}
