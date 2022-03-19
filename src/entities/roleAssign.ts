export default function buildMakeRoleAssign({ nanoid }: { nanoid: any }) {
    return function makeRoleAssign({ id, roleId, userId }: { id?: string; roleId: number; userId: string }) {
        id = nanoid();

        return Object.freeze({
            getId: () => id,
            getRoleId: () => roleId,
            getUserId: () => userId
        });
    };
}
