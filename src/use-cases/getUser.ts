export default function makeGetUser({ userDb }: { userDb: any }) {
    return async function getUser({ user }: { user: any }) {
        if (!user) {
            throw new Error('You must supply an UserName');
        }

        const existingUser = await userDb.findByName(user);
        return existingUser;
    };
}
