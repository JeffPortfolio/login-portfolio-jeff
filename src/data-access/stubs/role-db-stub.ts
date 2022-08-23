export default function makeRoleDbStub() {
    const map = new Map();

    return Object.freeze({
        insert: async (roles: { _id: any; appId: any; roleName: any }) => map.set(roles._id, roles),
        list: async () => Array.from(map.values()),
        findByAppId: async (appId: string) => Array.from(map.values()).find((role) => role.appId === appId),
        findByName: async (roleName: string) => Array.from(map.values()).find((role) => role.roleName === roleName),
        findById: async (id: number) => Array.from(map.values()).find((role) => role._id === id)
    });
}
