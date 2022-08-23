export default function makeGetRoleAssignsByUserRoleId({ assignRoleDb }: { assignRoleDb: any }) {
    return async function getRoleAssignsByUserRoleIds(userId: string, roles: any) {
        const role = await assignRoleDb.findByUserRoleIds(userId, roles);
        return role;
    };
}
