export default function makeAllApplications({ getAppList }: { getAppList: any }) {
    return async function allApplications() {
        const headers = {
            'Content-Type': 'application/json'
        };
        try {
            const result = await getAppList();

            if (result.status === 'error') {
                return { headers, statusCode: 400, body: result.message };
            }

            return {
                headers,
                statusCode: 200,
                body: result
            };
        } catch (e) {
            console.log(e);
            return {
                headers,
                statusCode: 400,
                body: {
                    error: 'Error registering Application'
                }
            };
        }
    };
}
