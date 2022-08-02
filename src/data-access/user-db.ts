export default function makeUsersDb({ makeDb }: { makeDb: any }) {
    return Object.freeze({
        findByEmail,
        findByName,
        findById,
        insert,
        list
    });

    async function findByEmail(email: string) {
        const db = await makeDb();
        const query = { email };
        const result = await db.collection('users').find(query).toArray();

        return result[0];
    }

    async function findByName(userName: string) {
        const db = await makeDb();
        const query = { userName };
        const result = await db.collection('users').find(query).toArray();

        return result[0];
    }

    async function findById(userId: string) {
        const db = await makeDb();
        const query = { _id: userId };
        const result = await db.collection('users').find(query).toArray();

        return result[0];
    }

    async function insert(newUser: any) {
        const db = await makeDb();
        const result = await db.collection('users').insertOne(newUser);
        const userAdded = result.acknowledged;
        return userAdded;
    }

    async function list() {
        const db = await makeDb();
        const result = await db.collection('users').find().toArray();
        return result;
    }
}
