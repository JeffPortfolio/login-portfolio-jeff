import { makeRole } from '../entities';

export default function makeAddRole({ roleDb }: { roleDb: any }) {
    return async function addRole(roleInfo: any) {
        const newRole = makeRole(roleInfo);

        const success = await roleDb.insert({
            roleId: newRole.getRoleId(),
            appId: newRole.getAppId,
            roleName: newRole.getRoleName()
        });

        if (success) {
            return { status: 'success', message: 'Role Added', id: success.insertedId };
        } else {
            return { status: 'error', message: 'Error on Role Insert.', id: '' };
        }
    };
}
