export default function makeUserDbStub() {
    const map = new Map();

    return Object.freeze({
        insert: async (user: { _id: any; email: any; password: any }) => map.set(user._id, user),
        list: async () => Array.from(map.values()),
        findByEmail: async (email: string) => Array.from(map.values()).find((user) => user.email === email),
        findById: async (id: string) => Array.from(map.values()).find((user) => user._id === id)
    });
}
