import { ObjectId } from "mongodb";

export default function makeRefreshDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findByUser,
        findById,
        expireByUser,
        expireById,
        insert
    });

    async function findByUser(userId: string) {
        const db = await makeDb();
        const result = await db
            .collection('refresh')
            .find({$and: [{expired:false}, {userId}]})
            .toArray();
        return result[0];
    }

    async function findById(id: string) {
        const db = await makeDb();
        const query = { _id: id, expired: false };
        const result = await db.collection('refresh').find(query).toArray();

        return result[0];
    }

    async function expireByUser(currUserId: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').updateMany({ userId: currUserId }, { $set: { expired: true } });

        return result;
    }

    async function expireById(id: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').updateOne({ _id: id }, { $set: { expired: true } });

        return result;
    }

    async function insert(newRefresh: string) {
        const db = await makeDb();
        const result = await db.collection('refresh').insertOne(newRefresh);
        const refreshAdded = result.acknowledged;
        return result;
    }
}
