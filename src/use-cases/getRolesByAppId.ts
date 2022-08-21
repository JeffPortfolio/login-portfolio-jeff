export default function makeGetRolesByAppId({ roleDb }: { roleDb: any }) {
    return async function getRolesByAppId({ appId }: { appId: any }) {
        const roles = await roleDb.findByAppId(appId);
        return roles;
    };
}
