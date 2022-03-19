export default function makeGetRoleAssignById({ assignRoleDb }: { assignRoleDb: any }) {
    return async function getRoleAssignById({ id }: { id: any }) {
        const role = await assignRoleDb.findById(id);
        return role;
    };
}
