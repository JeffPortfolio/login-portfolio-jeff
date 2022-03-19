export default function makeGetAppById({ applicationDb }: { applicationDb: any }) {
    return async function getAppById({ id }: { id: any }) {
        if (!id) {
            throw new Error('You must supply the user-id');
        }

        const app = await applicationDb.findById(id);
        return app;
    };
}
