export default function makeRolesDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findById,
        findByAppId,
        insert,
        list
    });

    async function findById(id: string) {
        const db = await makeDb();
        const query = { _id: { $eq: id } };
        const result = await db.collection('roles').find(query).toArray();

        return result[0];
    }

    async function findByAppId(appId: string) {
        const db = await makeDb();
        const query = { appId };
        const result = await db.collection('roles').find(query).toArray();

        return result[0];
    }

    async function insert(newRoles: string) {
        const db = await makeDb();
        const result = await db.collection('roles').insertOne(newRoles);
        return result;
    }

    async function list() {
        const db = await makeDb();
        const result = await db.collection('roles').find().toArray();

        return result;
    }
}
