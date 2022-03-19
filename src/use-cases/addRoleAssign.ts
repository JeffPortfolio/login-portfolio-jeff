import { makeRoleAssign } from '../entities';

export default function makeAddRoleAssign({ assignRoleDb }: { assignRoleDb: any }) {
    return async function addRoleAssign(roleInfo: any) {
        const newRole = makeRoleAssign(roleInfo);

        const success = await assignRoleDb.insert({
            _id: newRole.getId(),
            userId: newRole.getUserId()
        });

        if (success) {
            return { status: 'success', message: 'Role Assigned' };
        } else {
            return { status: 'error', message: 'Error on Role Insert.', id: '' };
        }
    };
}
