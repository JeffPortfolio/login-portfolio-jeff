export default function makeGetUserByEmail({ userDb }: { userDb: any }) {
    return async function getUser({ email }: { email: any }) {
        if (!email) {
            throw new Error('You must supply an email address');
        }

        const user = await userDb.findByEmail(email);
        return user;
    };
}
