export default function makeGetRoleById({ roleDb }: { roleDb: any }) {
    return async function getRoleById({ id }: { id: any }) {
        const role = await roleDb.findById(id);
        return role;
    };
}
