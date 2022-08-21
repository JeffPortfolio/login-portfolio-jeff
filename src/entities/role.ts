export default function buildMakeRole() {
    return function makeRole({ roleId, appId, roleName }: { roleId: number; appId: string; roleName: string }) {
        if (roleId < 1000 || roleId > 9999 || roleId === 1971) {
            throw new Error('Role must be 1000 and 9999');
        }

        return Object.freeze({
            getRoleId: () => roleId,
            getAppId: () => appId,
            getRoleName: () => roleName
        });
    };
}
