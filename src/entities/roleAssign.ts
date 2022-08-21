export default function buildMakeRoleAssign({ nanoid }: { nanoid: any }) {
    return function makeRoleAssign({ assignId, appId, userId }: { assignId?: string; appId: number; userId: string }) {
        assignId = nanoid();

        return Object.freeze({
            getAssignId: () => assignId,
            getRoleId: () => appId,
            getUserId: () => userId
        });
    };
}
