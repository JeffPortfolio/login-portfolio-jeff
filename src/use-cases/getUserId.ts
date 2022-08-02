export default function makeGetUserById({ userDb }: { userDb: any }) {
    return async function getUserById(id: any) {
        if (!id) {
            throw new Error('You must supply the user-id');
        }

        const user = await userDb.findById(id);
        return user;
    };
}
