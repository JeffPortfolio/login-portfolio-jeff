export default function makeGetAppList({ applicationDb }: { applicationDb: any }) {
    return async function getAppList() {
        const apps = await applicationDb.list();
        return apps;
    };
}
