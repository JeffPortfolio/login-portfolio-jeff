export default function buildMakeApp({ nanoid, hashPassword }: { nanoid: any; hashPassword: any }) {
    return function makeApp({ id, appName, appKey, description, owner }: { id?: string; appName: string; appKey?: any; description?: string; owner: string }) {
        const EMAIL_REGEX = /^[A-z0-9._%+-]+@[A-z0-9.-]+\.[A-z]{2,}$/;

        const emailValid = EMAIL_REGEX.test(owner);

        if (!emailValid) {
            throw new Error('Owner must be a valid Email.');
        }

        id = nanoid();

        let appString = `${id}${appName}`;
        appKey = hashPassword(appString);

        return Object.freeze({
            getId: () => id,
            getAppName: () => appName,
            getAppKey: () => appKey,
            getDescription: () => description,
            getOwner: () => owner
        });
    };
}
