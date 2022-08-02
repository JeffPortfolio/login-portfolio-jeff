export default function makeRefreshDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findByUser,
        findById,
        expireByUser,
        insert
    });

    async function findByUser(userId: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').find(userId).toArray();
        return result[0];
    }

    async function findById(id: string) {
        // console.log(userId)
        const db = await makeDb();
        const query = { _id: id };
        console.log(query);
        const result = await db.collection('refresh').find(query).toArray();

        return result[0];
    }

    async function expireByUser(currUserId: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').updateMany({ userId: { $eq: currUserId } }, { $set: { expired: true } });

        return result;
    }

    async function insert(newRefresh: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').insertOne(newRefresh);
        const refreshAdded = result.acknowledged;
        return result;
    }
}
