export default function makeRefreshDbStub() {
    const map = new Map();

    return Object.freeze({
        insert: async (refresh: { _id: any; userId: any; expiration: any; hash: any; expired: any }) => map.set(refresh._id, refresh),
        list: async () => Array.from(map.values()),
        findByUser: async (userId: string) => Array.from(map.values()).find((refresh) => refresh.userId === userId),
        findById: async (id: string) => Array.from(map.values()).find((refresh) => refresh._id === id),
        findCurrent: async (userId: string) => Array.from(map.values()).find((refresh) => refresh.userId === userId && refresh.expired === false)
    });
}
