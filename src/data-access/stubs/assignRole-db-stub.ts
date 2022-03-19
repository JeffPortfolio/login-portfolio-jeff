export default function makeAssignRoleDbStub() {
    const map = new Map();

    return Object.freeze({
        insert: async (role: { _id: any; userId: any }) => map.set(role._id, role),
        list: async () => Array.from(map.values()),
        findByAppId: async (userId: string) => Array.from(map.values()).find((role) => role.userId === userId),
        findById: async (id: string) => Array.from(map.values()).find((role) => role._id === id)
    });
}
