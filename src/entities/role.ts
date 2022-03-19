export default function buildMakeRole() {
    return function makeRole({ id, appId, roleName }: { id: number; appId: string; roleName: string }) {
        if (id < 1000 || id > 9999 || id === 1971) {
            throw new Error('Role must be 1000 and 9999 and cannot be 1971');
        }

        return Object.freeze({
            getId: () => id,
            getAppId: () => appId,
            getRoleName: () => roleName
        });
    };
}
