export default function makeAssignRoleDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findByUserRoleIds,
        findById,
        findByAppId,
        findByUserId,
        insert,
        list
    });

    async function findByUserRoleIds(userId: string, roles: any[]) {
        const db = await makeDb();
        const query = { userId, roleId: { $in: roles } };
        // const projection = { _id: 0, roleId: 1, userId: 0 };
        const result = await db.collection('assignRole').find(query).toArray();

        return result;
    }
    async function findById(id: string) {
        const db = await makeDb();
        const query = { _id: { $eq: id } };
        const result = await db.collection('assignRole').find(query).toArray();

        return result[0];
    }
    async function findByAppId(appId: string) {
        const db = await makeDb();
        const query = { appId };
        const result = await db.collection('assignRole').find(query).toArray();

        return result[0];
    }
    async function findByUserId(userId: string) {
        const db = await makeDb();
        const query = { userId };
        const result = await db.collection('assignRole').find(query).toArray();

        return result[0];
    }

    async function insert(newAssignRole: any) {
        const db = await makeDb();
        const result = await db.collection('assignRole').insertOne(newAssignRole);
        return result;
    }

    async function list() {
        const db = await makeDb();
        const result = await db.collection('assignRole').find().toArray();

        return result;
    }
}
