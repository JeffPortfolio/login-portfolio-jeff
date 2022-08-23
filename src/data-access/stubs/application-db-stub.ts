export default function makeApplicationDbStub() {
    const map = new Map();

    return Object.freeze({
        insert: async (app: { _id: string; appName: string; description: string; owner: string; appKey: string }) => map.set(app._id, app),
        list: async () => Array.from(map.values()),
        findById: async (id: string) => Array.from(map.values()).find((app) => app._id === id),
        findByName: async (appName: string) => Array.from(map.values()).find((app) => app.appName === appName)
    });
}
