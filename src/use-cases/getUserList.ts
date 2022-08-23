export default function makeGetUserList({ userDb }: { userDb: any }) {
    return async function getUserList() {
        const apps = await userDb.list();
        return apps;
    };
}
